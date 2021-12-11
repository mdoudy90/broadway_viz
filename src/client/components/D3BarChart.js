import React from 'react';
import * as d3 from 'd3';

const AXIS_COLOR = 'rgb(255, 91, 73)';
const BAR_COLOR = '#49EDFFC0';

const D3BarChart = ({ data, dimensions }) => {
  const svgRef = React.useRef(null);
  const { svgWidth, svgHeight, margin } = dimensions;

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  React.useEffect(() => {
    // append the svg object to the body of the page
    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.show_week))
      .padding(0.25);

    const xAxis = svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    xAxis.selectAll('line').style('stroke', AXIS_COLOR);
    xAxis.selectAll('path').style('stroke', AXIS_COLOR);
    xAxis.selectAll('text').style('stroke', AXIS_COLOR);

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.cumulativeTotal;
        }),
      ])
      .range([height, 0]);

    const yAxis = svg.append('g').call(d3.axisLeft(y));

    yAxis.selectAll('line').style('stroke', AXIS_COLOR);
    yAxis.selectAll('path').style('stroke', AXIS_COLOR);
    yAxis.selectAll('text').style('stroke', AXIS_COLOR);

    // Bars
    svg
      .selectAll('bar')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.show_week))
      .attr('y', (d) => y(d.cumulativeTotal))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.cumulativeTotal))
      .attr('fill', BAR_COLOR);
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    />
  );
};

export default D3BarChart;
