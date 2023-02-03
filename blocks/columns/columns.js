export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  const header = block.querySelector('h1') || block.querySelector('h2');
  const altText = header?.textContent || 'Flowers';  
  block.querySelectorAll('img').forEach((img) => {
    img.closest('div').classList.add('columns-image');
    img.setAttribute('alt', altText);
  });
}
