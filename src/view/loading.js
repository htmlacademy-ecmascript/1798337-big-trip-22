import AbstractView from '../framework/view/abstract-view.js';

function createNoTaskTemplate() {
  return (
    `<p class="board__no-tasks">
      Loading...
    </p>`
  );
}

export default class Loading extends AbstractView {
  get template() {
    return createNoTaskTemplate();
  }
}
