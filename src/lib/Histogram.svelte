<script>
//TODO: import only what is needed from d3
import * as d3 from "d3";

export let dataset;

const yAccessor = d => d.prs_count
const dateParser = d3.utcParse("%Y-%m-%dT%H:%M:%S%Z")
const xAccessor = d => dateParser(d.week)

// 2. Create chart dimensions

const width = 600
let dimensions = {
  width: width,
  height: width * 0.6,
  margin: {
    top: 30,
    right: 10,
    bottom: 50,
    left: 50,
  },
}
dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom


// 4. Create scales

const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, yAccessor)])
    .range([dimensions.boundedHeight, 0])

const xScale = d3.scaleBand()
  .domain(d3.map(dataset, xAccessor))
  .range([0, dimensions.boundedWidth])
  .padding(0.2);


// const mean = d3.mean(dataset, metricAccessor)
// const meanLine = bounds.append("line")
//     .attr("x1", xScale(mean))
//     .attr("x2", xScale(mean))
//     .attr("y1", -15)
//     .attr("y2", dimensions.boundedHeight)
//     .attr("stroke", "maroon")
//     .attr("stroke-dasharray", "2px 4px")

// const meanLabel = bounds.append("text")
//     .attr("x", xScale(mean))
//     .attr("y", -20)
//     .text("mean")
//     .attr("fill", "maroon")
//     .style("font-size", "12px")
//     .style("text-anchor", "middle")


const xAxisGenerator = d3.axisBottom()
  .scale(xScale)

// const xAxis = bounds.append("g")
//   .call(xAxisGenerator)
//     .style("transform", `translateY(${dimensions.boundedHeight}px)`)

// const xAxisLabel = xAxis.append("text")
//     .attr("x", dimensions.boundedWidth / 2)
//     .attr("y", dimensions.margin.bottom - 10)
//     .attr("fill", "black")
//     .style("font-size", "1.4em")
//     .text("Humidity")
//     .style("text-transform", "capitalize")

</script>

{#if dataset.length > 1}
  <div class="wrapper" >    
    <svg width={dimensions.width} height={dimensions.height}>
      <g transform="translate({dimensions.margin.left},{dimensions.margin.top})">
        {#each dataset as d, i}
          <g>                  
            <rect
              x={xScale(xAccessor(d))}
              y={yScale(yAccessor(d))}
              width={xScale.bandwidth()}
              height={dimensions.boundedHeight - yScale(yAccessor(d))}
              fill="cornflowerblue"
            ></rect>
            <text
              x={xScale(xAccessor(d)) + 25}
              y={yScale(yAccessor(d)) - 10}                         
              style="text-anchor: middle; font-size: 12px; font-family: sans-serif;" 
              fill="darkgrey"
            >
              {yAccessor(d)}
          </text>           
          </g>
        {/each}        
      </g>
    </svg>
  </div>
{:else}
  <span>data is not here</span>
{/if}

