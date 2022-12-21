import {
  createForm
} from '../../templates/orderbytext/orderbytext.js'



export default function decorate(block) {
  console.log('form step', block);
  createForm(block);
}
