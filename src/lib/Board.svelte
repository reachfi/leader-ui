<script>
	import { getLastAudit } from './api';
	import { useQuery, useQueryClient } from '@sveltestack/svelte-query';
	let organization = 'lucidhq';
	let repo = 'rx-ui';
	const queryClient = useQueryClient();
	const prs = useQuery('prs', () => getLastAudit(organization, repo));
</script>

<h1>Board</h1>

{#if !organization || !repo || $prs.status === 'loading'}
	<span>Loading...</span>
{:else if $prs.status === 'error'}
	<span>Error: {$prs.error.message}</span>
{:else}
	<h1>{$prs.data}</h1>
{/if}
