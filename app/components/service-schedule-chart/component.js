import Ember from 'ember';
const { run, get } = Ember;

import { select } from 'd3-selection';
import { min, max } from 'd3-array';
import { line } from 'd3-shape';
import { scaleTime, scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { isoParse } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';

function parseModel(model) {
  let data = model.get('json');
  if (!data) { return { id: 'test', values: [] } }
  data = data.scheduled_service;
  return {
    id: model.get('feed_version').get('id'),
    values: Object.keys(data).map(function(k) {
      return { date: isoParse(k), value: (+data[k] / 3600.0) }
    })
  }
}

// https://github.com/brzpegasus/ember-d3/blob/master/tests/dummy/app/components/simple-circles.js
// https://bl.ocks.org/mbostock/3884955
export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['service-schedule-chart-svg'],
  width: 720,
  height: 100,
  model: null,
  models: [],
  didReceiveAttrs() {
    // Render
    run.scheduleOnce('render', this, this.drawChart);
  },
  parseModels() {
    let models = (get(this, 'models') || []).filterBy('type', 'FeedVersionInfoStatistics').map(function(i){return parseModel(i)});
    let model = get(this, 'model');
    if (model) {
      models.push(parseModel(model));
    }
    return models;
  },
  drawChart() {
    // Setup
    let margin = {top: 20, right: 50, bottom: 20, left: 50};
    let svg = select(this.element);
    let width = $(this.element).width() - margin.left - margin.right;
    let height = $(this.element).height() - margin.top - margin.bottom;
    let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Convert
    let series = this.parseModels();

    // Axes
    var x = scaleTime().rangeRound([0, width]);
    var y = scaleLinear().rangeRound([height, 0]);
    var z = scaleOrdinal(schemeCategory10);
    var l = line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

    // Domain
    x.domain([
      min(series, function(s) { return min(s.values, function(d) { return d.date; })}),
      max(series, function(s) { return max(s.values, function(d) { return d.date; })})
    ]);
    y.domain([
      0,
      max(series, function(s) { return max(s.values, function(d) {return d.value; })})
    ]);
    z.domain(series.map(function(s) { return s.id }));

    // Draw axes
    g.append("g")
          .attr("class", "axis-x")
          .attr("transform", "translate(0," + height + ")")
          .call(axisBottom(x))

    g.append("g")
        .attr("class", "axis-y")
        .call(axisLeft(y))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Service (hours)");

    // Draw series
    var seriesLine = g.selectAll(".series")
      .data(series)
      .enter().append("g")
        .attr("class", "series");

    seriesLine.append("path") // path
      .attr("class", "line")
      .attr("d", function(d) { return l(d.values); })
      .style("stroke", function(d) { return z(d.id); })
      .style("stroke-width", 1.5)
      .style("fill","none");

    seriesLine.append("text") // path label
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });

  }
});
