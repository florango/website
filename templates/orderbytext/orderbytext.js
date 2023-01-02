import { createTag } from '../../scripts/scripts.js';
import { toClassName, } from '../../scripts/lib-franklin.js';

const { default: scrollIntoView } = await import(
  '../../scripts/scroll-into-view-if-needed.js'
)

export const fields = {};

export function attachNextAction(button) {
  const closest = button.closest('.section');
  button.addEventListener('click', () => {
    scrollIntoView(closest.nextElementSibling, {
      behavior: 'smooth',
      scrollMode: 'if-needed',
    });
  })
  return button;
}

export async function createForm(block) {
  for (const fieldData of block.children) {
    const field = createField(fieldData);
  }
  const nextButton = createTag('button', {}, 'Next')
  block.append(nextButton);
  attachNextAction(nextButton);
}

function createInput(fieldName, fieldType) {
  //return createTag('input', { type: fieldType, name: fieldName, placeholder: fieldName })
  return createTag('input', { type: fieldType, name: fieldName, required: true })
}

export function createField(field) {
  const fieldData = field.children[0].textContent.split(',')
  const fieldName = fieldData[0];
  const defaultValue = fieldData[1] || ' ';

  const fieldType = field.children[1].textContent;
  const fieldDiv = createTag('div', { class: 'form-field styled-input' });
  let label = createTag('label', { for: fieldName });
  label.textContent = fieldName;
  switch (fieldType) {
    case 'text':
    case 'email':
    case 'tel':
      const input = createInput(fieldName, fieldType);
      fieldDiv.append(input);
      fieldDiv.append(label);
      registerField(fieldName, input, defaultValue);
      break;
    case 'textarea':
      const textArea = createTag('textarea', { id: fieldName, name: fieldName, required: true });
      registerField(fieldName, textArea, defaultValue);
      fieldDiv.append(textArea);
      fieldDiv.append(label);
      break;
  }
  field.replaceWith(fieldDiv);
  field.name = fieldName;
  return field;
}

function registerField(fieldName, inputElement, defaultValue) {
  updateField(fieldName, inputElement.value, defaultValue)
  inputElement.addEventListener('change', () => updateField(fieldName, inputElement.value, defaultValue));
}

function updateField(fieldName, fieldValue, defaultValue) {
  fields[fieldName] = fieldValue || defaultValue;
  const confirmContainer = document.querySelector('#Confirm');
  if (confirmContainer) {
    console.log(confirmContainer)
    const messageTemplate = confirmContainer.getAttribute('template');
    updateMessage(confirmContainer, messageTemplate, fields)
  }
}

export function updateMessage(element, messageTemplate, values) {
  let message = '';
  const messageBits = messageTemplate.split('|');
  messageBits.forEach((messageBit) => {
    if (values[messageBit]) {
      message += values[messageBit];
    } else {
      message += messageBit;
    }
  })
  element.textContent = message;
}

export default async function decoratePage(main) {
  main.className = 'order-by-text-wizard';
  decorateStartButton(main);
}

function decorateStartButton(main) {
  const button = main.querySelector('a[href="#start"]');
  if (button) {
    button.classList.add('start')
  }
  attachNextAction(button);
}
