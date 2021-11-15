<script context="module">
	export const prerender = true;
</script>

<script>
	import Board from '$lib/Board.svelte';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	const queryClient = new QueryClient();
</script>


<svelte:head>
	<title>Home</title>
</svelte:head>


<section>	
	<QueryClientProvider client={queryClient}>
		<Board />
	</QueryClientProvider>
</section>


<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>

