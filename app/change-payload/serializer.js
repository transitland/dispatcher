import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  attrs: {
    created_at: {serialize: false},
    updated_at: {serialize: false},
    changeset: {serialize: false}
  }
});
