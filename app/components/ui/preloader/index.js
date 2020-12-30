// code from https://codepen.io/romulomachado/full/WROjRQ

import Component from '@glimmer/component';

export default class UiPreloaderComponent extends Component {

  onInserted() {
    const byline = document.getElementById('byline');  	// Find the H2
    let bylineText = byline.innerHTML;										// Get the content of the H2
    let bylineArr = bylineText.split('');									// Split content into array
    byline.innerHTML = '';														// Empty current content

    let span;					// Create variables to create elements
    let letter;

    for (let i = 0; i < bylineArr.length; i++) {									// Loop for every letter
      span = document.createElement("span");					// Create a <span> element
      letter = document.createTextNode(bylineArr[i]);	// Create the letter
      if (bylineArr[i] == ' ') {												// If the letter is a space...
        byline.appendChild(letter);					// ...Add the space without a span
      } else {
        span.appendChild(letter);						// Add the letter to the span
        byline.appendChild(span); 					// Add the span to the h2
      }
    }
  }

}
