import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feeds-table/feed-row', 'Integration | Component | feeds table/feed row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{feeds-table/feed-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#feeds-table/feed-row}}
      template block text
    {{/feeds-table/feed-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
