// ============================================================
// MEYAAR — File Management Service
// Enterprise file handling with upload, versioning, permissions
// Prepared for future S3/cloud storage integration
// ============================================================

import type {
  ProjectFile, FileCategory, FileStatus, FilePermission,
  FileMetadata, UUID
} from '../models';

// ── Storage Adapter Interface ───────────────────────────────

export interface StorageAdapter {
  upload(file: File, path: string): Promise<{ url: string; key: string }>;
  delete(key: string): Promise<boolean>;
  getSignedUrl(key: string, expiresIn?: number): Promise<string>;
  getMetadata(key: string): Promise<FileMetadata>;
}

// ── Mock Storage Adapter ────────────────────────────────────

class MockStorageAdapter implements StorageAdapter {
  async upload(file: File, _path: string): Promise<{ url: string; key: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));
    const key = `files/${Date.now()}_${file.name}`;
    return {
      url: `/mock-storage/${key}`,
      key,
    };
  }

  async delete(_key: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return true;
  }

  async getSignedUrl(key: string, _expiresIn = 3600): Promise<string> {
    return `/mock-storage/${key}?token=mock_signed_${Date.now()}`;
  }

  async getMetadata(_key: string): Promise<FileMetadata> {
    return { checksum: 'mock_checksum' };
  }
}

// ── File Upload Progress ────────────────────────────────────

export interface UploadProgress {
  fileId: UUID;
  fileName: string;
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

export type UploadProgressCallback = (progress: UploadProgress) => void;

// ── File Service Class ──────────────────────────────────────

export class FileService {
  private storage: StorageAdapter;
  private uploadQueue: Map<UUID, UploadProgress> = new Map();

  constructor(adapter?: StorageAdapter) {
    this.storage = adapter || new MockStorageAdapter();
  }

  /**
   * Upload a single file
   */
  async uploadFile(
    file: File,
    options: {
      projectId: UUID;
      category: FileCategory;
      uploadedBy: UUID;
      onProgress?: UploadProgressCallback;
    }
  ): Promise<ProjectFile> {
    const fileId = crypto.randomUUID() as UUID;

    // Initialize progress
    const progress: UploadProgress = {
      fileId,
      fileName: file.name,
      progress: 0,
      status: 'uploading',
    };
    this.uploadQueue.set(fileId, progress);
    options.onProgress?.(progress);

    try {
      // Simulate upload progress
      for (let i = 10; i <= 90; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        progress.progress = i;
        options.onProgress?.(progress);
      }

      // Upload to storage
      const path = `${options.projectId}/${options.category}/${file.name}`;
      const { url } = await this.storage.upload(file, path);

      // Complete
      progress.progress = 100;
      progress.status = 'complete';
      options.onProgress?.(progress);

      const projectFile: ProjectFile = {
        id: fileId,
        projectId: options.projectId,
        uploadedBy: options.uploadedBy,
        name: file.name.replace(/\.[^/.]+$/, ''),
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        category: options.category,
        status: 'ready' as FileStatus,
        url,
        version: 1,
        permissions: this.getDefaultPermissions(options.category),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return projectFile;
    } catch (error) {
      progress.status = 'error';
      progress.error = error instanceof Error ? error.message : 'Upload failed';
      options.onProgress?.(progress);
      throw error;
    } finally {
      this.uploadQueue.delete(fileId);
    }
  }

  /**
   * Upload multiple files
   */
  async uploadFiles(
    files: File[],
    options: {
      projectId: UUID;
      category: FileCategory;
      uploadedBy: UUID;
      onProgress?: (progress: UploadProgress[]) => void;
    }
  ): Promise<ProjectFile[]> {
    const results: ProjectFile[] = [];
    const progressMap: Map<UUID, UploadProgress> = new Map();

    for (const file of files) {
      const result = await this.uploadFile(file, {
        ...options,
        onProgress: (p) => {
          progressMap.set(p.fileId, p);
          options.onProgress?.(Array.from(progressMap.values()));
        },
      });
      results.push(result);
    }

    return results;
  }

  /**
   * Delete a file
   */
  async deleteFile(fileId: UUID): Promise<boolean> {
    // In production: call API to delete file record and storage
    await new Promise((resolve) => setTimeout(resolve, 300));
    return true;
  }

  /**
   * Get download URL
   */
  async getDownloadUrl(fileId: UUID): Promise<string> {
    return await this.storage.getSignedUrl(`files/${fileId}`);
  }

  /**
   * Create new version of a file
   */
  async createVersion(
    originalFileId: UUID,
    newFile: File,
    options: { projectId: UUID; uploadedBy: UUID }
  ): Promise<ProjectFile> {
    const uploaded = await this.uploadFile(newFile, {
      projectId: options.projectId,
      category: 'deliverable',
      uploadedBy: options.uploadedBy,
    });

    return {
      ...uploaded,
      parentFileId: originalFileId,
      version: 2, // In production: query max version + 1
    };
  }

  /**
   * Validate file before upload
   */
  validateFile(file: File, options?: {
    maxSize?: number; // bytes
    allowedTypes?: string[];
    allowedExtensions?: string[];
  }): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const maxSize = options?.maxSize || 50 * 1024 * 1024; // 50MB default

    if (file.size > maxSize) {
      errors.push(`حجم الملف يتجاوز الحد المسموح (${Math.round(maxSize / 1024 / 1024)} ميجابايت)`);
    }

    if (options?.allowedTypes?.length && !options.allowedTypes.includes(file.type)) {
      errors.push(`نوع الملف غير مسموح: ${file.type}`);
    }

    if (options?.allowedExtensions?.length) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!ext || !options.allowedExtensions.includes(ext)) {
        errors.push(`امتداد الملف غير مسموح: .${ext}`);
      }
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Get file icon based on mime type
   */
  static getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'Image';
    if (mimeType === 'application/pdf') return 'FileText';
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'Table';
    if (mimeType.includes('word') || mimeType.includes('document')) return 'FileText';
    if (mimeType.includes('dwg') || mimeType.includes('autocad')) return 'Pencil';
    if (mimeType.includes('zip') || mimeType.includes('archive')) return 'Archive';
    return 'File';
  }

  /**
   * Format file size for display
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 بايت';
    const units = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
  }

  // ── Private Helpers ───────────────────────────────────────

  private getDefaultPermissions(category: FileCategory): FilePermission[] {
    switch (category) {
      case 'project_document':
        return [
          { role: 'admin', canView: true, canDownload: true, canEdit: true, canDelete: true },
          { role: 'engineer', canView: true, canDownload: true, canEdit: false, canDelete: false },
          { role: 'client', canView: true, canDownload: true, canEdit: false, canDelete: false },
        ];
      case 'deliverable':
        return [
          { role: 'admin', canView: true, canDownload: true, canEdit: true, canDelete: true },
          { role: 'engineer', canView: true, canDownload: true, canEdit: true, canDelete: false },
          { role: 'client', canView: true, canDownload: true, canEdit: false, canDelete: false },
        ];
      default:
        return [
          { role: 'admin', canView: true, canDownload: true, canEdit: true, canDelete: true },
        ];
    }
  }
}

// ── Singleton Instance ──────────────────────────────────────

export const fileService = new FileService();

// ── Allowed File Types ──────────────────────────────────────

export const ALLOWED_FILE_TYPES = {
  documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  spreadsheets: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  images: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  cad: ['application/acad', 'application/x-acad', 'image/vnd.dwg'],
  archives: ['application/zip', 'application/x-rar-compressed'],
};

export const ALL_ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'webp', 'svg', 'dwg', 'zip', 'rar'];
