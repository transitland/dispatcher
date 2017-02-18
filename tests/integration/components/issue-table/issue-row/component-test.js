import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('issue-table/issue-row', 'Integration | Component | issue table/issue row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{issue-table/issue-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#issue-table/issue-row}}
      template block text
    {{/issue-table/issue-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
