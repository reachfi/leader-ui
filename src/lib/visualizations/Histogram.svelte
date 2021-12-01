<script>
	//TODO: import only what is needed from d3
	import * as d3 from 'd3';

	export let dataset;
	export let title;
	export let subtitle;
	let w = 300;
	let innerWidth;

	const yAccessor = (d) => d.prs_count;
	const dateParser = d3.utcParse('%Y-%m-%dT%H:%M:%S%Z');
	const simpleDateParser = (date) => date.toISOString().slice(2, 10);
	const xAccessor = (d) => dateParser(d.week);

	const calculateHeight = (innerWidth, width) => {
		switch (true) {
			case innerWidth < 640:
				return width * 1.2;
			case innerWidth < 900:
				return width * 0.55;
			default:
				return width * 0.4;
		}
	};

	// Create chart dimensions

	$: width = w - 100;
	$: smallDevice = innerWidth < 640;
	$: dimensions = {
		width,
		height: calculateHeight(innerWidth, width),
		margin: {
			top: 30,
			right: 10,
			bottom: 100,
			left: 50
		}
	};
	$: dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
	$: dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

	// Adapt data

	$: seriesInput = dataset.map((week) => {
		let output = {
			week: xAccessor(week),
			feat: 0,
			fix: 0,
			chore: 0,
			unknown: 0
		};
		week.pr_types.forEach((pr) => (output[pr.pr_type] = pr.count));
		return output;
	});

	const keys = ['feat', 'fix', 'chore', 'unknown'];
	const mean = d3.mean(dataset, yAccessor); // TODO: return from gql?

	// Create scales

	$: xScale = d3.scaleBand().domain(d3.map(dataset, xAccessor)).range([0, dimensions.boundedWidth]).padding(0.2);

	$: yScale = d3
		.scaleLinear()
		.domain([0, d3.max(dataset, yAccessor)])
		.range([dimensions.boundedHeight, 0]);

	$: colorScale = d3.scaleOrdinal().domain(keys).range(d3.schemeSet3);
	$: stackGen = d3.stack().keys(keys);
	$: series = stackGen(seriesInput);
	$: xTicks = seriesInput.map((d) => d.week);
	$: yTicks = yScale.ticks(5);

	$: barsWidth = smallDevice ? 15 : 40;
</script>

<!-- Card -->
<svelte:window bind:innerWidth />
<div bind:clientWidth={w}>
	<div class="p-5">
		<div class="flex">
			<div class="ml-5 w-0 flex-1">
				{#if title}<div class="label text-center 2xl:text-base text-sm text-gray-500">{title}</div>{/if}
				{#if subtitle}<h4>{subtitle}</h4>{/if}
				{#if dataset.length > 1}
					<svg width={dimensions.width} height={dimensions.height}>
						<g transform="translate({dimensions.margin.left},{dimensions.margin.top})">
							<!-- bars -->
							{#each series as serie, i}
								{#each serie as d, i}
									<g>
										<rect
											x={xScale(d.data.week)}
											y={yScale(d[1])}
											width={barsWidth}
											height={yScale(d[0]) - yScale(d[1])}
											fill={colorScale(serie.key)}
										/>
									</g>
								{/each}
							{/each}

							<!-- x axis -->
							<g class="axis x-axis" transform="translate(0, {dimensions.boundedHeight})">
								<line x2={dimensions.boundedWidth} stroke="black" />
								{#each xTicks as tick, i}
									<g class="tick" transform="translate({xScale(tick)},0)" class:hidden={smallDevice}>
										<text
											style="font-size:10px;text-anchor:middle;"
											class="text-gray-900"
											fill="currentColor"
											y={xScale(tick) + 15}
											dy="0.71em"
											x="-{dimensions.margin.left - 10}"
											transform="rotate(45 -10)">{simpleDateParser(tick)}</text
										>
									</g>
								{/each}
							</g>

							<!-- y axis -->
							<g class="axis y-axis">
								<line y2={dimensions.boundedHeight} stroke="black" />
								{#each yTicks as tick, i}
									<g transform="translate(-6, {yScale(tick)})">
										<line stroke="currentColor" x2="6" />
										<text style="text-anchor:end;font-size:10px" class="text-gray-900" fill="currentColor" x="-5" dy="0.32em">{tick}</text>
									</g>
								{/each}
								<text x={-dimensions.boundedHeight / 2} y={-dimensions.margin.left + 15} class="axis yaxis text-xs text-gray-900">Pull Requests</text>
							</g>
							<!-- mean level  -->
							<g>
								<line x1="0" x2={dimensions.boundedWidth} y1={yScale(mean)} y2={yScale(mean)} stroke="maroon" stroke-dasharray="2px 4px" />
								<text
									x={dimensions.boundedWidth - 20}
									y={yScale(mean) - 10}
									fill="marron"
									font-size="12px"
									text-anchor="middle"
									class:hidden={smallDevice}>Mean</text
								>
							</g>
						</g>
					</svg>
				{:else}
					<span>No results found</span>
				{/if}
			</div>
		</div>
	</div>
	<!-- <div class="bg-gray-50 px-5 py-3">
		<div class="text-sm">
			<a href="#" class="font-medium text-cyan-700 hover:text-cyan-900"> View all </a>
		</div>
	</div> -->
</div>

<style>
	.tick {
		transform: rotate(-90deg);
	}
	.axis {
		/* font-size: 1.2rem; */
		text-anchor: middle;
	}
	.yaxis {
		transform: rotate(-90deg);
	}
</style>
