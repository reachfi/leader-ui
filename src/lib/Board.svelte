<script>
	import { getTeamThrouput } from './api';
	import { useQuery } from '@sveltestack/svelte-query';
	import Histogram from './visualizations/Histogram.svelte';
	import TrendKpi from './visualizations/TrendKPI.svelte';
	import Chart from './visualizations/Chart.svelte';
	let organization = 'lucidhq';
	let repo = 'rx-ui';
	let team = 'ui';
	const data = useQuery('teamStats', () => getTeamThrouput(organization, team));
</script>

<div class="grid overflow-hidden grid-cols-3 grid-rows-5 gap-5 sm:grid-cols-1 lg:grid-cols-3 mb-6 min-h-screen h-48">
	<div class="box">
		<Chart status={$data.status}>
			<TrendKpi min="0" max="100" value="95" label="3 wks throughput vs historic" height="100" />
		</Chart>
	</div>
	<div class="box">2</div>
	<div class="box">3</div>
	<div class="box row-start-2 row-end-4">Text</div>
	<div class="box row-start-2 row-end-4 col-start-2 col-end-4 ">
		<Chart status={$data.status} height="324">
			<Histogram dataset={$data.data.weekly_prs_by_org_team} title="Weekly Throughput" height="324" />
		</Chart>
	</div>
	<div class="box row-start-4 row-end-6 col-start-1 col-end-4">table</div>
</div>

<style>
	.box {
		@apply min-w-full		
		min-h-0		
		h-full
		bg-white 		
		overflow-auto
		shadow 			
		self-center	
		justify-center
		rounded-lg;
	}
</style>
