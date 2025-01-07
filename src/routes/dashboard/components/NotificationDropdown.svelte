<script lang="ts">
	import { onMount } from 'svelte';
	import type { NotificationDropdownItem } from '../../../interfaces/header.interface';
	import notificationIcon2 from '$lib/images/notification-2.svg';
	import { goto } from '$app/navigation';

	export let notificationDropdownItems: NotificationDropdownItem[] = []; // Dropdown items
	export let activeDropdownItem: NotificationDropdownItem | null = null;
	export let setActiveItem: (item: NotificationDropdownItem) => void = () => {};

	let isOpen: boolean = false; // Prop to manage the visibility of the dropdown

	const closeDropdown = () => {
		isOpen = false;
	};

	// Handle click on an item, mark it as active, and close dropdown
	const handleItemClick = (index: number) => {
		let item = notificationDropdownItems[index];
		activeDropdownItem = item;
		setActiveItem(item);
		goto('/dashboard/notification');

		// if (item.onClick) {
		// 	item.onClick();
		// }
		closeDropdown();
	};

	const handleToggleDropdown = () => {
		isOpen = !isOpen;
	};

	// Close dropdown when clicking outside
	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const dropdown = document.getElementById('notificationdropdown');
			if (dropdown && !dropdown.contains(event.target as Node)) {
				closeDropdown();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="dropdown" id="notificationdropdown">
	<!-- Dropdown toggle button -->
	<button
		type="button"
		aria-haspopup="true"
		aria-expanded={isOpen}
		on:click={() => handleToggleDropdown()}
		class="btn btn-transparent p-0"
	>
		<!-- Dropdown toggle button (passed as children) -->
		<slot></slot>
	</button>

	<!-- Dropdown menu -->
	{#if isOpen}
		<div class="dropdown-menu">
			<div class="col-12 p-0 d-flex justify-content-between align-items-center">
				<h3>Notification</h3>
				<button class="mark-btn" type="button"> Mark all as read </button>
			</div>
			{#each notificationDropdownItems as { message, time, title }, i}
				<button
					type="button"
					class="dropdown-item {activeDropdownItem?.title === title ? 'active' : ''}"
					on:click={() => handleItemClick(i)}
					on:keydown={(e) => e.key === 'Enter' && handleItemClick(i)}
					role="menuitem"
				>
					<div class="avatar">
						<img src={notificationIcon2} alt="bell" />
					</div>
					<div class="message col">
						<div class="content d-flex justify-content-between align-items-center">
							<div class="name">{title}</div>
							<div class="time">{time}</div>
						</div>
						<div class="timestamp d-flex justify-content-between align-items-center">
							<div class="text text-truncate">{@html message}</div>
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-menu {
		position: absolute;
		background-color: white;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
		z-index: 1;
		padding: 0px;
		padding-bottom: 20px;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 24px;
		overflow: hidden;
		top: 35px;
		width: 306px;
	}

	.dropdown-menu h3 {
		font-family: Axiforma;
		font-size: 18px;
		font-weight: 700;
		text-align: center;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #4425f5;
		text-align: start;
		margin: 0;
		padding: 20px;
		padding-bottom: 5px;
	}

	.dropdown-item {
		cursor: pointer;
		font-family: Gotham Pro;
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #344054;
		padding: 10px 20px;
		display: flex;
		gap: 8px;
		justify-content: space-between;
		align-items: center;
	}

	.dropdown-item:hover {
		background-color: #e7e7e754 !important;
	}

	.dropdown-item.active {
		background-color: transparent;
		color: #344054;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
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

	.message {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.name {
		font-family: Gotham Pro;
		font-size: 14px;
		font-weight: bold;
		line-height: 13.4px;
		text-align: center;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		text-transform: capitalize;
	}

	.time {
		font-family: Inter;
		font-size: 12px;
		font-weight: 400;
		line-height: 14.52px;
		text-align: right;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
	}

	.text {
		font-family: Gotham Pro;
		font-size: 12px;
		font-weight: 400;
		line-height: 21px;
		letter-spacing: -0.01em;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		max-width: 200px;
		color: #9d9d9d;
	}

	button.mark-btn {
		font-family: Axiforma;
		font-size: 10px;
		font-weight: 500;
		line-height: 36px;
		text-align: center;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #000000;
		background-color: transparent;
		border: none;
		padding: 20px;
		padding-bottom: 5px;
	}
</style>
