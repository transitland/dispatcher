import { helper } from '@ember/component/helper';

export function toFixed(params/*, hash*/) {
  let value = params[0];
  let precision = params[1];
  if (value != undefined && typeof value.toFixed === "function") {
    return value.toFixed(precision);
  } else {
    return ""
  }
}

export default helper(toFixed);
