<script lang="ts">
	import { onMount } from 'svelte';
	import type { MessageDropdownItem } from '../../../interfaces/header.interface';
	import { goto } from '$app/navigation';

	export let messagesDropdownItems: MessageDropdownItem[] = []; // Dropdown items
	export let activeDropdownItem: MessageDropdownItem | null = null;
	export let setActiveItem: (item: MessageDropdownItem) => void = () => {};

	let isOpen: boolean = false; // Prop to manage the visibility of the dropdown

	const closeDropdown = () => {
		isOpen = false;
	};

	// Handle click on an item, mark it as active, and close dropdown
	const handleItemClick = (index: number) => {
		let item = messagesDropdownItems[index];
		activeDropdownItem = item;
		setActiveItem(item);
		goto('/dashboard/internal-message');

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
			const dropdown = document.getElementById('messagedropdown');
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

<div class="dropdown" id="messagedropdown">
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
			<h3>Messages</h3>
			{#each messagesDropdownItems as { user_abbreviation, user_abbreviation_color, message, online, time, user_name, number_of_messages }, i}
				<button
					type="button"
					class="dropdown-item {activeDropdownItem?.user_abbreviation === user_abbreviation
						? 'active'
						: ''}"
					on:click={() => handleItemClick(i)}
					on:keydown={(e) => e.key === 'Enter' && handleItemClick(i)}
					role="menuitem"
				>
					<div class="avatar" style="background-color: {user_abbreviation_color.accent};">
						{#if online}
							<div class="online"></div>
						{/if}
						<span style="color: {user_abbreviation_color.primary};">{user_abbreviation}</span>
					</div>
					<div class="message col">
						<div class="content d-flex justify-content-between align-items-center">
							<div class="name">{user_name}</div>
							<div class="time">{time}</div>
						</div>
						<div class="timestamp d-flex justify-content-between align-items-center">
							<div class="text text-truncate message-content">{@html message}</div>
							{#if number_of_messages && number_of_messages > 0}
								<div class="number-of-messages">{number_of_messages}</div>
							{/if}
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

	.online {
		width: 10.67px;
		height: 10.67px;
		border-radius: 50%;
		background-color: #10B981;
		margin-left: 4px;
		border: 2px solid #FFFFFF;
		position: absolute;
		top: 5.33px;
		left: -5.33px;
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
		font-weight: 300;
		line-height: 21px;
		letter-spacing: -0.01em;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		max-width: 200px;
	}

	.number-of-messages {
		width: 14px;
		height: 16px;
		padding: 4px;
		border-radius: 4px;
		background: #2446bc;
		font-family: Inter;
		font-size: 8px;
		font-weight: 600;
		line-height: 8px;
		letter-spacing: -0.01em;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
