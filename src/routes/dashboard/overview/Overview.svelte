<script lang="ts">
	import arrowUpSuccessIcon from '$lib/images/arrow-up-success.svg';
	import pdfIcon from '$lib/images/pdf.svg';
	import graph1Svg from '$lib/images/Graph-1.svg';
	import graph2Svg from '$lib/images/Graph-2.svg';
	import caretDownIcon from '$lib/images/caret-down-sm.svg';
	import chevronRightIcon from '$lib/images/chevron-right-colored.svg';
	import dots from '$lib/images/dots.svg';
	import Avatar from '$lib/images/Avatar.svg';
	import arrowDownSvg from '$lib/images/arrow-down.svg';
	import { onMount } from 'svelte';
	import {
		doctorsStore,
		metricsStore,
		revenueStore,
		transactionsStore
	} from '$lib/stores/overview';
	import type { MetricsDoc } from '../../../interfaces/metrics.interface';
	import type { RevenueDoc } from '../../../interfaces/revenue.interface';
	import type { TransactionDoc } from '../../../interfaces/transaction.interface';
	import type { DoctorsDoc } from '../../../interfaces/doctors.interface';

	onMount(() => {
		metricsStore.fetch();
		revenueStore.fetch();
		transactionsStore.fetch();
		doctorsStore.fetch();
	});

	let metrics: MetricsDoc[] = [];
	let revenue: RevenueDoc = {
		totalAppUsage: 0,
		totalConsultations: 0,
		totalRevenue: 0,
		totalFunding: 0,
		totalPayout: 0,
		createdAt: '',
		updatedAt: '',
		id: '',
		date: ''
	};
	let transactions: TransactionDoc[] = [];
	let doctors: DoctorsDoc[] = [];

	metricsStore.subscribe((value) => {
		metrics = value;
	});

	revenueStore.subscribe((value) => {
		if (value.length > 0) {
			revenue = value[0];
		}
	});

	transactionsStore.subscribe((value) => {
		transactions = value;
	});

	doctorsStore.subscribe((value) => {
		doctors = value;
	});

	const formatNumber = (number: number) =>
		new Intl.NumberFormat('en-US', { style: 'decimal' }).format(number);
	const formatCurrency = (value: number) =>
		new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
	const formatPercentage = (value: number) => `${value}%`;
	const formatShortNumber = (value: number) => {
		if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
		if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
		return value;
	};
	const formatCurrencyShort = (value: number) => {
		if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
		if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`;
		return `$${value}`;
	};
	const formatDate = (date: string) => {
		const options = { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const };
		return new Date(date).toLocaleDateString('en-US', options);
	};
	const formatTransactionCategory = (category: string) => {
		if (category === 'consultation') return 'Consultation';
		if (category === 'funding') return 'Funding';
		if (category === 'payout') return 'Payout';
		if (category === 'subscription') return 'Subscription';
		if (category === 'dr_withdrawal') return 'Dr. Withdrawal';
		if (category === 'other') return 'Other';
		return category;
	};
	const formatPaymentMethod = (method: string) => {
		if (method === 'card_type') return 'Card payment';
		if (method === 'bank_payment') return 'Bank payment';
		if (method === 'wallet_payment') return 'Wallet';
		return method;
	};
</script>

<div class="col-12">
	<div class="row">
		{#if metrics}
			{#each metrics as metric}
				<div class="col-12 col-md-6 col-lg-4 col-xxl mb-3">
					<div class="card">
						<p>{metric.title}</p>
						<div class="col-auto d-flex justify-content-between align-items-center">
							<h3>{formatNumber(metric.total)}</h3>
							<span class="text-success">
								+ {formatPercentage(Number(metric.change))}
								<img src={arrowUpSuccessIcon} alt="arrow up success" />
							</span>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<div class="col-12 mt-3">
	<div class="row">
		<div class="col-12 col-md-8 mb-3">
			<div class="card chart">
				<div class="container-fluid">
					<div class="row">
						<div class="col-12 col-md mb-3 mb-md-0">
							<h3>Revenue . Usage . Engagement</h3>
							<button type="button" class="export-btn">
								<img src={pdfIcon} alt="pdf" />
								Export PDF
							</button>
						</div>

						<div class="col-6 col-md-auto">
							<div class="row">
								<div class="col d-flex gap-2">
									<div class="ellipse revenue"></div>
									<div class="col">
										<p>Total Revenue</p>
										<h4>{formatShortNumber(revenue.totalRevenue)}</h4>
									</div>
								</div>
							</div>
						</div>

						<div class="col-6 col-md-auto">
							<div class="row">
								<div class="col d-flex gap-2">
									<div class="ellipse usage"></div>
									<div class="col">
										<p>Total App Usage</p>
										<h4>{formatShortNumber(revenue.totalAppUsage)}</h4>
									</div>
								</div>
							</div>
						</div>

						<div class="col-6 col-md-auto">
							<div class="row">
								<div class="col d-flex gap-2">
									<div class="ellipse engagement"></div>
									<div class="col">
										<p>Total Consultations</p>
										<h4>{formatShortNumber(revenue.totalConsultations)}</h4>
									</div>
								</div>
							</div>
						</div>

						<div class="graph col-12 p-2">
							<img src={graph1Svg} alt="graph 1" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 col-md-4 mb-3">
			<div class="card chart">
				<div class="container-fluid">
					<div class="row">
						<div class="col">
							<h3>Revenue</h3>
						</div>

						<div class="col-auto">
							<button type="button" class="filter-btn">
								Last 7 Days
								<img src={caretDownIcon} alt="pdf" />
							</button>
						</div>

						<div class="graph col-12 p-2">
							<img src={graph2Svg} alt="graph 2" height="218" />
						</div>

						<div class="col-auto graph-2">
							<div class="row">
								<div class="col d-flex gap-2">
									<div class="rectangle funding"></div>
									<div class="col">
										<p>Total Funding</p>
										<h4>{formatCurrencyShort(revenue.totalFunding)}</h4>
									</div>
								</div>
							</div>
						</div>

						<div class="col-auto graph-2">
							<div class="row">
								<div class="col d-flex gap-2">
									<div class="rectangle payout"></div>
									<div class="col">
										<p>Total Payout</p>
										<h4>{formatCurrencyShort(revenue.totalPayout)}</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="col-12 mt-3">
	<div class="row">
		<div class="col-12 col-lg-8 mb-3">
			<div class="card chart">
				<div class="container-fluid">
					<div class="row">
						<div class="col">
							<h3>Recent Transactions</h3>
						</div>

						<div class="col-auto">
							<button type="button" role="link" class="filter-btn">
								See All Transactions
								<img src={chevronRightIcon} alt=">" />
							</button>
						</div>

						<div class="col-12">
							<p class="sub text-nowrap">Here are the lists of recent transactions</p>
						</div>

						<div class="col-12 overflow-x-auto">
							<!-- Transaction Table -->
							<table class="table table-responsive">
								<tbody>
									{#each transactions as transaction}
										<tr>
											<td>
												<div class="status {transaction.status}">
													<div class="dot"></div>
													<span>{transaction.status}</span>
												</div>
											</td>
											<td>
												<div class="payment">
													<h6>{transaction.paymentMethod}</h6>
													<span>{formatPaymentMethod(transaction.paymentType)}</span>
												</div>
											</td>
											<td>
												<div class="payment">
													<h6>{formatCurrency(transaction.amount)}</h6>
													<span>{formatDate(transaction.date)}</span>
												</div>
											</td>
											<td>
												<span class="type">{formatTransactionCategory(transaction.category)}</span>
											</td>
											<td>
												<button type="button" role="menu" class="p-0 bg-transparent border-0">
													<img src={dots} alt="dots" />
												</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 col-lg-4 mb-3">
			<div class="card chart">
				<div class="container-fluid">
					<div class="row">
						<div class="col">
							<h3>Top-Performing Doctors</h3>
							<p class="sub">See at a glance</p>
						</div>

						<div class="container-fluid doctors py-3">
							<div class="row gap-3">
								{#each doctors as doctor}
									<div class="col-12">
										<div class="row">
											<div class="col-auto d-flex justify-content-between align-items-center">
												<img src={Avatar} alt="avatar" />
											</div>
											<div class="col">
												<div class="col-12 d-flex justify-content-between align-items-center">
													<h6>{doctor.name}</h6>
													<span class="rating">{formatNumber(doctor.consultations)}</span>
												</div>
												<div class="col-12 d-flex justify-content-between align-items-center">
													<span class="role">{doctor.specialization}</span>
													<span class="no-of-consultation">No of Consultations</span>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<div class="col-12">
							<button type="button" class="filter-btn load">
								<img src={arrowDownSvg} alt="down arrow" />
								Load more
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card {
		border-color: #e4e4e7;
		padding: 11.5px;
	}

	.card p {
		font-family: Gotham Pro;
		font-size: 11px;
		font-weight: 300;
		line-height: 18px;
		letter-spacing: 1px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #71717a;
		text-transform: uppercase;
	}

	.card h3 {
		font-family: Gotham Pro;
		font-size: 21px;
		font-weight: 700;
		line-height: 32px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #18181b;
		margin: 0;
	}

	.card .text-success {
		font-family: Gotham Pro;
		font-size: 13px;
		font-weight: 400;
		line-height: 12.44px;
		text-align: right;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #22c55e;
	}

	.card.chart {
		height: 100%;
	}

	.card.chart h3 {
		font-family: Axiforma;
		font-size: 16px;
		font-weight: 700;
		line-height: 24px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #18181b;
		margin-bottom: 0.5rem !important;
	}

	.card.chart h4 {
		font-family: Gotham Pro;
		font-size: 18px;
		font-weight: 400;
		line-height: 24px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #000000;
		margin: 0;
	}

	.card.chart p {
		font-family: Gotham Pro;
		font-size: 12px;
		font-weight: 300 !important;
		line-height: 24px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #000000;
		margin: 0;
		white-space: nowrap;
		text-transform: none !important;
	}

	.ellipse {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		position: relative;
		top: 6px;
	}

	.ellipse.revenue {
		background-color: #00bdff;
	}

	.ellipse.usage {
		background-color: #fe265b;
	}

	.ellipse.engagement {
		background-color: #4425f5;
	}

	.rectangle {
		width: 21px;
		height: 8px;
		position: relative;
		top: 9px;
	}

	.rectangle.funding {
		background-color: #16bfd6;
	}

	.rectangle.payout {
		background-color: #4425f5;
	}

	.export-btn {
		border: 1px solid #d4d4d8;
		border-radius: 5px;
		background-color: #ffffff;
		outline: none;
		font-family: Plus Jakarta Sans;
		font-size: 11px;
		font-weight: bold;
		line-height: 18px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #18181b;
		padding: 5px;
		display: flex;
		justify-content: space-between;
		gap: 5px;
		align-items: center;
	}

	.export-btn:hover {
		background-color: #f4f4f5;
	}

	.filter-btn {
		font-family: Plus Jakarta Sans;
		font-size: 12px;
		font-weight: 500;
		line-height: 20px;
		text-align: right;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #181818;
		background-color: transparent;
		border: none;
		outline: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 5px;
	}

	.filter-btn[role='link'] {
		color: #4f46e5;
		font-family: Plus Jakarta Sans;
		font-size: 12px;
		font-weight: 500;
		line-height: 21px;
		text-align: right;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
	}

	.graph {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.graph img {
		width: 100%;
	}

	.graph-2 p {
		font-family: Gotham Pro;
		font-size: 12px;
		font-weight: 400;
		line-height: 11.48px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #4f4f4f;
		text-transform: none !important;
	}

	p.sub {
		font-family: Plus Jakarta Sans;
		font-size: 13px;
		font-weight: 400;
		line-height: 22px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #71717a;
		white-space: wrap !important;
	}

	table {
		margin: 0;
	}

	tbody tr td {
		padding: 17.5px 5px;
		vertical-align: middle;
	}

	tbody tr td:first-child {
		padding-left: 0;
	}

	tbody tr td:last-child {
		padding-right: 0;
	}

	tbody tr:last-child td {
		border-bottom: none;
		position: sticky;
	}

	.status {
		width: fit-content;
		height: 28px;
		border-radius: 40px;
		position: relative;
		text-align: center;
		padding: 0 13px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		font-family: Plus Jakarta Sans;
		font-size: 12px;
		font-weight: 500;
		line-height: 20px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		text-transform: capitalize;
	}

	.status .dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.payment h6 {
		font-family: Plus Jakarta Sans;
		font-size: 13px;
		font-weight: bold !important;
		line-height: 22px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		margin: 0;
		color: #18181b;
		white-space: nowrap;
	}

	.payment span,
	span.type {
		font-family: Plus Jakarta Sans;
		font-size: 13px;
		font-weight: 500;
		line-height: 21px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #71717a;
		text-transform: capitalize;
	}

	.doctors h6 {
		font-family: Plus Jakarta Sans;
		font-size: 13px;
		font-weight: 700;
		line-height: 22px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #18181b;
		margin: 0;
	}

	.doctors span.role {
		font-family: Gotham Pro;
		font-size: 13px;
		font-weight: lighter;
		line-height: 22px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #71717a;
		text-transform: capitalize;
	}

	.doctors span.rating {
		font-family: Plus Jakarta Sans;
		font-size: 13px;
		font-weight: 500;
		line-height: 21px;
		text-align: right;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #181818;
	}

	.doctors span.no-of-consultation {
		font-family: Plus Jakarta Sans;
		font-size: 13px;
		font-weight: 400;
		line-height: 22px;
		text-align: right;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #71717a;
	}

	button.filter-btn.load {
		font-family: Gotham Pro;
		font-size: 14px;
		font-weight: 400;
		line-height: 13.4px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: #b2b1b1;
		display: flex;
		align-items: flex-end;
	}
</style>
