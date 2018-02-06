import Controller from '@ember/controller';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';

export default Controller.extend(PaginatedSortableController, {
  active_feed_version_update: false,
  active_feed_version_expired: null,
  active_feed_version_valid: null,
  active_feed_version_import_level: null,
  latest_fetch_exception: null,
  latest_feed_version_import_status: '',  
  tag_key: null,
  tag_value: null
});
