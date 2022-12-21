import { createTag } from '../../scripts/scripts.js';
import {toClassName,} from '../../scripts/lib-franklin.js';
console.log('loading orderbytext template')

export async function createForm(block) {
  for (const field of block.children) {
    createField(field);
  }
}

export async function createField(field) {
  console.log(field.children)
  const fieldName = field.children[0].textContent;
  const fieldType = field.children[1].textContent;
  const fieldDiv = createTag('div', { class: 'form-field' });
  switch (fieldType) {
    case 'text':
      fieldDiv.append(createTag('input', { type: 'text', name: fieldName, placeholder: fieldName }))
      field.replaceWith(fieldDiv);
      break;
    case 'email':
      field.append(createTag('input', { type: 'email', name: fieldName, placeholder: fieldName }))
      field.replaceWith(fieldDiv);
      break;
    case 'phone':
      field.append(createTag('input', { type: 'tel', name: fieldName, placeholder: fieldName }))
      field.replaceWith(fieldDiv);
      break;
    case 'textarea':
      const fieldId = toClassName(fieldName);
      let label = createTag('label', {for: fieldId});
      label.textContent = fieldName;
      fieldDiv.append(createTag('textarea', { id: fieldId, name: fieldId, required: true }));
      fieldDiv.append(label);
      fieldDiv.classList.add('label-in-textarea');
      field.replaceWith(fieldDiv)
      break;
  }
  console.log(field);
  return field;
}

export async function registerField(field) {
  console.log(`registering ${field}`);
}