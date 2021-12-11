import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const AXIS_COLOR = 'rgb(255, 91, 73)';
const BAR_COLOR_1 = '#43b4c2';
const BAR_COLOR_2 = '#fff';

const D3Visualization = ({ data, displayOptions }) => {
  const svgRef = useRef(null);
  const { showCumulativeTotal, showWeeklyTotal } = displayOptions;

  const margin = { top: 30, right: 30, bottom: 30, left: 80 };
  const svgWidth = 480;
  const svgHeight = 380;

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  useEffect(() => {
    // clear previous data / refresh for state updates
    d3.select(svgRef.current).selectAll('*').remove();

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
          return Math.max(
            showCumulativeTotal ? d.cumulativeTotal : d.weeklyTotal,
            1000 // min y-top
          );
        }),
      ])
      .range([height, 0]);

    const yAxis = svg.append('g').call(d3.axisLeft(y));

    yAxis.selectAll('line').style('stroke', AXIS_COLOR);
    yAxis.selectAll('path').style('stroke', AXIS_COLOR);
    yAxis.selectAll('text').style('stroke', AXIS_COLOR);

    // Add Bars
    if (showCumulativeTotal) {
      svg
        .selectAll('bar')
        .data(data)
        .join('rect')
        .attr('x', (d) => x(d.show_week))
        .attr('y', (d) => y(d.cumulativeTotal), 0)
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.cumulativeTotal), 0)
        .attr('fill', BAR_COLOR_1);
    }

    if (showWeeklyTotal) {
      svg
        .selectAll('bar')
        .data(data)
        .join('rect')
        .attr('x', (d) => x(d.show_week))
        .attr('y', (d) => y(d.weeklyTotal))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.weeklyTotal))
        .attr('fill', BAR_COLOR_2);
    }
  }, [data, showCumulativeTotal, showWeeklyTotal]);

  return (
    <div className='d3-visualization'>
      <svg ref={svgRef} width={svgWidth} height={svgHeight} />
    </div>
  );
};

export default D3Visualization;
