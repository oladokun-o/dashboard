<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isSideNavOpen, selectedNavItem, sideNavItems } from '$lib/stores/sidenav';
	import { onMount } from 'svelte';
	import type { SideNav } from '../../../interfaces/sidenav.interface';
	import { get } from 'svelte/store';

	// Close side nav when an item is clicked
	function handleNavItemClick(item: SideNav) {
		if (item.path) {
			if (item.path !== '/logout') {
				selectedNavItem.set(item);
			}
			goto(item.path);
		} else {
			selectedNavItem.set(item);
		}
	}
	
	let isOpen = false;

	// Subscribe to the sideNavItems store
	isSideNavOpen.subscribe((value) => {
		isOpen = value;
	});
	
	const closeSideNav = () => {
		if (!isOpen) {
			isSideNavOpen.set(false);
		}
	};

	// On mount, restore the selected nav item
	onMount(() => {
		const storedItem = localStorage.getItem('selectedNavItem');
		if (storedItem) {
			selectedNavItem.set(JSON.parse(storedItem));
		}

		// Close sidenav when clicking outside
		const handleClickOutside = (event: MouseEvent) => {
			const el = document.getElementById('sidenav');
			if (el && !el.contains(event.target as Node)) {
				closeSideNav();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	// Reactively update the selected item and save to localStorage
	$: {
		const currentRoute = $page.url.pathname;
		const navItems = $sideNavItems;

		const matchedItem = navItems.find((item) => item.path === currentRoute) || null;

		selectedNavItem.set(matchedItem);

		if (typeof window !== 'undefined' && matchedItem) {
			localStorage.setItem('selectedNavItem', JSON.stringify(matchedItem));
		}
	}
</script>

<div class="sidenav-box" class:closed={!$isSideNavOpen}>
	<ul>
		{#each $sideNavItems as item}
			<li>
				<button
					type="button"
					class="sidenav-item {item.label === $selectedNavItem?.label ? 'active' : ''}"
					disabled={item.disabled}
					on:click={() => handleNavItemClick(item)}
					tabindex="0"
					aria-label={item.label}
					on:keydown={(e) => e.key === 'Enter' && handleNavItemClick(item)}
				>
					{#if item.icon}
						<span class="icon">
							<img src={item.icon} alt={item.label} />
						</span>
					{/if}

					{item.label}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.sidenav-box {
		width: 335px;
		height: 100%;
		overflow-y: auto;
		border-radius: 15px;
		background-color: white;
		padding: 24px;
	}

	/* Hide the scrollbar */
	.sidenav-box::-webkit-scrollbar {
		display: none;
	}

	ul {
		list-style: none;
		padding: 0;
		gap: 24px;
		display: flex;
		flex-direction: column;
	}

	li {
		width: 100%;
	}

	li:last-child .sidenav-item {
		color: #fe265b !important;
	}

	.sidenav-item {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 10px;
		padding: 17.35px;
		cursor: pointer;
		transition: background 0.3s;
		width: 100%;
		background-color: transparent;
		border: none;
		outline: none;
		font-family: Gotham Pro;
		font-size: 16px;
		font-weight: 400;
		line-height: 15.31px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #979797;
		border-radius: 10px;
	}

	.sidenav-item:hover {
		background: #4425f50a;
	}

	.sidenav-item.active {
		background: #4425f50a;
		color: #4425f5;
	}

	.sidenav-item.active img {
		filter: brightness(0) saturate(100%) invert(11%) sepia(87%) saturate(7284%) hue-rotate(255deg)
			brightness(97%) contrast(99%);
	}
</style>
