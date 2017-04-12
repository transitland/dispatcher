import Ember from 'ember';
const { run, get } = Ember;

import { select } from 'd3-selection';
import { extent } from 'd3-array';
import { line } from 'd3-shape';
import { scaleTime, scaleLinear } from 'd3-scale';
import { isoParse } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';

// https://github.com/brzpegasus/ember-d3/blob/master/tests/dummy/app/components/simple-circles.js
export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['service-schedule-chart-svg'],
  width: 720,
  height: 100,
  data: [],
  didReceiveAttrs() {
    // Render
    run.scheduleOnce('render', this, this.drawChart);
  },
  drawChart() {
    // Setup
    let margin = {top: 20, right: 20, bottom: 20, left: 50};
    let svg = select(this.element);
    let width = get(this, 'width');
    let height = get(this, 'height');
    let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Convert
    let d = get(this, 'data');
    var data = Object.keys(d).map(function(k) {return {
      date: isoParse(k),
      value: +d[k] / 3600.0
    }});

    // Axes
    var x = scaleTime().rangeRound([0, width]);
    var y = scaleLinear().rangeRound([height, 0]);

    // Line
    var l = line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

    x.domain(extent(data, function(d) { return d.date; }));
    y.domain(extent(data, function(d) { return d.value; }));

    g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(axisBottom(x))
        // .select(".domain") // remove line?
        //   .remove();

    g.append("g")
        .call(axisLeft(y))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Service (hours)");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", l);

  }
});
