import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  change_payloads: DS.hasMany('change-payload', { async: true }),
  user: DS.belongsTo('user', { async: true }),
  imported_from_feed: DS.belongsTo('feed', { async: true, inverse: 'changesets_imported_from_this_feed' }),
  imported_from_feed_version: DS.belongsTo('feed-version', { async: true, inverse: 'changesets_imported_from_this_feed_version' }),
  feeds_created_or_updated: DS.hasMany('feeds', { async: true, inverse: 'created_or_updated_in_changeset' }),
  // feeds_destroyed: DS.hasMany('feeds', { async: true, inverse: 'destroyed_in_changeset' }),
  // stops_created_or_updated: DS.hasMany('stops', { async: true, inverse: '' }),
  // stops_destroyed: DS.hasMany('', { async: true, inverse: '' }),
  // operators_created_or_updated: DS.hasMany('operators', { async: true, inverse: '' }),
  // operators_destroyed: DS.hasMany('operators', { async: true, inverse: '' }),
  // routes_created_or_updated: DS.hasMany('routes', { async: true, inverse: '' }),
  // routes_destroyed: DS.hasMany('routes', { async: true, inverse: '' }),

  notes: DS.attr('string'),
  applied: DS.attr('boolean'),
  applied_at: DS.attr('date'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  apply: function() {
    var applicationAdapter = this.store.adapterFor('changeset');
    var modelUrl = applicationAdapter.buildURL('changeset', this.id);
    var applyUrl = modelUrl + '/apply';
    return applicationAdapter.ajax(applyUrl, 'post');
  }
});
