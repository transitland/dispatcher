import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('changeset-apply-modal', 'Integration | Component | changeset apply modal', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{changeset-apply-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#changeset-apply-modal}}
      template block text
    {{/changeset-apply-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
