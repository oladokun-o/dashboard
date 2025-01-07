<script lang="ts">
	import { isLoggingIn, setUser } from '$lib/stores/user';
	import { login } from '$lib/api';
	import type { User } from '../../interfaces/user';
	import { goto } from '$app/navigation';

	let email: string = '';
	let password: string = '';

	const handleLogin = async () => {
		try {
			const userData: User = (await login(email, password)).user;
			setTimeout(() => {
				goto('/dashboard');
			}, 3000);
		} catch (err) {
			console.error(err);
		}
	};
</script>

<div class="col-12 col-md-6 col-lg-3">
	<form class="col-12" on:submit|preventDefault={handleLogin}>
		<div class="row">
			<h1>Login</h1>

			<div class="col-12 mb-3">
				<label for="email" class="form-label">Email address</label>
				<input
					type="email"
					bind:value={email}
					class="form-control"
					placeholder="Email"
					id="email"
					required
				/>
			</div>
			<div class="col-12 mb-3">
				<label for="password" class="form-label">Password</label>
				<input
					type="password"
					bind:value={password}
					class="form-control"
					placeholder="Password"
					id="password"
					required
				/>
			</div>

			<div class="col-12">
				<button type="submit" class="btn btn-dark w-100">
					{$isLoggingIn ? 'Logging in...' : 'Login'}
				</button>
			</div>
		</div>
	</form>
</div>
