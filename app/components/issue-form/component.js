import Ember from 'ember';

export default Ember.Component.extend({
  issueTypesMap: {
    stop: [
      "stop_rsp_distance_gap",
      "distance_calculation_inaccurate",
      "stop_position_inaccurate",
      "stop_name",
      "uncategorized"
    ],
    route: [
      "route_color",
      "route_name",
      "uncategorized"
    ],
    route_stop_pattern: [
      "stop_rsp_distance_gap",
      "rsp_line_inaccurate",
      "distance_calculation_inaccurate",
      "uncategorized"
    ]
  },
  acceptedAttributes: {
    "stop_rsp_distance_gap": ["geometry"],
    "distance_calculation_inaccurate": ["stop_distances", "geometry"],
    "stop_position_inaccurate": ["geometry"],
    "stop_name": ["name"],
    "route_color": ["color"],
    "route_name": ["name"],
    "rsp_line_inaccurate": ["geometry"],
    "uncategorized": []
  },
  selectedEntities: [],
  selectedIssueType: [],
  selectedAttribute: '',
  details: '',
  createdIssue: {},
  getEntity: function(onestop_id) {
    var component = onestop_id.split("-")[0];
    if (component === "r") {
      if (onestop_id.split("-").length === 3) {
        return "route";
      }
      else if (onestop_id.split("-").length === 5) {
        return "route_stop_pattern";
      }
    }
    else if (component === "s") {
      return "stop";
    }
  },
  computeIssueTypes: function(){
    var issueTypes = new Set();
    this.get('issueTypesMap')[this.getEntity(this.get('selectedEntities')[0])].forEach(function(e){
      issueTypes.add(e);
    });
    var self = this;
    this.get('selectedEntities').slice(1).forEach(function(e){
        var newTypes = self.get('issueTypesMap')[self.getEntity(e)].filter(function(type) {
            return issueTypes.has(type);
        });
        // don't think initialize with array works with IE
        issueTypes = new Set();
        newTypes.forEach(function(t){
          issueTypes.add(t);
        });
    });
    return Array.from(issueTypes);
  },
  computeAvailableAttributes: function() {
    return this.get("acceptedAttributes")[this.get("selectedIssueType")];
  },
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
    handleEntityFocus(select) {
      select.actions.open();
    },
    handleEntityChanged(select) {
      this.set('selectedEntities', select);
      this.set('issueTypes', this.computeIssueTypes());
    },
    handleType(select) {
      this.set('selectedIssueType', select.highlighted);
      this.set('attributes', this.computeAvailableAttributes());
    },
    handleAttribute(select) {
      this.set('selectedAttribute', select.highlighted);
    },
    inputChanged(input) {
      this.set('details', input);
    },
    saveIssue() {
      this.sendAction('saveIssue', this.get('createdIssue'));
      this.set('showIssue', false);
    },
    hideIssue() {
      this.set('showIssue', false);
    },
    createIssue() {
      var self = this;
      this.set('createdIssue', {
        details: self.get('details'),
        issue_type: self.get('selectedIssueType'),
        open: true,
        entities_with_issues: self.get('selectedEntities').map(function(e){
          return {onestop_id: e, attribute: self.get('selectedAttribute')};
        })
      });
      this.set('showIssue', true);
    }
  }
});
