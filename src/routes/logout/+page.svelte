<script>
	import { logout } from '$lib/api';
    import { onMount } from 'svelte';

    onMount(() => {
        document.title = 'Logout';
        handleLogout();
    });

    const handleLogout = async () => {
		logout();
    };
</script>

<main>
    <p>Logging out...</p>
</main>