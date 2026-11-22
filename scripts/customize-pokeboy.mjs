import { readFile, writeFile } from 'node:fs/promises';

const root = process.cwd();
const htmlPath = `${root}/azahar-web/web/index.html`;
const jsPath = `${root}/azahar-web/web/gaemboy3ds-page.js`;

let html = await readFile(htmlPath, 'utf8');
let js = await readFile(jsPath, 'utf8');

html = html.replace('<html lang="it">', '<html lang="en">')
  .replace('<title>GAEMBOY 3DS</title>', '<title>PokéBoy 3DS</title>')
  .replace('<h1 id="selection-title">GAEMBOY 3DS</h1>', '<h1 id="selection-title">PokéBoy 3DS</h1>')
  .replace('Scegli un gioco. Resta sul tuo dispositivo, nessun upload.', 'Choose a game. Everything stays on your device; nothing is uploaded.')
  .replace('Apri ROM…', 'Open game…')
  .replace('Scegli cartella giochi…', 'Choose games folder…')
  .replace('aria-label="Libreria giochi"', 'aria-label="Game library"')
  .replace('<h2>Libreria</h2>', '<h2>Game library</h2>')
  .replace('Aggiorna</button>', 'Refresh</button>')
  .replace('Dimentica cartella</button>', 'Forget folder</button>')
  .replace('placeholder="Cerca"', 'placeholder="Search"')
  .replace('aria-label="Cerca nella libreria"', 'aria-label="Search library"')
  .replace('<h2>Demo</h2>', '<h2>Homebrew demos</h2>')
  .replace('aria-label="Gioco"', 'aria-label="Game"')
  .replace('>Gioco</h1>', '>Game</h1>')
  .replace('>Menu</button>', '>Menu</button>')
  .replace('>Caricamento…</p>', '>Loading…</p>')
  .replace('aria-label="Comandi touch"', 'aria-label="Touch controls"')
  .replace('aria-label="Croce direzionale"', 'aria-label="D-pad"')
  .replace('aria-label="Pulsanti azione"', 'aria-label="Action buttons"')
  .replace('>Chiudi</button>', '>Close</button>')
  .replace('>Audio: on</button>', '>Audio: on</button>')
  .replace('>Velocità: 60 fps</button>', '>Speed: 60 fps</button>')
  .replace('>Salva ora</button>', '>Save now</button>')
  .replace('>Cambia gioco</button>', '>Change game</button>')
  .replace('<summary>Stati e backup</summary>', '<summary>Save states & backup</summary>')
  .replace('<label for="state-slot">Slot</label>', '<label for="state-slot">Slot</label>')
  .replace('Slot 1 — vuoto', 'Slot 1 — empty')
  .replace('Slot 2 — vuoto', 'Slot 2 — empty')
  .replace('Slot 3 — vuoto', 'Slot 3 — empty')
  .replace('>Salva stato</button>', '>Save state</button>')
  .replace('>Carica stato</button>', '>Load state</button>')
  .replace('>Elimina stato</button>', '>Delete state</button>')
  .replace('>Esporta backup ZIP</button>', '>Export backup ZIP</button>')
  .replace('<summary>Cheat</summary>', '<summary>Cheats</summary>')
  .replace('<label for="cheat-name">Nome</label>', '<label for="cheat-name">Name</label>')
  .replace('placeholder="Nome del cheat"', 'placeholder="Cheat name"')
  .replace('Codice Gateway (una riga per istruzione)', 'Gateway code (one instruction per line)')
  .replace('Attiva subito', 'Enable immediately')
  .replace('>Aggiungi cheat</button>', '>Add cheat</button>')
  .replace('<summary>Microfono e fotocamera</summary>', '<summary>Microphone & camera</summary>')
  .replace('>Attiva microfono</button>', '>Enable microphone</button>')
  .replace('>Disattivato</span>', '>Off</span>')
  .replace('>Fotocamera</label>', '>Camera</label>')
  .replace('Frontale / webcam', 'Front / webcam')
  .replace('Posteriore, se disponibile', 'Rear, if available')
  .replace('>Attiva fotocamera</button>', '>Enable camera</button>')
  .replace('>Disattivata</span>', '>Off</span>')
  .replace('<summary>Avanzate</summary>', '<summary>Advanced</summary>')
  .replace('>Scarica log</button>', '>Download log</button>')
  .replace('<b>Tastiera</b>:', '<b>Keyboard</b>:')
  .replace('Software libero sotto', 'Free software under')
  .replace('Codice sorgente', 'Source code')
  .replace('basato su', 'based on')
  .replace('Non affiliato a Nintendo; nessun gioco, BIOS o chiave incluso.', 'Not affiliated with Nintendo; no games, BIOS, or keys included.')
  .replace('<div class="keys">', '<section id="key-config" aria-label="Custom keyboard controls"><h3>Custom keyboard controls</h3><p>Choose a control, then press the key you want to assign. Changes are saved on this device.</p><div id="key-bindings"></div><button id="reset-key-bindings" type="button" class="alt">Reset default keys</button><p id="key-bind-status" role="status" aria-live="polite"></p></section>\\n    <div class="keys">'));

