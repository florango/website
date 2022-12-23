import { createTag } from "../../scripts/scripts.js";
import {
  attachNextAction
} from '../../../templates/orderbytext/orderbytext.js'


export default function decorate(block) {
  const selectorSection = block.closest('.selector-container');
  const contentContainers = selectorSection.querySelectorAll('.default-content-wrapper');
  const itemsContainer = contentContainers[1];
  itemsContainer.classList.add('gallery')
  const items = createTag('div', {class: 'gallery_scroller'});
  let item;

  const children = itemsContainer.childNodes;

  for (const itemContent of children) {
    const picture = itemContent.querySelector('picture');
    if (picture) { // We're at the begining of an item
      if (item) {
        items.append(item);
      }
      item = createTag('div');// Reset
      console.log('creating a new item div')
    }
    item.append(itemContent.cloneNode(true));
  }
  items.append(item);
  itemsContainer.innerHTML = '';
  itemsContainer.append(items);
  const nextButton = createTag('button', {}, 'Next')
  itemsContainer.append(nextButton);
  attachNextAction(nextButton);
}