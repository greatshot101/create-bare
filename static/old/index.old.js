const form = document.getElementById('UVForm');
const input = document.getElementById('UVInput');

form.addEventListener('submit', async event => {
    event.preventDefault();

    // Don't know what this does, but I'm assuming it does something
    const serviceWorker = await window.navigator.serviceWorker.register('./sw.js', { scope: __uv$config.prefix });
    
    const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    const url = input.value.trim();
    
    if (regex.test(url)) {
        url = 'http://' + url;
    } else {
        // This doesn't make sense but okay :sob:
        url = 'https://www.google.com/search?q=' + url;
    }

    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

const store = window.localStorage;
dragElement(document.getElementById("settingsWindow"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e.preventDefault();

        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function changeTheme(themeName) {
    var head = document.getElementsByTagName("head")[0]
    var theme = document.getElementById("cssOverrides")
    theme.href = `${themeName}.css`
}

function loadDefTheme() {
    const item = window.localStorage.getItem("theme")
    console.log(item)
    if (item == null) {
        console.log("No theme detected using default")
        store.setItem("theme", "default")
        return
    }

    if (item == "/styles/main.css") {
        console.log("No theme detected using default")
        store.setItem("theme", `default`)
    }
    changeTheme(store.getItem("theme"))
}


function loadTheme(theme) {
    store.setItem("theme", theme)
    changeTheme(store.getItem("theme"))
}


function clearDefTheme() {
    store.removeItem('theme')
    changeTheme('default')
}

function handleSettings() {
    document.getElementById("settingsWindow").classList.toggle('hidden')
};

function handleSettingsClose(e) {
    document.getElementById("settingsWindow").classList.toggle('hidden')
    let select = document.getElementById('theme')
    loadTheme(select.value)
    //add logic to change theme
};

function handleThemeSelectChange(e) {
    let select = document.getElementById('theme')
    loadTheme(select.value)
    //add logic to change theme
};