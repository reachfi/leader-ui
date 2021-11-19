<script>
	import Skeleton from '$lib/Skeleton.svelte';
	export let status;
	let clazz;
	export { clazz as class };
</script>

<div class={clazz}>
	{#if status === 'loading'}
		<Skeleton />
	{:else if status === 'error'}
		<span>Oops</span>
	{:else}
		<slot />
	{/if}
</div>
