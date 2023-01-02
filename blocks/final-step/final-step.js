import { createTag } from '../../scripts/scripts.js';
import { toClassName, } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const finalStepContainer = block.closest('.final-step-container');
  const firstElementChild = block.firstElementChild.firstElementChild;
  const name = firstElementChild.textContent;
  const messageTemplate = firstElementChild.nextElementSibling.textContent;
  const messageContainer = createTag('div', { id: name, class: 'confirm-message', template: messageTemplate }, 'Can we talk about flowers?');
  block.replaceWith(messageContainer)

  decorateStartButton(finalStepContainer, messageContainer);
}

function decorateStartButton(elem, messageContainer) {
  elem.querySelectorAll('a[href="#textconfirm"]').forEach((a) => {
    a.addEventListener('click', () => {
      // TODO: Make this configurable
      const saneMessage = messageContainer.textContent.replace(/\s+/g, ' ').trim();
      window.open(`sms:+14242727091?&body=${saneMessage}`);
    })
  });
}
