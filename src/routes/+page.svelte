<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../lib/stores/user'; // Import the user store
	import Login from './login/Login.svelte';
	import type { User } from '../interfaces/user';
	import { goto } from '$app/navigation';

	let currentUser: User | null = null;

	// Subscribe to the user store
	user.subscribe((value) => {
		currentUser = value;

		if (currentUser) {
			goto('/dashboard')
		}
	});

	onMount(() => {
		// Set the page title dynamically
		if (currentUser) {
			document.title = 'Dashboard';
		} else {
			document.title = 'Login';
		}
	});
</script>

<div class="w-100 h-100">
	<div class="container-fluid h-100 auth-contn">
		<Login />
	</div>
</div>

<style>
	.auth-contn {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
