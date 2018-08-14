import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['payload', 'notes'],
  payload: null,
  notes: null
});
