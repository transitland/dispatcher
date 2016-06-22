import Ember from 'ember';

export default Ember.Component.extend({
  userMatcher(user, term) {
    return (user.get('name') + ' ' + user.get('email')).indexOf(term);
  }
});
