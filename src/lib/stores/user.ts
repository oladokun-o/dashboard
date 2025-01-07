// lib/stores/user.js
import { get, writable } from 'svelte/store';
import type { User } from '../../interfaces/user';
import axios from 'axios';
import { toasts } from 'svelte-toasts';
import { goto } from '$app/navigation';

export const baseUrl =
	import.meta.env.MODE === 'development'
		? 'http://localhost:3000/'
		: 'https://payload-cms-megexe.vercel.app/';


export const api = axios.create({
	baseURL: baseUrl + 'api',
	headers: {
		'Content-Type': 'application/json'
	}
});
api.interceptors.request.use((config) => {
	const token = get(tokenStore);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Loading state for login
export const isLoggingIn = writable(false);

const LOCAL_STORAGE_KEY = 'currentUser',
	TOKEN = 'token';

// Helper function to load user data from local storage
function loadUser(): User | null {
	if (typeof window === 'undefined') return null;
	const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
	return storedUser ? JSON.parse(storedUser) : null;
}

// Helper function to load token from local storage
function loadToken(): string | null {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem(TOKEN);
}

// Helper function to save user data to local storage
function saveUser(userData: User | null): void {
	if (typeof window !== 'undefined') {
		if (userData) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
		} else {
			localStorage.removeItem(LOCAL_STORAGE_KEY);
		}
	}
}

// Helper function to save token to local storage
function saveToken(token: string): void {
	if (typeof window !== 'undefined') {
		if (token) {
			localStorage.setItem(TOKEN, token);
		} else {
			localStorage.removeItem(TOKEN);
		}
	}
}

// Initialize the user store with data from local storage
const storedUser = loadUser();
const userStore = writable<User | null>(storedUser);

// Initialize the token store with data from local storage
const storedToken = loadToken();
const tokenStore = writable<string | null>(storedToken);

// Sync store updates with local storage
userStore.subscribe((currentUser) => {
	saveUser(currentUser);
});

// Sync store updates with local storage
tokenStore.subscribe((token) => {
	if (token) saveToken(token);
});

// Functions to manage user state
export const user = userStore;

export const setUser = (userData: User) => {
	user.set(userData); // Set the user object after successful login
};

export const clearUser = () => {
	user.set(null); // Clear user data upon logout
};

// Functions to manage token state
export const token = tokenStore;

export const setToken = (newToken: string) => {
	token.set(newToken); // Set the token after successful login
};

export const clearToken = () => {
	token.set(null); // Clear token upon logout
};

export const isTokenValid = (): boolean => {
	const token = loadToken();
	if (!token) return false;

	const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
	const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
	return payload.exp > currentTime; // Check expiry
};

api.interceptors.request.use((config) => {
	if (!isTokenValid()) {
		clearUser();
		clearToken();
		const message: string = 'Token expired, user logged out';
		goto('/');
		toasts.error(message);
		console.error(message);
	}
	return config;
});
