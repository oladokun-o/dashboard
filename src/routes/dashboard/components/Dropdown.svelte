<script lang="ts">
	import { onMount } from 'svelte';
	import type { DropdownItem } from '../../../interfaces/header.interface';

	export let dropdownItems: DropdownItem[] = []; // Dropdown items
	export let activeDropdownItem: DropdownItem | null = null;
	export let setActiveItem: (item: DropdownItem) => void = () => {};

	let isOpen: boolean = false; // Prop to manage the visibility of the dropdown

	const closeDropdown = () => {
		isOpen = false;
	};

	// Handle click on an item, mark it as active, and close dropdown
	const handleItemClick = (index: number) => {
		let item = dropdownItems[index];
		activeDropdownItem = item;
		setActiveItem(item);
		if (item.onClick) {
			item.onClick();
		}
		closeDropdown();
	};

	const handleToggleDropdown = () => {
		isOpen = !isOpen;
	};

	// Close dropdown when clicking outside
	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const dropdown = document.getElementById('dropdown');
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

<div class="dropdown" id="dropdown">
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
			{#each dropdownItems as { label, onClick }, i}
				<button
					type="button"
					class="dropdown-item {activeDropdownItem?.label === label ? 'active' : ''}"
					on:click={() => handleItemClick(i)}
					on:keydown={(e) => e.key === 'Enter' && handleItemClick(i)}
					role="menuitem"
				>
					{label}
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
		padding: 0;
		border-radius: 8px;
		display: block;
		overflow: hidden;
		top: 35px;
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
	}

	.dropdown-item:hover {
		background-color: #f1f1f1;
	}

	.dropdown-item.active {
		background-color: #80808010;
		color: #344054;
	}
</style>
