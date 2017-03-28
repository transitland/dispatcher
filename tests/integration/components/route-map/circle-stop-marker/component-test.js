import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('route-map/circle-stop-marker', 'Integration | Component | route map/circle stop marker', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{route-map/circle-stop-marker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#route-map/circle-stop-marker}}
      template block text
    {{/route-map/circle-stop-marker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
