import DS from 'ember-data';

export default DS.Model.extend({
  activity_updates: DS.hasMany('activity-update', { async: true })
});
