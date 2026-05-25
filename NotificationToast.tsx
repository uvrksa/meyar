// ============================================================
// MEYAAR — Real-time Notification Toast System
// Shows workflow-triggered notifications as toasts
// ============================================================

import { toast } from 'sonner';
import {
  Bell, CheckCircle2, AlertCircle, FileText,
  MessageSquare, CreditCard, UserPlus, FolderOpen
} from 'lucide-react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationPayload {
  title: string;
  body: string;
  type: NotificationType;
  actionUrl?: string;
}

const TYPE_ICONS = {
  success: CheckCircle2,
  info: Bell,
  warning: AlertCircle,
  error: AlertCircle,
};

export function showNotification(payload: NotificationPayload) {
  const Icon = TYPE_ICONS[payload.type];

  switch (payload.type) {
    case 'success':
      toast.success(payload.title, {
        description: payload.body,
        duration: 5000,
      });
      break;
    case 'error':
      toast.error(payload.title, {
        description: payload.body,
        duration: 8000,
      });
      break;
    case 'warning':
      toast.warning(payload.title, {
        description: payload.body,
        duration: 6000,
      });
      break;
    default:
      toast.info(payload.title, {
        description: payload.body,
        duration: 4000,
      });
  }
}

// ── Workflow-triggered notification helpers ──

export function notifyProjectSubmitted(projectName: string) {
  showNotification({
    title: 'تم إرسال المشروع',
    body: `تم إرسال "${projectName}" بنجاح وهو قيد المراجعة الآن`,
    type: 'success',
  });
}

export function notifyProjectAssigned(projectName: string, engineerName: string) {
  showNotification({
    title: 'تم إسناد المشروع',
    body: `تم إسناد "${projectName}" إلى ${engineerName}`,
    type: 'info',
  });
}

export function notifyDeliverableUploaded(projectName: string) {
  showNotification({
    title: 'مخرج جديد',
    body: `تم رفع مخرج جديد لمشروع "${projectName}" — بانتظار المراجعة`,
    type: 'info',
  });
}

export function notifyDeliverableApproved(projectName: string) {
  showNotification({
    title: 'تمت الموافقة',
    body: `تمت الموافقة على مخرجات "${projectName}"`,
    type: 'success',
  });
}

export function notifyDeliverableRejected(projectName: string, reason: string) {
  showNotification({
    title: 'مطلوب تعديلات',
    body: `مخرجات "${projectName}" تحتاج تعديلات: ${reason}`,
    type: 'warning',
  });
}

export function notifyNewMessage(senderName: string) {
  showNotification({
    title: 'رسالة جديدة',
    body: `لديك رسالة جديدة من ${senderName}`,
    type: 'info',
  });
}

export function notifyInvoiceGenerated(amount: string) {
  showNotification({
    title: 'فاتورة جديدة',
    body: `تم إصدار فاتورة بمبلغ ${amount} ر.س`,
    type: 'info',
  });
}

export function notifyPaymentReceived(amount: string) {
  showNotification({
    title: 'تم استلام الدفعة',
    body: `تم تأكيد استلام دفعة بمبلغ ${amount} ر.س`,
    type: 'success',
  });
}

export function notifyClarificationRequest(projectName: string) {
  showNotification({
    title: 'طلب توضيح',
    body: `يوجد طلب توضيح جديد على مشروع "${projectName}"`,
    type: 'warning',
  });
}

export function notifyStatusChange(projectName: string, newStatus: string) {
  showNotification({
    title: 'تحديث حالة المشروع',
    body: `تم تحديث حالة "${projectName}" إلى: ${newStatus}`,
    type: 'info',
  });
}
