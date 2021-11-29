<script>
	import { getTeamThrouput } from './api';
	import { useQuery } from '@sveltestack/svelte-query';
	import Histogram from './visualizations/Histogram.svelte';
	import TrendKpi from './visualizations/TrendKPI.svelte';
	import Chart from './visualizations/Chart.svelte';
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
<div class="grid overflow-hidden grid-cols-4 grid-rows-5 gap-y-8 gap-x-6 sm:grid-cols-1 lg:grid-cols-4 mb-6 min-h-screen h-48">
	<!-- // replace flex with grid -->
	<div class="box bg-white shadow-sm col-start-1 col-end-5 flex flex-col sm:flex-row items-center justify-center xl:gap-16 3xl:gap-24 px-8 3xl:px-24">
		<div>
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
				units="Merged PRs"
			/>
		</Chart>
		<Chart {status} class="w-1/4">
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
		<Chart {status} class="w-1/4">
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
	<div class="box row-start-2 row-end-4 explanation shadow text-center pt-6 text-white font-bold text-xl">Text</div>
	<div class="box row-start-2 row-end-4 col-start-2 col-end-5 bg-white shadow">
		<Chart {status}>
			<Histogram dataset={$dataset.data.weekly_prs_by_org_team} title="Year to Date (Weekly)" height="254" />
		</Chart>
	</div>
	<div class="box row-start-4 row-end-6 col-start-1 col-end-4">table</div>
	<div class="box">16</div>
	<div class="box">20</div>
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
	.explanation {
		background-color: rgba(166, 168, 223, 0.5);
		/* @apply shadow 
		text-center 
		pt-6  */
		/* bg-cyan-400 */
		/* font-bold 
		text-xl; */
	}
</style>
