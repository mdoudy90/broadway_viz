import React from 'react';
import * as d3 from 'd3';

const D3BarChart = ({ data, dimensions }) => {
  console.log(data);
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions;

  // set the dimensions and margins of the graph
  // const margin = { top: 10, right: 30, bottom: 30, left: 40 },
  const newWidth = width - margin.left - margin.right,
    newHeight = height - margin.top - margin.bottom;

  React.useEffect(() => {
    // append the svg object to the body of the page
    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', newWidth + margin.left + margin.right)
      .attr('height', newHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse the Data
    // d3.csv(
    //   'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv',
    //   function (data) {
    //     console.log(data);
    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.show_week;
        })
      )
      .padding(0.2);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.weeklyTotal;
        }),
      ])
      .range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return x(d.show_week);
      })
      .attr('y', function (d) {
        return y(d.weeklyTotal);
      })
      .attr('width', x.bandwidth())
      .attr('height', function (d) {
        return height - y(d.weeklyTotal);
      })
      .attr('fill', '#69b3a2');
  }, [data]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default D3BarChart;
