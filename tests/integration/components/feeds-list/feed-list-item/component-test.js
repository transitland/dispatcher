import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feeds-list/feed-list-item', 'Integration | Component | feeds list/feed list item', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{feeds-list/feed-list-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#feeds-list/feed-list-item}}
      template block text
    {{/feeds-list/feed-list-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
