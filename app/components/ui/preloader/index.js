// code from https://codepen.io/romulomachado/full/WROjRQ

import Component from '@glimmer/component';

export default class UiPreloaderComponent extends Component {
  get chars() {
    return 'Loading data..'.split('');
  }
}
