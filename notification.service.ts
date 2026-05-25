// ============================================================
// MEYAAR — Notification Service
// Centralized notification management with routing & priorities
// Prepared for future push/email/SMS integration
// ============================================================

import type {
  Notification, NotificationType, NotificationPriority,
  NotificationChannel, UUID, UserRole
} from '../models';

// ── Notification Templates ──────────────────────────────────

export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  titleTemplate: string;
  bodyTemplate: string;
  channels: NotificationChannel[];
  targetRoles: UserRole[];
  actionUrlTemplate?: string;
}

export const NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
  {
    id: 'new_project_submitted',
    type: 'project_update',
    priority: 'high',
    titleTemplate: 'مشروع جديد مقدّم',
    bodyTemplate: 'تم تقديم مشروع جديد "{{projectTitle}}" بواسطة {{clientName}}',
    channels: ['in_app', 'email'],
    targetRoles: ['admin', 'super_admin'],
    actionUrlTemplate: '/admin/projects/{{projectId}}',
  },
  {
    id: 'project_assigned',
    type: 'assignment',
    priority: 'high',
    titleTemplate: 'مشروع جديد مسند إليك',
    bodyTemplate: 'تم إسناد المشروع "{{projectTitle}}" إليك',
    channels: ['in_app', 'email', 'push'],
    targetRoles: ['engineer'],
    actionUrlTemplate: '/engineer/workspace/{{projectId}}',
  },
  {
    id: 'deliverable_submitted',
    type: 'deliverable',
    priority: 'high',
    titleTemplate: 'مخرجات جديدة للمراجعة',
    bodyTemplate: 'قام {{engineerName}} بتقديم مخرجات للمشروع "{{projectTitle}}"',
    channels: ['in_app', 'email'],
    targetRoles: ['admin', 'super_admin'],
    actionUrlTemplate: '/admin/deliverables/{{deliverableId}}',
  },
  {
    id: 'revision_requested',
    type: 'deliverable',
    priority: 'medium',
    titleTemplate: 'طلب تعديل على المخرجات',
    bodyTemplate: 'تم طلب تعديل على مخرجات المشروع "{{projectTitle}}"',
    channels: ['in_app', 'email'],
    targetRoles: ['engineer'],
    actionUrlTemplate: '/engineer/deliverables/{{deliverableId}}',
  },
  {
    id: 'project_delivered',
    type: 'project_update',
    priority: 'high',
    titleTemplate: 'تم تسليم مشروعك',
    bodyTemplate: 'تم تسليم المشروع "{{projectTitle}}" بنجاح',
    channels: ['in_app', 'email', 'sms'],
    targetRoles: ['client'],
    actionUrlTemplate: '/client/projects/{{projectId}}',
  },
  {
    id: 'clarification_needed',
    type: 'clarification',
    priority: 'medium',
    titleTemplate: 'مطلوب توضيح',
    bodyTemplate: 'يحتاج المشروع "{{projectTitle}}" إلى توضيح إضافي',
    channels: ['in_app', 'email'],
    targetRoles: ['client'],
    actionUrlTemplate: '/client/projects/{{projectId}}?tab=messages',
  },
  {
    id: 'new_message',
    type: 'message',
    priority: 'medium',
    titleTemplate: 'رسالة جديدة',
    bodyTemplate: 'لديك رسالة جديدة من {{senderName}}',
    channels: ['in_app', 'push'],
    targetRoles: ['client', 'engineer', 'admin'],
    actionUrlTemplate: '/messages/{{conversationId}}',
  },
  {
    id: 'invoice_generated',
    type: 'billing',
    priority: 'medium',
    titleTemplate: 'فاتورة جديدة',
    bodyTemplate: 'تم إصدار فاتورة جديدة بمبلغ {{amount}} ر.س',
    channels: ['in_app', 'email'],
    targetRoles: ['client'],
    actionUrlTemplate: '/client/billing/{{invoiceId}}',
  },
  {
    id: 'payment_received',
    type: 'billing',
    priority: 'low',
    titleTemplate: 'تم استلام الدفعة',
    bodyTemplate: 'تم استلام دفعة بمبلغ {{amount}} ر.س من {{clientName}}',
    channels: ['in_app'],
    targetRoles: ['admin', 'super_admin'],
  },
  {
    id: 'system_maintenance',
    type: 'system',
    priority: 'urgent',
    titleTemplate: 'صيانة مجدولة',
    bodyTemplate: '{{message}}',
    channels: ['in_app', 'email', 'push'],
    targetRoles: ['client', 'engineer', 'admin', 'super_admin'],
  },
];

