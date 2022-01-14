<script>
	import * as d3 from 'd3';

	// export let value = 0;
	export let label;
	export let trend;
	export let height = 324;
	const triangleSize = 150;
	const data = trend.dataset;
	const direction = trend.trend.direction;

	const yAccessor = (d) => d.prs_count;
	const dateParser = d3.utcParse('%Y-%m-%dT%H:%M:%S%Z');
	const xAccessor = (d) => dateParser(d.week);

	let w = 100;

	$: width = w;

	$: dimensions = {
		width,
		height,
		margin: {
			top: 5,
			right: w * 0.1,
			bottom: 5,
			left: w * 0.1
		}
	};
	$: dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
	$: dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

	$: yScale = d3
		.scaleLinear()
		.domain([0, d3.max(data, yAccessor)])
		.range([dimensions.boundedHeight, 0]);

	$: xScale = d3.scaleTime().domain(d3.extent(data, xAccessor)).range([0, dimensions.boundedWidth]);

	$: areaGenerator = d3
		.area()
		.x((d) => xScale(xAccessor(d)))
		.y0(dimensions.boundedHeight)
		.y1((d) => yScale(yAccessor(d)))
		.curve(d3.curveBasis);

	$: lastThreeWeeksArea = areaGenerator(data);
	$: triangleRotation = direction ? 0 : 180;
	$: triangleColor = direction ? 'green' : 'red';

	const triangle = d3.symbol().type(d3.symbolTriangle).size(triangleSize);
</script>

<div class="flex flex-col items-center text-center  gap-4" bind:clientWidth={w}>
	<div class="2xl:text-base text-sm text-gray-500">Last week vs 3 wks</div>
	<svg width={dimensions.boundedWidth} height={dimensions.boundedHeight}>
		<g transform={`translate(${dimensions.boundedWidth / 2} , 10)`}>
			<path d={triangle()} stroke={triangleColor} fill={triangleColor} transform="rotate({triangleRotation}), translate(15, 5)" />
			<text fill="black" x="0" y="5" class="flex-grow-0 2xl:text-base text-sm text-gray-500">{trend.trend.percentage}% </text>
		</g>
		<g transform="translate(0, 10), scale(1,0.8)" opacity="35%">
			<path d={lastThreeWeeksArea} fill="#cbd2d7" />
		</g>
	</svg>
</div>
