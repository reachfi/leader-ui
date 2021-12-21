<script>
	import * as d3 from 'd3';

	// export let value = 0;
	// export let direction = 1;
	export let label;
	export let trend;
	export let height = 324;
	const triangleSize = 150;
	const data = trend.dataset;

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
			right: 50,
			bottom: 0,
			left: 50
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

	const color = 'green';
	// const verticalTransform = midHeight + Math.sqrt(triangleSize);
	const triangle = d3.symbol().type(d3.symbolTriangle).size(triangleSize);
</script>

<!-- <p>{value}% {direction ? '⬆️' : '⬇️'}</p> -->
<!-- <p>{msg}</p> -->
<div class="" bind:clientWidth={w}>
	<svg class="" width={dimensions.width} height={dimensions.height}>
		<g transform="translate({dimensions.margin.left},{dimensions.margin.top})" opacity="35%">
			<path d={lastThreeWeeksArea} fill="#cbd2d7" />
		</g>
		<g transform={`translate(${dimensions.boundedWidth / 2 - 20} , 25)`}>
			<path d={triangle()} stroke={color} fill={color} />
			<text fill="black" x="25" y="5">{label}</text>
		</g>
	</svg>
</div>