const oldMap = `const KEYMAP = {
  ArrowUp: 4, ArrowDown: 5, ArrowLeft: 6, ArrowRight: 7, KeyX: 8, KeyZ: 0, KeyS: 9, KeyA: 1,
  KeyQ: 10, KeyW: 11, KeyE: 12, KeyR: 13, Enter: 3, Backspace: 2,
};`;
const newMap = `let KEYMAP = {
  ArrowUp: 4, ArrowDown: 5, ArrowLeft: 6, ArrowRight: 7, KeyX: 8, KeyZ: 0, KeyS: 9, KeyA: 1,
  KeyQ: 10, KeyW: 11, KeyE: 12, KeyR: 13, Enter: 3, Backspace: 2,
};
const DEFAULT_KEYMAP = { ...KEYMAP };`;
if (!js.includes(oldMap)) throw new Error('Could not find the original keyboard map.');
js = js.replace(oldMap, newMap);

const oldSticks = `const STICK_KEYS = {
  KeyJ: ['analogLX', -1], KeyL: ['analogLX', 1], KeyI: ['analogLY', -1], KeyK: ['analogLY', 1],
  KeyF: ['analogRX', -1], KeyH: ['analogRX', 1], KeyT: ['analogRY', -1], KeyG: ['analogRY', 1],
};`;
const newSticks = `let STICK_KEYS = {
  KeyJ: ['analogLX', -1], KeyL: ['analogLX', 1], KeyI: ['analogLY', -1], KeyK: ['analogLY', 1],
  KeyF: ['analogRX', -1], KeyH: ['analogRX', 1], KeyT: ['analogRY', -1], KeyG: ['analogRY', 1],
};
const DEFAULT_STICK_KEYS = { ...STICK_KEYS };`;
if (!js.includes(oldSticks)) throw new Error('Could not find the original analog stick map.');
js = js.replace(oldSticks, newSticks);
js = js.replace("const STATUS = ['avvio', 'caricamento…', 'in esecuzione', 'errore'];",
  "const STATUS = ['Starting', 'Loading…', 'Running', 'Error'];");

