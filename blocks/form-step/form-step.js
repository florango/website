export default function decorate(block) {
  const $p = document.createElement('p');
  $p.append('hsdjhsjsdhj');
  block.append($p);
  console.log('form step', block);
}
