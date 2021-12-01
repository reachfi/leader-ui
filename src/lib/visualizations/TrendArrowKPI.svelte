<script>
	export let value = 0;
	export let direction = 1;
	export let msg;
</script>

<p>{value}% {direction ? '⬆️' : '⬇️'}</p>
<p>{msg}</p>
