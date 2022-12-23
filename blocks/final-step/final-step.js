import { createTag } from '../../scripts/scripts.js';
import { toClassName, } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const finalStepContainer = block.closest('.final-step-container');
  const firstElementChild = block.firstElementChild.firstElementChild;
  const name = firstElementChild.textContent;
  const messageTemplate = firstElementChild.nextElementSibling.textContent;
  const messageContainer = createTag('div', { id: name, template: messageTemplate });
  block.replaceWith(messageContainer)

  decorateStartButton(finalStepContainer, messageContainer);
}

function decorateStartButton(elem, messageContainer) {
  console.log('block', elem)
  elem.querySelectorAll('a[href="#textconfirm"]').forEach((a) => {
    console.log('button2')
    a.addEventListener('click', () => {
      console.log('click')
      // TODO: Make this configurable
      window.open(`sms:+14242727091?&body=${messageContainer.textContent}`);
    })
  });
}
