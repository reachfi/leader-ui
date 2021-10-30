<script>
	import Board from '$lib/Board.svelte';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<Board />
</QueryClientProvider>
