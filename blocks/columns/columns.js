export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  block.querySelectorAll('img').forEach((img) => img.closest('div').classList.add('columns-image'));
}