// ── Notification Preferences ────────────────────────────────

export interface NotificationPreferences {
  userId: UUID;
  channels: {
    in_app: boolean;
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  types: Record<NotificationType, boolean>;
  quietHours?: {
    enabled: boolean;
    start: string; // HH:mm
    end: string;
  };
  digestMode: 'realtime' | 'hourly' | 'daily';
}

// ── Notification Service Class ──────────────────────────────

export class NotificationService {
  private listeners: Map<string, ((notification: Notification) => void)[]> = new Map();

  /**
   * Send notification (mock)
   */
  async send(
    templateId: string,
    data: Record<string, string>,
    targetUserId: UUID
  ): Promise<Notification> {
    const template = NOTIFICATION_TEMPLATES.find((t) => t.id === templateId);
    if (!template) throw new Error(`Template not found: ${templateId}`);

    // Interpolate template
    const title = this.interpolate(template.titleTemplate, data);
    const body = this.interpolate(template.bodyTemplate, data);
    const actionUrl = template.actionUrlTemplate
      ? this.interpolate(template.actionUrlTemplate, data)
      : undefined;

    const notification: Notification = {
      id: crypto.randomUUID() as UUID,
      userId: targetUserId,
      type: template.type,
      priority: template.priority,
      title,
      body,
      read: false,
      actionUrl,
      channels: template.channels,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Notify listeners
    this.notifyListeners(targetUserId, notification);

    return notification;
  }

  /**
   * Send bulk notifications
   */
  async sendBulk(
    templateId: string,
    data: Record<string, string>,
    targetUserIds: UUID[]
  ): Promise<Notification[]> {
    const results: Notification[] = [];
    for (const userId of targetUserIds) {
      const notification = await this.send(templateId, data, userId);
      results.push(notification);
    }
    return results;
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: UUID): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return true;
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: UUID): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return true;
  }

  /**
   * Delete notification
   */
  async delete(notificationId: UUID): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return true;
  }

  /**
   * Get unread count for a user
   */
  async getUnreadCount(userId: UUID): Promise<number> {
    // Mock: return random count
    return Math.floor(Math.random() * 10);
  }

  /**
   * Subscribe to real-time notifications
   */
  subscribe(userId: UUID, callback: (notification: Notification) => void): () => void {
    const listeners = this.listeners.get(userId) || [];
    listeners.push(callback);
    this.listeners.set(userId, listeners);

    // Return unsubscribe function
    return () => {
      const current = this.listeners.get(userId) || [];
      this.listeners.set(userId, current.filter((l) => l !== callback));
    };
  }

  /**
   * Get notification preferences
   */
  async getPreferences(userId: UUID): Promise<NotificationPreferences> {
    return {
      userId,
      channels: { in_app: true, email: true, sms: false, push: true },
      types: {
        project_update: true,
        message: true,
        deliverable: true,
        assignment: true,
        clarification: true,
        billing: true,
        system: true,
      },
      quietHours: { enabled: false, start: '22:00', end: '07:00' },
      digestMode: 'realtime',
    };
  }

  /**
   * Update notification preferences
   */
  async updatePreferences(userId: UUID, prefs: Partial<NotificationPreferences>): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return true;
  }

  // ── Private Helpers ───────────────────────────────────────

  private interpolate(template: string, data: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || `{{${key}}}`);
  }

  private notifyListeners(userId: UUID, notification: Notification): void {
    const listeners = this.listeners.get(userId) || [];
    listeners.forEach((callback) => callback(notification));
  }
}

// ── Singleton Instance ──────────────────────────────────────

export const notificationService = new NotificationService();
