import Ember from 'ember';
const { run, get } = Ember;

import { select } from 'd3-selection';
import { min, max } from 'd3-array';
import { line } from 'd3-shape';
import { scaleTime, scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { isoParse } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';

function parseModel(model) {
  let fvi = model.get('feed_version_infos').filterBy('type','FeedVersionInfoStatistics');
  if (!fvi || fvi.length < 1) { return { id: 'test', values: [] } }
  let data = fvi.get('firstObject.json').scheduled_service;
  return {
    id: model.get('id'),
    short_sha1: model.get('short_sha1'),
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
    let models = (get(this, 'models') || []).map(function(i){return parseModel(i)});
    let model = get(this, 'model');
    if (model) {
      models.push(parseModel(model));
    }
    let idx = 0;
    models.forEach(function(i) {
      i.idx = idx;
      idx += 1;
    });
    return models;
  },
  drawChart() {
    // Setup
    let margin = {top: 20, right: 100, bottom: 20, left: 50};
    let svg = select(this.element);
    svg.selectAll("*").remove(); // clear
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

    // Highlights
    function mouseover(d, i) {
      select('.line#line-'+d.id).style('stroke-width', 5);
      select('.text#text-'+d.id).style('text-decoration', 'underline');
    }
    function mouseout(d, i) {
      select('.line#line-'+d.id).style('stroke-width', 1.5);
      select('.text#text-'+d.id).style('text-decoration', 'none');
    }

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
      .attr("id", function(d) { return "line-"+d.id})
      .attr("d", function(d) { return l(d.values); })
      .style("stroke", function(d) { return z(d.id); })
      .style("stroke-width", 1.5)
      .style("fill","none")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

    seriesLine.append("text") // path label
      .attr("class", "text")
      .attr("id", function(d) { return "text-"+d.id})
      .attr("x", width + 15)
      .attr("y", height)
      .attr("dy", function(d) { return ((-1.25 * d.idx) - 1.0) + "em"; })
      .attr("fill", function(d) { return z(d.id); })
      .style("font", "12px sans-serif")
      .text(function(d) { return d.short_sha1; })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);
  }
});
