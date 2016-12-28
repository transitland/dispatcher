import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('route-map/display-stop', 'Integration | Component | edit map/display stop', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{route-map/display-stop}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#route-map/display-stop}}
      template block text
    {{/route-map/display-stop}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
