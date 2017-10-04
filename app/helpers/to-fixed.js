import Ember from 'ember';

export function toFixed(params/*, hash*/) {
  let value = params[0];
  let precision = params[1];
  if (value != undefined && typeof value.toFixed === "function") {
    return value.toFixed(precision);
  } else {
    return ""
  }
}

export default Ember.Helper.helper(toFixed);
