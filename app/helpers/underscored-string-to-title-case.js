import { helper } from '@ember/component/helper';

export function underscoredStringToTitleCase(params) {
  return params[0].split("_").map((word) => word.capitalize()).join(" ");
}

export default helper(underscoredStringToTitleCase);
