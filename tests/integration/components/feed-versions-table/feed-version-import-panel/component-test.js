import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feed-versions-table/feed-version-import-panel', 'Integration | Component | feed versions table/feed version import panel', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{feed-versions-table/feed-version-import-panel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#feed-versions-table/feed-version-import-panel}}
      template block text
    {{/feed-versions-table/feed-version-import-panel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
