/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { toasts } from 'svelte-toasts';
import type { LoginSuccessResponse } from '../interfaces/user';
import { api, clearUser, isLoggingIn, token, user } from './stores/user';
import { goto } from '$app/navigation';
import { messages, notifications } from './stores/header';
import type { MessagesResponse } from '../interfaces/message.interface';
import type { NotificationsResponse } from '../interfaces/notifications.interface';

/**
 * Login a user
 * @param email
 * @param password
 * @returns User
 */
export const login = async (email: string, password: string): Promise<LoginSuccessResponse> => {
	isLoggingIn.set(true);
	try {
		const response = await api.post('/users/login', { email, password });

		// Successful login
		if (response.status === 200) {
			toasts.success('Login successful');
			user.set((response.data as LoginSuccessResponse).user);
			token.set((response.data as LoginSuccessResponse).token);
		}

		return response.data as LoginSuccessResponse; // Assuming the response contains the user object
	} catch (error) {
		console.error('Login error:', error);

		// Handle Axios errors
		if (axios.isAxiosError(error)) {
			const errors: { message: string }[] = error.response?.data?.errors || [];

			if (errors.length > 0) {
				errors.forEach((error) => toasts.error(error.message));
			} else {
				toasts.error(error.response?.data?.message || 'An unexpected error occurred');
			}
		} else {
			toasts.error('An unexpected error occurred');
		}
		throw error;
	} finally {
		isLoggingIn.set(false);
	}
};

/**
 * Logout a user
 */
export const logout = async (): Promise<void> => {
	try {
		await api.post('/users/logout');
		toasts.success('Logout successful');
		clearUser();
		localStorage.removeItem('token');
		goto('/');
	} catch (error) {
		console.error('Logout error:', error);

		// Handle Axios errors
		if (axios.isAxiosError(error)) {
			const errors: string[] = error.response?.data?.errors || [];
			errors.forEach(toasts.error);
		} else {
			toasts.error('An unexpected error occurred');
		}
		throw error;
	}
};

/**
 * Get messages
 * */
export const getMessages = async (): Promise<void> => {
	try {
		const response = await api.get('/messages');
		const messagesData = (response.data as MessagesResponse).docs;
        messages.set(messagesData);
	} catch (error) {
		console.error('Get messages error:', error);
	}
}

/**
 * Get notifications
 * */
export const getNotifications = async (): Promise<void> => {
	try {
		const response = await api.get('/notifications');

		const notificationsData = (response.data as NotificationsResponse).docs;
		notifications.set(notificationsData);
	} catch (error) {
		console.error('Get notifications error:', error);
	}
}