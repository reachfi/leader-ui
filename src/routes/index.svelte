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

<div class="mt-16">
	<div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:w-full">
		<!-- <h2 class="text-lg leading-6 font-medium text-gray-900">Overview</h2> -->
		<QueryClientProvider client={queryClient}>
			<Board />
		</QueryClientProvider>
	</div>
</div>
