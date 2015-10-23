import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feed-fetcher-controls', 'Integration | Component | feed fetcher controls', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{feed-fetcher-controls}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#feed-fetcher-controls}}
      template block text
    {{/feed-fetcher-controls}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
