import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('change-payload-viewer-editor', 'Integration | Component | change payload viewer editor', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{change-payload-viewer-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#change-payload-viewer-editor}}
      template block text
    {{/change-payload-viewer-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