const anchor = "const $ = (id) => document.getElementById(id);";
const customCode = `
let waitingForKey = null;
const KEY_NAMES = [[0, 'B'], [1, 'Y'], [2, 'Select'], [3, 'Start'], [4, 'D-pad Up'], [5, 'D-pad Down'], [6, 'D-pad Left'], [7, 'D-pad Right'], [8, 'A'], [9, 'X'], [10, 'L'], [11, 'R'], [12, 'ZL'], [13, 'ZR']];
const STICK_NAMES = [['analogLX', -1, 'Circle Pad Left'], ['analogLX', 1, 'Circle Pad Right'], ['analogLY', -1, 'Circle Pad Up'], ['analogLY', 1, 'Circle Pad Down'], ['analogRX', -1, 'C-Stick Left'], ['analogRX', 1, 'C-Stick Right'], ['analogRY', -1, 'C-Stick Up'], ['analogRY', 1, 'C-Stick Down']];
const KEY_STORAGE = 'pokeboy-key-bindings-v1';
function keyLabel(code) { return code ? (code.startsWith('Key') ? code.slice(3) : code.replace('Arrow', '')) : 'Not set'; }
function persistKeymap() {
  localStorage.setItem(KEY_STORAGE, JSON.stringify({ buttons: KEYMAP, sticks: STICK_KEYS }));
}
function loadKeymap() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY_STORAGE) || 'null');
    if (!saved) return;
    if (saved.buttons && typeof saved.buttons === 'object') KEYMAP = saved.buttons;
    if (saved.sticks && typeof saved.sticks === 'object') STICK_KEYS = saved.sticks;
  } catch { /* use defaults */ }
}
function renderKeyBindings() {
  const root = $('key-bindings');
  if (!root) return;
  root.replaceChildren();
  const addRow = (label, code, binding) => {
    const row = document.createElement('div');
    row.className = 'key-binding-row';
    const name = document.createElement('span');
    name.textContent = label;
    const key = document.createElement('button');
    key.type = 'button';
    key.className = 'alt';
    key.textContent = waitingForKey?.id === binding.id ? 'Press a key…' : keyLabel(code);
    key.onclick = () => {
      waitingForKey = binding;
      $('key-bind-status').textContent = `Press a key for ${label} (Esc to cancel).`;
      renderKeyBindings();
    };
    row.append(name, key);
    root.append(row);
  };
  for (const [id, label] of KEY_NAMES) {
    addRow(label, Object.keys(KEYMAP).find((code) => KEYMAP[code] === id), { type: 'button', id });
  }
  for (const [axis, dir, label] of STICK_NAMES) {
    addRow(label, Object.keys(STICK_KEYS).find((code) => STICK_KEYS[code][0] === axis && STICK_KEYS[code][1] === dir),
      { type: 'stick', id: `${axis}:${dir}`, axis, dir });
  }
}
function assignKey(code) {
  const duplicateButton = Object.entries(KEYMAP).some(([key, id]) => key === code && !(waitingForKey.type === 'button' && id === waitingForKey.id));
  const duplicateStick = Object.keys(STICK_KEYS).includes(code) && !(waitingForKey.type === 'stick' &&
    STICK_KEYS[code][0] === waitingForKey.axis && STICK_KEYS[code][1] === waitingForKey.dir);
  if (duplicateButton || duplicateStick) {
    $('key-bind-status').textContent = 'That key is already assigned. Choose a different key.';
    waitingForKey = null;
    renderKeyBindings();
    return;
  }
  if (waitingForKey.type === 'button') {
    for (const key of Object.keys(KEYMAP)) if (KEYMAP[key] === waitingForKey.id) delete KEYMAP[key];
    KEYMAP[code] = waitingForKey.id;
  } else {
    for (const key of Object.keys(STICK_KEYS)) {
      if (STICK_KEYS[key][0] === waitingForKey.axis && STICK_KEYS[key][1] === waitingForKey.dir) delete STICK_KEYS[key];
    }
    STICK_KEYS[code] = [waitingForKey.axis, waitingForKey.dir];
  }
  waitingForKey = null;
  persistKeymap();
  $('key-bind-status').textContent = 'Key binding saved on this device.';
  renderKeyBindings();
}
loadKeymap();
`;
if (!js.includes(anchor)) throw new Error('Could not find the DOM helper insertion point.');
js = js.replace(anchor, anchor + customCode);

const keyListenerAnchor = "addEventListener('keydown', (e) => {\n  if (!memory || gameMenu.open || readI('status') !== 2 || isControl(e.target)) return;";
const keyListenerReplacement = `addEventListener('keydown', (e) => {
  if (waitingForKey) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.code === 'Escape') {
      waitingForKey = null;
      $('key-bind-status').textContent = 'Key assignment cancelled.';
      renderKeyBindings();
    } else if (!['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'].includes(e.code)) {
      assignKey(e.code);
    }
    return;
  }
  if (!memory || gameMenu.open || readI('status') !== 2 || isControl(e.target)) return;`;
if (!js.includes(keyListenerAnchor)) throw new Error('Could not find the keyboard listener insertion point.');
js = js.replace(keyListenerAnchor, keyListenerReplacement);

const resetAnchor = "$('dl-log').onclick = downloadLog;";
const resetCode = `
$('reset-key-bindings')?.addEventListener('click', () => {
  KEYMAP = { ...DEFAULT_KEYMAP };
  STICK_KEYS = { ...DEFAULT_STICK_KEYS };
  waitingForKey = null;
  persistKeymap();
  $('key-bind-status').textContent = 'Default keys restored.';
  renderKeyBindings();
});
renderKeyBindings();
`;
if (!js.includes(resetAnchor)) throw new Error('Could not find the UI initialization insertion point.');
js = js.replace(resetAnchor, resetAnchor + resetCode);

if (!html.includes('id="key-config"')) throw new Error('Could not add the custom keyboard controls panel to index.html.');

await writeFile(htmlPath, html);
await writeFile(jsPath, js);
console.log('Applied PokéBoy English UI and customizable keyboard controls.');
