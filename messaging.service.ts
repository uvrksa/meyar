// ============================================================
// MEYAAR — Messaging Service
// Conversation management, threading, and real-time readiness
// Prepared for future WebSocket integration
// ============================================================

import type {
  Conversation, Message, ConversationType, MessageStatus,
  MessageAttachment, UUID
} from '../models';

// ── Message Input ───────────────────────────────────────────

export interface SendMessageInput {
  conversationId: UUID;
  senderId: UUID;
  content: string;
  attachments?: File[];
  replyToId?: UUID;
}

export interface CreateConversationInput {
  type: ConversationType;
  projectId?: UUID;
  participantIds: UUID[];
  initialMessage?: string;
}

// ── Messaging Service Class ─────────────────────────────────

export class MessagingService {
  private messageListeners: Map<UUID, ((message: Message) => void)[]> = new Map();
  private typingListeners: Map<UUID, ((userId: UUID, isTyping: boolean) => void)[]> = new Map();

  /**
   * Create a new conversation
   */
  async createConversation(input: CreateConversationInput): Promise<Conversation> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const conversation: Conversation = {
      id: crypto.randomUUID() as UUID,
      type: input.type,
      projectId: input.projectId,
      participants: input.participantIds.map((userId) => ({
        userId,
        joinedAt: new Date().toISOString(),
        role: 'member' as const,
        muted: false,
      })),
      unreadCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return conversation;
  }

  /**
   * Send a message
   */
  async sendMessage(input: SendMessageInput): Promise<Message> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const attachments: MessageAttachment[] = [];
    if (input.attachments?.length) {
      for (const file of input.attachments) {
        attachments.push({
          id: crypto.randomUUID() as UUID,
          fileId: crypto.randomUUID() as UUID,
          name: file.name,
          mimeType: file.type,
          size: file.size,
          url: `/mock-storage/attachments/${file.name}`,
        });
      }
    }

    const message: Message = {
      id: crypto.randomUUID() as UUID,
      conversationId: input.conversationId,
      senderId: input.senderId,
      content: input.content,
      status: 'sent' as MessageStatus,
      attachments: attachments.length > 0 ? attachments : undefined,
      replyToId: input.replyToId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Notify listeners
    this.notifyMessageListeners(input.conversationId, message);

    return message;
  }

  /**
   * Get conversations for a user
   */
  async getConversations(userId: UUID, filters?: {
    type?: ConversationType;
    projectId?: UUID;
  }): Promise<Conversation[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Mock: return empty array (would fetch from API)
    return [];
  }

  /**
   * Get messages in a conversation
   */
  async getMessages(conversationId: UUID, options?: {
    limit?: number;
    before?: string; // cursor for pagination
  }): Promise<{ messages: Message[]; hasMore: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return { messages: [], hasMore: false };
  }

  /**
   * Mark messages as read
   */
  async markAsRead(conversationId: UUID, userId: UUID): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return true;
  }

  /**
   * Edit a message
   */
  async editMessage(messageId: UUID, newContent: string): Promise<Message | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return null;
  }

  /**
   * Delete a message
   */
  async deleteMessage(messageId: UUID): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return true;
  }

  /**
   * Send typing indicator
   */
  sendTypingIndicator(conversationId: UUID, userId: UUID, isTyping: boolean): void {
    const listeners = this.typingListeners.get(conversationId) || [];
    listeners.forEach((callback) => callback(userId, isTyping));
  }

  /**
   * Subscribe to new messages in a conversation
   */
  subscribeToMessages(conversationId: UUID, callback: (message: Message) => void): () => void {
    const listeners = this.messageListeners.get(conversationId) || [];
    listeners.push(callback);
    this.messageListeners.set(conversationId, listeners);

    return () => {
      const current = this.messageListeners.get(conversationId) || [];
      this.messageListeners.set(conversationId, current.filter((l) => l !== callback));
    };
  }

  /**
   * Subscribe to typing indicators
   */
  subscribeToTyping(conversationId: UUID, callback: (userId: UUID, isTyping: boolean) => void): () => void {
    const listeners = this.typingListeners.get(conversationId) || [];
    listeners.push(callback);
    this.typingListeners.set(conversationId, listeners);

    return () => {
      const current = this.typingListeners.get(conversationId) || [];
      this.typingListeners.set(conversationId, current.filter((l) => l !== callback));
    };
  }

  /**
   * Search messages
   */
  async searchMessages(query: string, options?: {
    conversationId?: UUID;
    senderId?: UUID;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<Message[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [];
  }

  /**
   * Get unread count across all conversations
   */
  async getTotalUnreadCount(userId: UUID): Promise<number> {
    return Math.floor(Math.random() * 5);
  }

  // ── Private Helpers ───────────────────────────────────────

  private notifyMessageListeners(conversationId: UUID, message: Message): void {
    const listeners = this.messageListeners.get(conversationId) || [];
    listeners.forEach((callback) => callback(message));
  }
}

// ── Singleton Instance ──────────────────────────────────────

export const messagingService = new MessagingService();
