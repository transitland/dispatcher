// https://github.com/emberjs/data/issues/3785

import DS from 'ember-data';

export default DS.BooleanTransform.extend({
  deserialize: function(serialized) {
    if (serialized === null) {
      return null;
    }
    return this._super(serialized);
  },

  serialize: function(deserialized) {
    if (deserialized === null) {
      return null;
    }
    return this._super(deserialized);
  }
});
