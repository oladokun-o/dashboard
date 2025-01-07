/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMessages, getNotifications } from '$lib/api';
import { writable } from 'svelte/store';
import type { MessageDoc } from '../../interfaces/message.interface';
import type { NotificationDoc } from '../../interfaces/notifications.interface';

// Message store
export const messages = writable<MessageDoc[]>([]);

// Notification store
export const notifications = writable<NotificationDoc[]>([]);

// Example: Add a new message
export function addMessage(newMessage: any) {
    messages.update((currentMessages) => [newMessage, ...currentMessages]);
}

// Example: Add a new notification
export function addNotification(newNotification: any) {
    notifications.update((currentNotifications) => [newNotification, ...currentNotifications]);
}

export async function fetchMessagesAndNotifications() {
    getMessages();
    getNotifications();
}
