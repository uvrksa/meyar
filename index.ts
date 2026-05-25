// ============================================================
// MEYAAR — Services Layer Index
// Central export for all platform services
// ============================================================

export { AuthService } from './auth.service';
export { FileService, fileService, ALLOWED_FILE_TYPES, ALL_ALLOWED_EXTENSIONS } from './file.service';
export { NotificationService, notificationService, NOTIFICATION_TEMPLATES } from './notification.service';
export { MessagingService, messagingService } from './messaging.service';
export { AIService, aiService } from './ai.service';

export type { StorageAdapter, UploadProgress, UploadProgressCallback } from './file.service';
export type { NotificationTemplate, NotificationPreferences } from './notification.service';
export type { SendMessageInput, CreateConversationInput } from './messaging.service';
export type {
  AIProvider, AIAnalysisInput, AIAnalysisResult, AIFinding,
  AIRecommendation, CostEstimationInput, CostEstimation,
  CostBreakdownItem, ComparableProject, SummarizeOptions,
  FileAnalysisResult, ExtractedEntity, ExtractedTable,
} from './ai.service';
