<script lang="ts">
	import '../app.css';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { onMount } from 'svelte';
	import { FlatToast, ToastContainer } from 'svelte-toasts';

	let { children } = $props();


	onMount(() => {
		// Set the page title dynamically
		document.title = 'Login';
	});
</script>

<div class="app">
	<main>
		<ToastContainer placement="bottom-right" let:data={data}>
			<FlatToast {data} /> <!-- Provider template for your toasts -->
		</ToastContainer>
		{@render children()}
	</main>
</div>

<style>
	.app {
		height: 100vh;
		width: 100%;
	}

	main {
		height: 100%;
	}
</style>
