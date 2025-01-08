<script lang="ts">
	import { user } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import type { User } from '../../interfaces/user';
	import Header from './components/Header.svelte';
	import SideNav from './components/SideNav.svelte';
	import { fetchMessagesAndNotifications } from '$lib/stores/header';

	let { children } = $props();
	let currentUser: User | null = null;

	// Subscribe to the user store
	user.subscribe((value) => {
		currentUser = value;
	});

	onMount(() => {
		// Fetch messages & notifications
		if (currentUser) fetchMessagesAndNotifications();
	});
</script>

<div class="dashboard container-fluid h-100 px-0">
	<div class="container-fluid header">
		<Header />
	</div>

	<div class="container-fluid main-contn">
		<div class="row h-100">
			<div class="sidenav col-auto" id="sidenav">
                <SideNav />
            </div>
			<div class="col main">
				{@render children()}
			</div>
		</div>
	</div>
</div>

<style>
	.header {
		height: 120px;
		box-shadow: 0px 1px 0px 0px #12203B17;
	}

    .main-contn {
		height: calc(100% - 120px);
        padding: 0 20px;
        padding-top: 20px;
    }

    @media (min-width: 1440px) {
        .main-contn {
            padding: 0 120px;
            padding-top: 50px;
        }
    }

	.dashboard {
		background-color: #FAFAFB;
	}

	.sidenav {
		height: 100%;
	}

	.main {
		height: 100%;
		background-color: transparent;
		overflow-y: auto;
		padding-bottom: 50px;
	}

	.main::-webkit-scrollbar {
		width: 10px;
	}
</style>
