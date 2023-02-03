export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  const altText = block.querySelector('h1')?.textContent || '';
  block.querySelectorAll('img').forEach((img) => {
    img.closest('div').classList.add('columns-image');
    img.setAttribute('alt', altText);
  });
}
