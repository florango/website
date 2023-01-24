import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  toClassName,
  getMetadata,
} from './lib-franklin.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here

/**
 * decorates paragraphs containing a single link as buttons with classes and
 * chevron icon.
 * @param {Element} element container element
 */
function decorateButtons(element) {
  element.querySelectorAll('a').forEach((a) => {
    a.title = a.title || a.textContent;
    if (a.href !== a.textContent) {
      const up = a.parentElement;
      const twoup = a.parentElement.parentElement;
      if (!a.querySelector('img')) {
        if (up.childNodes.length === 1 && (up.tagName === 'P' || up.tagName === 'DIV')) {
          a.className = 'button primary'; // default
          up.classList.add('button-container');
        }
        if (up.childNodes.length === 1 && up.tagName === 'STRONG'
          && twoup.childNodes.length === 1 && twoup.tagName === 'P') {
          a.className = 'button primary';
          twoup.classList.add('button-container');
        }
        if (up.childNodes.length === 1 && up.tagName === 'EM'
          && twoup.childNodes.length === 1 && twoup.tagName === 'P') {
          a.className = 'button secondary';
          twoup.classList.add('button-container');
        }
      }
      const goHash = '#go:';
      if(a.href.includes(goHash)) {
        const link = a.href.substring(a.href.indexOf(goHash) + goHash.length);
        console.log(link)
        a.href = link;
      }
    }
  });
}

function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * Returns a Franklin icon span (that will be expanded by decorateIcons)
 * @param {string} name The icon file name (minus ".svg")
 * @returns {HTMLSpanElement}
 */
export function createIcon(name) {
  const icon = document.createElement('span');
  icon.classList.add('icon', `icon-${name}`);

  return icon;
}

function createEmbedWrap(a, vendor) {
  const div = document.createElement('div');
  div.classList.add('embed');
  div.classList.add(`${vendor}-base`);

  a.style.display = 'none';
  a.insertAdjacentElement('afterend', div);
}

function preDecorateEmbed(main) {
  const anchors = main.getElementsByTagName('a');
  const youTubeAnchors = Array.from(anchors).filter((a) => a.href.includes('youtu') && encodeURI(a.textContent.trim()).indexOf(a.href) !== -1);
  const spotifyAnchors = Array.from(anchors).filter((a) => a.href.includes('spotify') && encodeURI(a.textContent.trim()).indexOf(a.href) !== -1);
  const wistiaAnchors = Array.from(anchors).filter((a) => a.href.includes('wistia') && encodeURI(a.textContent.trim()).indexOf(a.href) !== -1);

  youTubeAnchors.forEach((a) => {
    createEmbedWrap(a, 'youtube');
  });
  spotifyAnchors.forEach((a) => {
    createEmbedWrap(a, 'spotify');
  });
  wistiaAnchors.forEach((a) => {
    createEmbedWrap(a, 'wistia');
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
async function buildAutoBlocks(main) {
  try {
    //buildHeroBlock(main);
    const template = toClassName(getMetadata('template'));
    const templates = ['orderbytext'];
    if (templates.includes(template)) {
      const mod = await import(`../templates/${template}/${template}.js`);
      if (mod.default) {
        await mod.default(main);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Instruments the main element with document metadata for LiveUX tracking
 * @param {*} main The main element
 */
function instrumentMain(main) {
  [...document.head.children]
    .filter((child) => child.nodeName === 'META' && child.name.startsWith('wp-'))
    .forEach((meta) => main.setAttribute(`data-${meta.name}`, meta.content));
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  decoratePhoneLinks(main);
}


/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    await decorateMain(main);
    if (document.querySelector('main .section:first-child img')) {
      await waitForLCP(LCP_BLOCKS);
    } else {
      document.querySelector('body').classList.add('appear');
      await loadFonts();
    }
    //await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);
  decorateIcons(main);

  const { hash } = window.location;
  const element = hash ? main.querySelector(hash) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  addFavIcon(`${window.hlx.codeBasePath}/icons/favicon.ico`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();

const params = new URLSearchParams(window.location.search);
if (params.get('performance')) {
  window.hlx.performance = true;
  import('./performance.js').then((mod) => {
    if (mod.default) mod.default();
  });
}

const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
const isMac = (navigator.appVersion.indexOf('Mac') != -1);

console.log(`isMobile: ${isMobile}`);
console.log(`isMac: ${isMac}`);


function decoratePhoneLinks(elem) {
  elem.querySelectorAll('a[href="#textus"]').forEach((a) => {
    a.addEventListener('click', () => {
      // TODO: Make this configurable
      if (isMobile || isMac) {
        window.open('sms:+14242727091?&body=Can we talk about flowers?');
      } else {
        window.open('mailto:hey@florango.com?subject=Can we talk about flowers?');
      }
    })
  });
}

async function decorateTextPage($main) {
  if (window.location.pathname.includes('orderbytext')) {
    $main.className = 'order-by-text-wizard';
    const $sections = $main.querySelectorAll('.section');
    console.log('sections', $sections);
  }
}

async function loadFonts() {
  //const gellix = new FontFace('Gellix', 'url("/fonts/gellix-regular_r.woff2")');
  //await gellix.load();
  //document.fonts.add(gellix);
}

export function createTag(name, attrs, textContent) {
  const el = document.createElement(name);
  if (typeof attrs === 'object') {
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value);
    }
  }
  el.textContent = textContent;
  return el;
}