import DS from 'ember-data';

export default DS.Model.extend({
  feed: DS.belongsTo('feed', { async: true }),
  success: DS.attr('boolean'),
  sha1: DS.attr('string'),
  import_log: DS.attr('string'),
  exception_log: DS.attr('string'),
  validation_report: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  feed_schedule_imports: DS.attr()
});
