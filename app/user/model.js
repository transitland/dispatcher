import DS from 'ember-data';

export default DS.Model.extend({
  changesets: DS.hasMany('changeset'),

  email: DS.attr('string'),
  name: DS.attr('string'),
  affiliation: DS.attr('string'),
  user_type: DS.attr('string')
});
