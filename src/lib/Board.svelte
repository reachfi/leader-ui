<script>
	import { getTeamThrouput } from './api';
	import { useQuery } from '@sveltestack/svelte-query';
	import Histogram from './visualizations/Histogram.svelte';
	import TrendKpi from './visualizations/TrendKPI.svelte';
	import Chart from './visualizations/Chart.svelte';
	let organization = 'lucidhq';
	let repo = 'rx-ui';
	let team = 'ui';
	const dataset = useQuery('teamStats', () => getTeamThrouput(organization, team));
	$: status = $dataset.status;
	$: historic_min = $dataset.data?.historic.aggregate.min.prs;
	$: historic_max = $dataset.data?.historic.aggregate.max.prs;
	$: recent_throughput = $dataset.data?.last_three_weeks.aggregate.avg.prs;
</script>

<div class="grid overflow-hidden grid-cols-4 grid-rows-5 gap-y-8 gap-x-6 sm:grid-cols-1 lg:grid-cols-4 mb-6 min-h-screen h-48">
	<div class="box bg-white shadow col-start-1 col-end-5 flex flex-row items-center justify-center gap-x-20">
		<!-- add title Last 3 weeks to strip-->
		<Chart {status}>
			<TrendKpi min={historic_min} max={historic_max} value={recent_throughput} label="Throughput vs Historic" height="100" />
		</Chart>
		<Chart {status}>
			<TrendKpi min={historic_min} max={historic_max} value={recent_throughput} label="Throughput vs Historic" height="100" />
		</Chart>
		<Chart {status}>
			<TrendKpi min={historic_min} max={historic_max} value={recent_throughput} label="Throughput vs Historic" height="100" />
		</Chart>
	</div>
	<div class="box row-start-2 row-end-4 explanation shadow text-center pt-6 text-white font-bold text-xl">Text</div>
	<div class="box row-start-2 row-end-4 col-start-2 col-end-5 bg-white shadow">
		<Chart {status}>
			<Histogram dataset={$dataset.data.weekly_prs_by_org_team} title="Weekly Throughput" height="254" />
		</Chart>
	</div>
	<div class="box row-start-4 row-end-6 col-start-1 col-end-4">table</div>
	<div class="box">16</div>
	<div class="box">20</div>
</div>

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
