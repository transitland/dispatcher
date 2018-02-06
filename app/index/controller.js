import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['feed', 'changeset'],
  feed: null,
  changeset: null
});
