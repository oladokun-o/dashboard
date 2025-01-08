<script lang="ts">
	import Logo from '$lib/images/svelte-logo.svg';
	import { isSideNavOpen, selectedNavItem, updateScreenSize } from '$lib/stores/sidenav';
	import { onMount } from 'svelte';
	import type { SideNav } from '../../../interfaces/sidenav.interface';
	import type {
		DropdownItem,
		MessageDropdownItem,
		NotificationDropdownItem,
		ProfileDropdownItem
	} from '../../../interfaces/header.interface';
	import Dropdown from './Dropdown.svelte';
	import websiteIcon from '$lib/images/website.png';
	import caretDownIcon from '$lib/images/caret-down.svg';
	import messageIcon from '$lib/images/mail.svg';
	import notificationIcon from '$lib/images/notification.svg';
	import defaultUserPng from '$lib/images/user.png';
	import { get, writable } from 'svelte/store';
	import MessagesDropdown from './MessagesDropdown.svelte';
	import NotificationDropdown from './NotificationDropdown.svelte';
	import { user } from '$lib/stores/user';
	import ProfileDropdown from './ProfileDropdown.svelte';
	import userIcon from '$lib/images/user.svg';
	import settingsIcon from '$lib/images/settings.svg';
	import teamIcon from '$lib/images/users.svg';
	import supportIcon from '$lib/images/help-circle.svg';
	import integrationIcon from '$lib/images/code.svg';
	import logoutIcon from '$lib/images/log-out.svg';
	import { goto } from '$app/navigation';
	import { messages, notifications } from '$lib/stores/header';

	let pageTitle = '';

	let currentUser = get(user);
	let isLoading = true;

	const baseUrl =
		import.meta.env.MODE === 'development'
			? 'http://localhost:3000'
			: 'https://payload-cms-megexe-production.up.railway.app';

	// Simulate an API call to fetch user data
	onMount(() => {
		updateScreenSize(); 
		setTimeout(() => {
			isLoading = false; // Set loading to false when user data is ready
		}, 1000); // Simulating a delay (replace with actual logic to load user data)
	});

	onMount(() => {
		const storedItem: SideNav = JSON.parse(localStorage.getItem('selectedNavItem') as string);
		if (storedItem && storedItem.title) {
			pageTitle = storedItem.title;
		}

		selectedNavItem.subscribe((item) => {
			if (typeof window === 'undefined') return null;

			if (item && item.title) {
				document.title = `${item.title}`;
				pageTitle = item.title;
			}
		});
	});

	const dropdownItems: DropdownItem[] = [
		{ label: 'English', active: true },
		{ label: 'French', active: false }
	];

	// Store for active item
	let activeDropdownItem = writable<DropdownItem | null>(null);

	// Initial state
	activeDropdownItem.set(dropdownItems.find((item) => item.active) || null);

	// Update the active item in the parent component
	const setActiveItem = (item: any) => {
		activeDropdownItem.set(item);
	};

	const messagesDropdownItems: MessageDropdownItem[] = [];
	let totalUnreadMessages = 0;

	messages.subscribe((items) => {
		items.map((item) => {
			messagesDropdownItems.push({
				message: item.message.root.children[0].children[0].text,
				time: item.time,
				number_of_messages: item.number_of_messages,
				user_abbreviation: item.user_abbreviation,
				user_abbreviation_color: item.user_abbreviation_color,
				online: item.online,
				user_name: item.user_name
			});
		});
		items.forEach((item) => {
			totalUnreadMessages += item?.number_of_messages ?? 0;
		});
	});

	let activeMessageDropdownItem = writable<MessageDropdownItem | null>(null);

	activeMessageDropdownItem.set(messagesDropdownItems[0]);

	const notificationDropdownItems: NotificationDropdownItem[] = [];
	let totalUnreadNotifications = 0;

	notifications.subscribe((items) => {
		items.map((item) => {
			notificationDropdownItems.push({
				title: item.title,
				message: item.message.root.children[0].children[0].text,
				time: item.time
			});
		});
		totalUnreadNotifications = items.length;
	});

	let activeNotificationDropdownItem = writable<NotificationDropdownItem | null>(null);

	activeNotificationDropdownItem.set(notificationDropdownItems[0]);

	const profileDropdownItems: ProfileDropdownItem[] = [
		{
			label: 'View profile',
			onClick: () => {
				/* handle click */
			},
			icon: userIcon
		},
		{
			label: 'Settings',
			onClick: () => {
				goto('/dashboard/settings');
			},
			icon: settingsIcon
		},
		{
			label: 'Team',
			onClick: () => {
				/* handle click */
			},
			icon: teamIcon
		},
		{
			label: 'Support',
			onClick: () => {
				goto('/dashboard/support');
			},
			icon: supportIcon
		},
		{
			label: 'Integration',
			onClick: () => {
				goto('/dashboard/integrations');
			},
			icon: integrationIcon
		},
		{
			label: 'Log out',
			onClick: () => {
				goto('/logout');
			},
			icon: logoutIcon
		}
	];

	let activeProfileDropdownItem = writable<ProfileDropdownItem | null>(null);

	activeProfileDropdownItem.set(profileDropdownItems[0]);

	// Handle side nav item open/close
	const handleSideNavToggle = () => {
		isSideNavOpen.update((value) => !value);
	};

	const revertToDefaultProfilePicture = (event: Event) => {
		const target = event.target as HTMLImageElement;
		target.src = defaultUserPng;
	};
