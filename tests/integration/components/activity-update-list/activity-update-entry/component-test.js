import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activity-update-list/activity-update-entry', 'Integration | Component | activity update list/activity update entry', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{activity-update-list/activity-update-entry}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#activity-update-list/activity-update-entry}}
      template block text
    {{/activity-update-list/activity-update-entry}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
