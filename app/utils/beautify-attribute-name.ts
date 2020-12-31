

import { decamelize } from '@ember/string';

export default function beautifyAttributeName(name: string) {
  return decamelize(name).split('_').join(' ');
}
