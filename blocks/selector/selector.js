import { createTag } from "../../scripts/scripts.js";

export default function decorate(block) {
  const selectorSection = block.closest('.selector-container');
  const contentContainers = selectorSection.querySelectorAll('.default-content-wrapper');
  const itemsContainer = contentContainers[1];
  console.log('itemsContainer', itemsContainer)
  const items = createTag('div');
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
  console.log('items', items);
}