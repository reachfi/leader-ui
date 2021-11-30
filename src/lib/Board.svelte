<script>
	import { getTeamThrouput } from './api';
	import { useQuery } from '@sveltestack/svelte-query';
	import Histogram from './visualizations/Histogram.svelte';
	import TrendKpi from './visualizations/TrendKPI.svelte';
	import Chart from './visualizations/Chart.svelte';
	import im from '$lib/im.svelte';

	let organization = 'lucidhq';
	let repo = 'rx-ui';
	let team = 'ui';
	//move to store?
	const dataset = useQuery('teamStats', () => getTeamThrouput(organization, team));
	$: status = $dataset.status;
	$: historic_min = $dataset.data?.historic.aggregate.min.prs;
	$: historic_max = $dataset.data?.historic.aggregate.max.prs;
	$: historic_mean = $dataset.data?.historic.aggregate.avg.prs;
	$: historic_stddev = $dataset.data?.historic.aggregate.stddev.prs;
	$: recent_throughput = $dataset.data?.last_three_weeks.aggregate.avg.prs;
</script>

<!-- Throughput -->
<div class="overflow-hidden  gap-8 mb-6 min-h-screen grid grid-rows-dashboard md:grid-rows-dashboard-desktop md:max-h-screen">
	<div
		class="box bg-white shadow-sm flex flex-col sm:flex-row items-center justify-center md:gap-16 3xl:gap-24 md:p-8 lg:col-start-1 lg:col-span-5 sm:row-span-1"
	>
		<div class="hidden xl:contents">
			<p>Explanation about Actionable metrics</p>
		</div>
		<Chart {status} class="2xl:w-48 xl:w-32">
			<TrendKpi
				min={historic_min}
				max={historic_max}
				value={recent_throughput}
				mean={historic_mean}
				label="Last 3 weeks"
				height="100"
				showLegend
				showValue
				showChart={false}
				units="Avg. Merged PRs"
			/>
		</Chart>
		<Chart {status} class="xl:w-1/4 md:w-1/3">
			<TrendKpi
				min={historic_mean - historic_stddev}
				max={historic_mean + historic_stddev}
				mean={historic_mean}
				value={recent_throughput}
				label="Versus Historical Avg."
				units={`Mean: ${historic_mean} PRs`}
				height="100"
				showLegend
			/>
		</Chart>
		<Chart {status} class="xl:w-1/4 md:w-1/3">
			<TrendKpi
				min={historic_min}
				max={historic_max}
				mean={historic_mean}
				value={recent_throughput}
				label="Within range"
				units={`Historical: ${historic_min}-${historic_max} PRs`}
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
		<Chart {status} class="">
			<Histogram dataset={$dataset.data.weekly_prs_by_org_team} title="Year to Date (Weekly)" />
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
