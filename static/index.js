/** @type { HTMLSelectElement } */ const themeForm      = document.getElementById('theme');
/** @type { HTMLDivElement } */    const settingsModal  = document.getElementById('settingsModal');
/** @type { HTMLDivElement } */    const infoModal      = document.getElementById('infoModal');
/** @type { HTMLInputElement } */  const input          = document.getElementById('searchbar');
const modalCover = document.getElementById('modalCover');
const root = document.querySelector(':root');

async function search() {
    const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    const serviceWorker = await window.navigator.serviceWorker.register('./sw.js', { scope: __uv$config.prefix });

    let url = input.value.trim();
    
    if (regex.test(url)) {
        url = 'http://' + url;
    } else {
        // This doesn't make sense but okay :sob:
        url = 'https://www.google.com/search?q=' + url;
    }

    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
}

function themeSelectChange() {
    const t = themeForm.selectedIndex;
    console.log(t);
}

function openSettingsModal() {
    settingsModal.classList.remove('hidden');
    modalCover.classList.remove('hidden');
}

function closeSettingsModal() {
    settingsModal.classList.add('hidden');
    modalCover.classList.add('hidden');
}

function openInfoModal() {
    infoModal.classList.remove('hidden');
    modalCover.classList.remove('hidden');
}

function closeInfoModal() {
    infoModal.classList.add('hidden');
    modalCover.classList.add('hidden');
}

// NOTE: For Z-index in CSS, modals should always have a z-index above 5, and everything else under 5