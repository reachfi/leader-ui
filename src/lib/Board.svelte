<script>
	import { getWeeklyPrsByTeam } from './api';
	import { useQuery, useQueryClient } from '@sveltestack/svelte-query';
	import Histogram from "./Histogram.svelte"
	let organization = 'lucidhq';
	let repo = 'rx-ui';
	let team = 'ui'
	const prs = useQuery('cursorId', () => getWeeklyPrsByTeam(organization, team));
</script>

<h1>Weekly By team</h1>

{#if $prs.status === 'loading'}
	Loading...
{:else if $prs.status === 'error'}
	<span>Error: {$prs.error.message}</span>
{:else}
	<Histogram dataset={$prs.data}/>	
{/if}
