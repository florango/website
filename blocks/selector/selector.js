import { createTag } from "../../scripts/scripts.js";
import {
  attachNextAction,
  updateField,
} from '../../../templates/orderbytext/orderbytext.js'


export default function decorate(block) {
  const selectorSection = block.closest('.selector-container');
  const contentContainers = selectorSection.querySelectorAll('.default-content-wrapper');
  const itemsContainer = contentContainers[1];
  itemsContainer.classList.add('gallery')
  const items = createTag('div', { class: 'gallery_scroller' });
  let item;

  const children = itemsContainer.childNodes;

  for (const itemContent of children) {
    const picture = itemContent.querySelector('picture');
    if (picture) { // We're at the begining of an item
      if (item) {
        items.append(extractAltText(item));
      }
      item = createTag('div', { class: 'gallery_item' });// Reset
      item.addEventListener('click', function () {
        handleItemSelect(this)
      })
    }
    item.append(itemContent.cloneNode(true));
    const title = extractItemTitle(item);
    if (title) {
      item.id = title;
    }
  }  
  items.append(extractAltText(item));
  itemsContainer.innerHTML = '';
  itemsContainer.append(items);
  const nextButton = createTag('button', {}, 'Next')
  itemsContainer.append(nextButton);
  attachNextAction(nextButton);
  updateField('Product', 'some Flowers');
}

function handleItemSelect(item) {
  const selected = item.parentNode.querySelector('.selected');
  selected?.classList.remove('selected')
  item.classList.add('selected')
  const title = extractItemTitle(item)
  updateField('Product', `the ${title}`, 'some Flowers');
}

function extractItemTitle(item) {
  const title = item.querySelector('h3');
  return title?.textContent;
}

function extractAltText(item) {
  item?.querySelector('img')?.setAttribute('alt', item?.id);
  return item;
}