</script>

<header class="container-fluid">
	<div class="row h-100 align-items-center">
		<div class="col col-md-3 logo">
			<!-- Logo -->
			<a href="/dashboard">
				<img src={Logo} alt="Logo" />
			</a>
		</div>
		<div class="col-auto col-md-7 p-2">
			<div class="d-flex justify-content-between align-items-center h-100">
				<!-- Menu for mobile screen -->
				<div class="col-auto d-block d-lg-none">
					<button class="btn btn-transparent fw-bold p-0" on:click={handleSideNavToggle}>
						MENU
					</button>
				</div>
				<div class="col-auto p-3 d-none d-lg-block">
					<!-- Page title -->
					<h1>
						{pageTitle}
					</h1>
				</div>
				<div class="col-5 col-md-8 d-none d-md-block">
					<!-- Nav items -->
					<div class="row">
						<div class="d-flex justify-content-center align-items-center col p-0">
							<!-- Language dropwdown -->
							<Dropdown {dropdownItems} activeDropdownItem={$activeDropdownItem} {setActiveItem}>
								<div class="gap-3 d-flex align-items-center">
									<img src={websiteIcon} alt="Website" />

									<div class="d-flex align-items-center">
										<span class="dropdown-label">{$activeDropdownItem?.label}</span>
										<img src={caretDownIcon} alt="Caret down" />
									</div>
								</div>
							</Dropdown>
						</div>
						<div class="d-flex justify-content-center align-items-center col-xxl-2 col-lg col-md">
							<!-- Messages dropdown -->
							<MessagesDropdown
								{messagesDropdownItems}
								activeDropdownItem={$activeMessageDropdownItem}
							>
								<div class="position-relative" style="height: 30px;">
									<img src={messageIcon} alt="Envelope" />
									<div class="position-absolute top-0 start-100 translate-middle alert-pill">
										<span>{totalUnreadMessages}</span>
									</div>
								</div>
							</MessagesDropdown>
						</div>
						<div class="d-flex justify-content-center align-items-center col-xxl-2 col-lg col-md">
							<!-- Notifications -->
							<NotificationDropdown
								{notificationDropdownItems}
								activeDropdownItem={$activeNotificationDropdownItem}
							>
								<div class="position-relative" style="height: 30px;">
									<img src={notificationIcon} alt="Bell" style="position: relative;top: 5px" />
									<div
										class="position-absolute top-0 start-100 translate-middle alert-pill notification"
									>
										<span>{totalUnreadNotifications}</span>
									</div>
								</div>
							</NotificationDropdown>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-auto col-md-2">
			<!-- Profile dropdown -->
			<ProfileDropdown {profileDropdownItems} activeDropdownItem={$activeProfileDropdownItem}>
				<div class="gap-3 d-flex align-items-center">
					{#if isLoading}
						<!-- Avatar -->
						<div class="avatar"></div>
					{:else if currentUser?.profilePicture}
						<img class="user-image" src={baseUrl + currentUser?.profilePicture.url} on:error={(event) => revertToDefaultProfilePicture(event)} alt="User" />
					{:else}
						<img class="user-image" src={defaultUserPng} alt="User" />
					{/if}

					<div class="d-flex align-items-center">
						<img src={caretDownIcon} alt="Caret down" />
					</div>
				</div>
			</ProfileDropdown>
		</div>
	</div>
</header>

<style>
	header {
		height: 100%;
		padding: 20px;
	}

	@media (min-width: 1200px) {
		header {
			padding: 0 100px;
		}
	}

	.dropdown-label {
		width: 75px;
		font-family: Plus Jakarta Sans;
		font-size: 20px;
		font-weight: 500;
		line-height: 25.2px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
	}

	.alert-pill {
		width: 32px;
		height: 32px;
		padding: 8px 7px 8px 7px;
		border-radius: 8px;
		background: #4425f5;
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.alert-pill.notification {
		background: #ff5247;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: #f1f1f1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Inter;
		font-size: 16px;
		font-weight: 700;
		line-height: 21px;
		letter-spacing: -0.01em;
		text-align: center;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		position: relative;
	}

	.user-image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: #f1f1f1;
	}
</style>
