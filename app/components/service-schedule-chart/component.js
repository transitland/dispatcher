import Ember from 'ember';

// https://github.com/brzpegasus/ember-d3/blob/master/tests/dummy/app/components/simple-circles.js
export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['awesome-d3-widget'],
  width: 720,
  height: 400,
  data: [],
  drawChart() {
    let plot = select(this.element);
    let data = get(this, 'data');
    let width = get(this, 'width');
    let height = get(this, 'height');
  }
});
