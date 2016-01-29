import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  userTypes: [
    "community_builder",
    "data_enthusiast",
    "app_developer",
    "hardware_vendor",
    "consultant",
    "transit_agency_staff",
    "other_public_agency_staff"
  ],
  actions: {
    handleFocus(select) {
      select.actions.open();
    }
  }
});
