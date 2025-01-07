import { writable } from 'svelte/store';
import { api } from './user';
import type { RevenueDoc, RevenueResponse } from '../../interfaces/revenue.interface';
import type { TransactionDoc, TransactionResponse } from '../../interfaces/transaction.interface';
import type { DoctorsDoc, DoctorsResponse } from '../../interfaces/doctors.interface';
import type { MetricsDoc, MetricsResponse } from '../../interfaces/metrics.interface';

// Revenue Store
export const revenueStore = (() => {
	const { subscribe, set } = writable<RevenueDoc[]>([]);

	return {
		subscribe,
		fetch: async () => {
			try {
				const response = await api.get('/revenue');
				const { docs } = (response.data as RevenueResponse);
				set(docs);
			} catch (error) {
				console.error('Error fetching revenue:', error);
			}
		},
	};
})();

// Transactions Store
export const transactionsStore = (() => {
	const { subscribe, set } = writable<TransactionDoc[]>([]);

	return {
		subscribe,
		fetch: async () => {
			try {
				const response = await api.get('/transactions');
				const { docs } = (response.data as TransactionResponse);
				set(docs);
			} catch (error) {
				console.error('Error fetching transactions:', error);
			}
		},
		add: async (transaction: object) => {
			try {
				await api.post('/transactions', transaction);
				await transactionsStore.fetch();
			} catch (error) {
				console.error('Error adding transaction:', error);
			}
		},
		delete: async (id: string) => {
			try {
				await api.delete(`/transactions/${id}`);
				await transactionsStore.fetch();
			} catch (error) {
				console.error('Error deleting transaction:', error);
			}
		}
	};
})();

// Doctors Store
export const doctorsStore = (() => {
	const { subscribe, set } = writable<DoctorsDoc[]>([]);

	return {
		subscribe,
		fetch: async () => {
			try {
				const response = await api.get('/doctors');
				const { docs } = (response.data as DoctorsResponse);
				set(docs);
			} catch (error) {
				console.error('Error fetching doctors:', error);
			}
		},
		add: async (doctor: object) => {
			try {
				await api.post('/doctors', doctor);
				await doctorsStore.fetch();
			} catch (error) {
				console.error('Error adding doctor:', error);
			}
		},
		update: async (id: string, doctor: object) => {
			try {
				await api.put(`/doctors/${id}`, doctor);
				await doctorsStore.fetch();
			} catch (error) {
				console.error('Error updating doctor:', error);
			}
		}
	};
})();

// Metrics Store
export const metricsStore = (() => {
	const { subscribe, set } = writable<MetricsDoc[]>([]);

	return {
		subscribe,
		fetch: async () => {
			try {
				const response = await api.get('/metrics');
				const { docs } = (response.data as MetricsResponse);
				set(docs);
			} catch (error) {
				console.error('Error fetching metrics:', error);
			}
		}
	};
})();
