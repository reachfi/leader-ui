<script>
	import Histogram from './visualizations/Histogram.svelte';
	import TrendKpi from './visualizations/TrendKPI.svelte';
	import Chart from './visualizations/Chart.svelte';
	// import im from '$lib/im.svelte';
	import TrendArrowKpi from './visualizations/TrendArrowKPI.svelte';
	import {
		fetchDashboardData,
		status,
		historic_min,
		historic_max,
		recent_throughput,
		historic_mean,
		historic_stddev,
		weekly_prs_by_org_team,
		trend
	} from '$lib/_board';

	let organization = 'lucidhq';
	let repo = 'rx-ui';
	let team = 'ui';

	fetchDashboardData(organization, team);
</script>

<!-- Throughput -->
<div class="overflow-hidden  gap-8 mb-6 min-h-screen grid grid-rows-dashboard md:grid-rows-dashboard-desktop md:max-h-screen">
	<div
		class="box bg-white shadow-sm flex flex-col sm:flex-row sm:row-span-2 sm:flex-wrap lg:row-span-1 lg:flex-nowrap items-center justify-center sm:p-4 lg:gap-16 3xl:gap-24 lg:p-8 lg:col-start-1 lg:col-span-5"
	>
		<div class="xl:w-1/5 hidden xl:block">
			<div>Throughput</div>
			<div class="relative pt-4 text-xs text-neutral-600 quote">
				<div class="flex items-center">
					Consistency of throughput, and how it compares to the rate at which you start work, is one indicator of how stable your process is.
				</div>
			</div>
		</div>
		<Chart status={$status} class="2xl:w-48 xl:w-32 lg:w-1/4 sm:w-1/2">
			<TrendKpi
				min={$historic_min}
				max={$historic_max}
				value={$recent_throughput}
				mean={$historic_mean}
				height="100"
				showLegend
				showValue
				showChart={false}
				label="Avg. Merged PRs"
				units="Last 3 weeks"
			/>
		</Chart>
		<Chart status={$status} class="xl:w-1/5 lg:w-1/4 sm:w-1/2">
			<TrendArrowKpi trend={$trend} label={`Last 3 weeks`} height="100" />
		</Chart>
		<Chart status={$status} class="xl:w-1/5 lg:w-1/4 sm:w-1/2">
			<TrendKpi
				min={$historic_mean - $historic_stddev}
				max={$historic_mean + $historic_stddev}
				mean={$historic_mean}
				value={$recent_throughput}
				label="Versus Historical Avg."
				height="100"
				showLegend
			/>
		</Chart>
		<Chart status={$status} class="xl:w-1/5 lg:w-1/4 sm:w-1/2">
			<TrendKpi
				min={$historic_min}
				max={$historic_max}
				mean={$historic_mean}
				value={$recent_throughput}
				label="Within Historical Min-Max"
				height="100"
				showLegend
			/>
		</Chart>
	</div>
	<div class="box shadow hidden lg:contents">
		<div class="bg-brand-green text-center pt-6 text-xl rounded-2xl">
			<!-- <svelte:component this={im} /> -->
			aaa
		</div>
	</div>
	<div class="box bg-white shadow lg:col-start-2 lg:col-span-4 xl:col-span-3 md:row-span-2 lg:row-span-3 xl:row-span-2">
		<Chart status={$status} class="">
			<Histogram dataset={$weekly_prs_by_org_team} title="Year to Date (Weekly)" />
		</Chart>
	</div>
	<div class="box shadow hidden lg:contents">
		<div class="bg-brand-green text-center pt-6 text-xl rounded-2xl">aaa</div>
	</div>
	<div class="box " />
</div>

<!-- Throughput -->
<style>
	.box {
		@apply min-w-full		
		min-h-0		
		h-full		
		overflow-hidden
		self-center	
		justify-center
		rounded-2xl;
	}
</style>
