<script>
	import { arc } from 'd3-shape';
	import { scaleLinear } from 'd3-scale';
	import { format } from 'd3-format';
	export let showChart = true;
	export let showLegend = false;
	export let showValue = false;
	export let height = 324;
	export let value = 0,
		min = 0,
		max = 100,
		label,
		units;
	let w = 100;
	$: displayValue = format('.2')(value);
	$: width = w;

	$: dimensions = {
		width,
		height,
		margin: {
			top: 5,
			right: 0,
			bottom: 5,
			left: 0
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
		.cornerRadius(0)();
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
		.cornerRadius(0)();
	const colorScale = scaleLinear().domain([0, 0.25, 0.5, 0.75, 1]).range(['#fb8072', '#ffffb3', '#dbdbe7', '#ccebc5', '#8dd3c7']);
	const gradientSteps = colorScale.ticks(5).map((value) => colorScale(value));
	const markerLocation = getCoordsOnArc(angle, 1 - (1 - 0.65) / 2);
</script>

<!-- <div class="float-left">Description to be shown only on larger screen sizes.</div> -->

<div class="flex flex-col items-center gap-4 text-center w-96 sm:w-auto py-10 lg:py-0" bind:clientWidth={w}>
	{#if !!showLegend}
		<div>
			{#if !!label}
				<div class="flex-grow-0 2xl:text-base text-sm text-gray-500">
					{label}
				</div>
			{/if}
			{#if !!showValue}
				<div class="value text-7xl my-3 font-bold text-gray-900">
					{displayValue}
				</div>
			{/if}
			{#if !!units}
				<div class="text-gray-900 2xl:text-base text-xs">
					{units}
				</div>
			{/if}
		</div>
	{/if}
	{#if !!showChart}
		<svg class="flex-grow w-4/5" viewBox={[-1, -1, 2, 1].join(' ')} height={dimensions.boundedHeight} width={dimensions.boundedWidth}>
			<defs>
				<linearGradient id="Gauge__gradient" gradientUnits="userSpaceOnUse" x1="-1" x2="1" y2="0">
					{#each gradientSteps as color, index}
						<stop stop-color={color} offset={index / (gradientSteps.length - 1)} />
					{/each}
				</linearGradient>
			</defs>

			<path d={backgroundArc} fill="#dbdbe7" id="arc" />
			<path d={filledArc} fill="url(#Gauge__gradient)" />

			<text font-size="0.15px" dy="-0.07">
				<textPath href="#arc" style="text-anchor: start" startOffset="0%">{format('.2')(min)}</textPath>
			</text>
			<text font-size="0.15px" dy="-0.07">
				<textPath href="#arc" style="text-anchor: end" startOffset="53.5%">{format('.2')(max)}</textPath>
			</text>
			<!-- <line y1="-1" y2="-0.65" x1="0.6" x2="0.4" stroke="white" stroke-width="0.027" /> -->
			<g>
				<circle cx={markerLocation[0]} cy={markerLocation[1]} r="0.2" stroke="#2c3e50" stroke-width="0.01" fill={colorScale(percent)} />
				<text x={markerLocation[0]} y={markerLocation[1]} dy="0.3em" text-anchor="middle" alignment-baseline="middle" font-size="0.15px"
					>{displayValue}</text
				>
			</g>
			<path
				d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
				transform="rotate({angle * (180 / Math.PI)}) translate(-0.2, -0.33)"
				fill="#6a6a85"
			/>
			<!-- <g transform={`translate(${dimensions.boundedWidth / 2} , 45)`}><text fill="black" x="0" y="5" font-size="small">{units}</text> </g> -->
		</svg>
	{/if}
</div>

<style>
	svg {
		overflow: visible;
	}
	.value {
		font-feature-settings: 'zero', 'tnum';
	}
</style>
