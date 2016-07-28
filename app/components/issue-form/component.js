import Ember from 'ember';

export default Ember.Component.extend({
  issueTypes: [
    "stop_position_inaccurate",
    "stop_rsp_distance_gap",
    "distance_calculation_inaccurate",
    "rsp_line_inaccurate",
    "route_color",
    "stop_name",
    "route_name",
    "uncategorized"
  ],
  entities: Ember.computed(function(){
    var entities = [];
    entities = entities.concat(this.get('model.stops').map(function(e){return e.id}))
    //.concat(this.get('model.routes').map(function(e){return e.id}))
    //.concat(this.get('model.operators').map(function(e){return e.id}))
    //.concat(this.get('model.routes').map(function(e){return e.id}))
    .concat(this.get('model.route_stop_patterns').map(function(e){return e.id}));
    return entities;
  }),
  actions: {
    handleFocus(select) {
      select.actions.open();
    }
  }
});
