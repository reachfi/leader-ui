<script>
	import { arc } from 'd3-shape';
	import { scaleLinear } from 'd3-scale';
	import { format } from 'd3-format';
	export let showValue = false;
	export let height = 324;
	export let value = 90,
		min = 0,
		max = 100,
		label,
		units;
	let w = 100;

	$: width = w;

	$: dimensions = {
		width,
		height,
		margin: {
			top: 10,
			right: 10,
			bottom: 10,
			left: 50
		}
	};
	$: dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
	$: dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

	const getCoordsOnArc = (angle, offset = 10) => [Math.cos(angle - Math.PI / 2) * offset, Math.sin(angle - Math.PI / 2) * offset];
	const backgroundArc = arc()
		.innerRadius(0.65)
		.outerRadius(1)
		.startAngle(-Math.PI / 2)
		.endAngle(Math.PI / 2)
		.cornerRadius(1)();
	const percentScale = scaleLinear().domain([min, max]).range([0, 1]);
	const percent = percentScale(value);
	const angleScale = scaleLinear()
		.domain([0, 1])
		.range([-Math.PI / 2, Math.PI / 2])
		.clamp(true);
	const angle = angleScale(percent);
	const filledArc = arc()
		.innerRadius(0.65)
		.outerRadius(1)
		.startAngle(-Math.PI / 2)
		.endAngle(angle)
		.cornerRadius(1)();
	// const colors = value > 50 ? ['#fb8072', '#ffffb3', '#dbdbe7', '#ccebc5'x, '#8dd3c7'] : ['#fb8072', '#ffffb3', '#dbdbe7', '#ccebc5', '#8dd3c7']
	const colorScale = scaleLinear().domain([0, 0.25, 0.5, 0.75, 1]).range(['#fb8072', '#ffffb3', '#dbdbe7', '#ccebc5', '#8dd3c7']);
	const gradientSteps = colorScale.ticks(10).map((value) => colorScale(value));
	const markerLocation = getCoordsOnArc(angle, 1 - (1 - 0.65) / 2);
</script>

<div class="wrapper" bind:clientWidth={w}>
	<svg viewBox={[-1, -1, 2, 1].join(' ')} height={dimensions.boundedHeight} width={dimensions.boundedWidth}>
		<defs>
			<linearGradient id="Gauge__gradient" gradientUnits="userSpaceOnUse" x1="-1" x2="1" y2="0">
				{#each gradientSteps as color, index}
					<stop stop-color={color} offset={index / (gradientSteps.length - 1)} />
				{/each}
			</linearGradient>
		</defs>
		<path d={backgroundArc} fill="#dbdbe7" />
		<path d={filledArc} fill="url(#Gauge__gradient)" />
		<line y1="-1" y2="-0.65" stroke="white" stroke-width="0.027" />
		<circle cx={markerLocation[0]} cy={markerLocation[1]} r="0.2" stroke="#2c3e50" stroke-width="0.01" fill={colorScale(percent)} />
		<path
			d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
			transform="rotate({angle * (180 / Math.PI)}) translate(-0.2, -0.33)"
			fill="#6a6a85"
		/>
	</svg>
	{#if !!showValue}
		<div class="value">
			{format(',')(value)}
		</div>
	{/if}
	{#if !!label}
		<div class="label">
			{label}
		</div>
	{/if}
	{#if !!units}
		<div class="units">
			{units}
		</div>
	{/if}
</div>

<style>
	svg {
		overflow: visible;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		/* padding-top: 1rem; */
	}
	.value {
		margin-top: 0.4em;
		font-size: 3em;
		line-height: 1em;
		font-weight: 900;
		font-feature-settings: 'zero', 'tnum';
	}
	.units {
		color: rgb(139, 139, 167);
		line-height: 1.3em;
		font-weight: 300;
	}
	.label {
		color: rgb(139, 139, 167);
		margin-top: 2em;
		font-size: 0.7em;
		line-height: 1.3em;
		font-weight: 700;
	}
</style>
