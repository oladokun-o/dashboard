import { writable } from 'svelte/store';
import type { SideNav } from '../../interfaces/sidenav.interface';
import homeIcon from '$lib/images/side-nav/home.svg';
import userIcon from '$lib/images/side-nav/user.svg';
import doctorIcon from '$lib/images/side-nav/healthicons_doctor-male-outline.svg';
import vendorIcon from '$lib/images/side-nav/shop.svg';
import riderIcon from '$lib/images/side-nav/ph_person-simple-bike.svg';
import ambulanceIcon from '$lib/images/side-nav/car.svg';
import orderIcon from '$lib/images/side-nav/shopping-cart.svg';
import inventoryIcon from '$lib/images/side-nav/clipboard.svg';
import paymentIcon from '$lib/images/side-nav/convert-3d-cube.svg';
import telemedicineIcon from '$lib/images/side-nav/eraser.svg';
import contentIcon from '$lib/images/side-nav/subtitle.svg';
import supportIcon from '$lib/images/side-nav/user-octagon.svg';
import integrationIcon from '$lib/images/side-nav/link.svg';
import reportIcon from '$lib/images/side-nav/note.svg';
import staffIcon from '$lib/images/side-nav/note-2.svg';
import notificationIcon from '$lib/images/side-nav/notification-bing.svg';
import masterIcon from '$lib/images/side-nav/personalcard.svg';
import messageIcon from '$lib/images/side-nav/subtitle-1.svg';
import settingsIcon from '$lib/images/side-nav/setting-2.svg';
import logoutIcon from '$lib/images/side-nav/logout.svg';

// State to manage whether the side nav is open or closed
export const isSideNavOpen = writable(true);

// Array of side nav items
export const sideNavItems = writable<SideNav[]>([
	{ label: 'Overview', icon: homeIcon, path: '/dashboard', title: 'Overview' },
	{
		label: 'User Mgt.',
		icon: userIcon,
		title: 'User Management',
		path: '/dashboard/user-management',
		disabled: false
	},
	{ label: 'Doctors Mgt.', icon: doctorIcon, title: 'Doctors Management', disabled: false, path: '/dashboard/doctors-management' },
	{ label: 'Vendors Mgt.', icon: vendorIcon, title: 'Vendors Management', disabled: false, path: '/dashboard/vendors-management' },
	{ label: 'Riders Mgt.', icon: riderIcon, title: 'Riders Management', disabled: false, path: '/dashboard/riders-management' },
	{ label: 'Ambulance Mgt.', icon: ambulanceIcon, title: 'Ambulance Management', disabled: false, path: '/dashboard/ambulance-management' },
	{ label: 'Order Mgt.', icon: orderIcon, title: 'Order Management', disabled: false, path: '/dashboard/order-management' },
	{ label: 'Inventory Mgt.', icon: inventoryIcon, title: 'Inventory Management', disabled: false, path: '/dashboard/inventory-management' },
	{ label: 'Payment & Transactions', icon: paymentIcon, title: 'Payment & Transactions', disabled: false, path: '/dashboard/payment-transactions' },
	{ label: 'Telemedicine Mgt.', icon: telemedicineIcon, title: 'Telemedicine Management', disabled: false, path: '/dashboard/telemedicine-management' },
	{ label: 'Content Mgt.', icon: contentIcon, title: 'Content Management', disabled: false, path: '/dashboard/content-management' },
	{ label: 'Support', icon: supportIcon, title: 'Support', disabled: false, path: '/dashboard/support' },
	{ label: 'Integrations', icon: integrationIcon, title: 'Integrations', disabled: false, path: '/dashboard/integrations' },
	{ label: 'Report & Analysis', icon: reportIcon, title: 'Report & Analysis', disabled: false, path: '/dashboard/report-analysis' },
	{ label: 'Staff Mgt.', icon: staffIcon, title: 'Staff Management', disabled: false, path: '/dashboard/staff-management' },
	{ label: 'Notification', icon: notificationIcon, title: 'Notification', disabled: false, path: '/dashboard/notification' },
	{ label: 'Master / Marketing', icon: masterIcon, title: 'Master / Marketing', disabled: false, path: '/dashboard/master-marketing' },
	{ label: 'Internal Message', icon: messageIcon, title: 'Internal Message', disabled: false, path: '/dashboard/internal-message' },
	{ label: 'Settings', icon: settingsIcon, title: 'Settings', disabled: false, path: '/dashboard/settings' },
	{ label: 'Logout', icon: logoutIcon, path: '/logout' }
]);

// State to manage the currently selected side nav item
export const selectedNavItem = writable<SideNav | null>(null);
