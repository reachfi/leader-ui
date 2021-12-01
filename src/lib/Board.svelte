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
		class="box bg-white shadow-sm flex flex-col sm:flex-row items-center justify-center md:gap-16 3xl:gap-24 md:p-8 lg:col-start-1 lg:col-span-5 sm:row-span-1"
	>
		<div class="hidden xl:contents">
			<p>Explanation about Actionable metrics</p>
		</div>
		<Chart status={$status} class="2xl:w-48 xl:w-32">
			<TrendKpi
				min={$historic_min}
				max={$historic_max}
				value={$recent_throughput}
				mean={$historic_mean}
				label="Last 3 weeks"
				height="100"
				showLegend
				showValue
				showChart={false}
				units="Avg. Merged PRs"
			/>
		</Chart>
		<Chart status={$status} class="2xl:w-48 xl:w-32">
			<TrendArrowKpi value={$trend.percentage} direction={$trend.direction} msg={`Last week ${$trend.a} vs two weeks ago ${$trend.b}`} />
		</Chart>
		<Chart status={$status} class="xl:w-1/4 md:w-1/3">
			<TrendKpi
				min={$historic_mean - $historic_stddev}
				max={$historic_mean + $historic_stddev}
				mean={$historic_mean}
				value={$recent_throughput}
				label="Versus Historical Avg."
				units={`Mean: ${$historic_mean} PRs`}
				height="100"
				showLegend
			/>
		</Chart>
		<Chart status={$status} class="xl:w-1/4 md:w-1/3">
			<TrendKpi
				min={$historic_min}
				max={$historic_max}
				mean={$historic_mean}
				value={$recent_throughput}
				label="Within range"
				units={`Historical: ${$historic_min}-${$historic_max} PRs`}
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
	<div class="box ">table</div>
</div>

<!-- Throughput -->
<style>
	.box {
		@apply min-w-full		
		min-h-0		
		h-full		
		overflow-auto		
		self-center	
		justify-center
		rounded-2xl;
	}
</style>
