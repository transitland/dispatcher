import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-map/route-stop-pattern', 'Integration | Component | edit map/route stop pattern', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-map/route-stop-pattern}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#edit-map/route-stop-pattern}}
      template block text
    {{/edit-map/route-stop-pattern}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
