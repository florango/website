
console.log('delayed')
// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
function loadScript(url, callback, type) {
  const $head = document.querySelector('head');
  const $script = document.createElement('script');
  $script.src = url;
  if (type) {
    $script.setAttribute('type', type);
  }
  $script.onload = callback;
  $head.append($script);
  return $script;
}

// loadScript('https://www.googletagmanager.com/gtag/js?id=UA-167069650-1', () => {
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){dataLayer.push(arguments);}
//     gtag('js', new Date());
//     gtag('config', 'UA-167069650-1');
// }, 'text/javascript');


