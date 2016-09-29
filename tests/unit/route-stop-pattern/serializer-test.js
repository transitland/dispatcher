import { moduleForModel, test } from 'ember-qunit';

moduleForModel('route-stop-pattern', 'Unit | Serializer | route stop pattern', {
  // Specify the other units that are required for this test.
  needs: ['serializer:route-stop-pattern']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
