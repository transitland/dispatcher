import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  feed: DS.belongsTo('feed', { async: true }),
  feed_version: DS.belongsTo('feed-version', { async: true }),
  success: DS.attr('boolean', { allowNull: true }),
  import_log: DS.attr('string'),
  import_level: DS.attr('number'),
  exception_log: DS.attr('string'),
  validation_report: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  feed_schedule_imports: DS.attr(),

  importStatusCssClass: computed('success', function() {
    switch(this.get('success')) {
      case true:
        return 'success';
      case false:
        return 'danger';
      case null:
        return 'active';
    }
  })
});
