import { htmlSafe } from '@ember/string';
import { helper } from '@ember/component/helper';

export function stringifyJson(json) {
  return new htmlSafe(JSON.stringify(json, null, ' '));
}

export default helper(stringifyJson);
