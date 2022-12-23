import { createTag } from '../../scripts/scripts.js';
import { toClassName, } from '../../scripts/lib-franklin.js';

const { default: scrollIntoView } = await import(
  '../../scripts/scroll-into-view-if-needed.js'
)

const fields = {};

function attachNextAction(button) {
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
  const fieldName = field.children[0].textContent;
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
      registerField(fieldName, input);
      break;
    case 'textarea':

      const textArea = createTag('textarea', { id: fieldName, name: fieldName, required: true });
      registerField(fieldName, textArea);
      fieldDiv.append(textArea);
      fieldDiv.append(label);
      break;
  }
  field.replaceWith(fieldDiv);
  field.name = fieldName;
  return field;
}

function registerField(fieldName, inputElement) {
  fields[fieldName] = '';
  inputElement.addEventListener('change', () => updateField(fieldName, inputElement.value));
}

function updateField(fieldName, fieldValue) {
  console.log(`Updating ${fieldName} to ${fieldValue}`)
  fields[fieldName] = fieldValue;
}

export default async function decoratePage(main) {
  decorateStartButton(main);
}

function decorateStartButton(main) {
  const button = main.querySelector('a[href="#start"]');
  if(button) {
    button.classList.add('start')
  }
  attachNextAction(button);
}
