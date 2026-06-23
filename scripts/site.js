let settings_navbar;
let site_info;

function loadCSS(href)
{
    const linkage = document.createElement("link");
    linkage.type = "text/css";
    linkage.href = `/styles/${href}.css`;
    linkage.rel = "stylesheet";

    document.head.appendChild(linkage);
}

async function createNavBar()
{
    let pages;

    try {
        const res = await fetch("/config/settings_navbar.json");
        settings_navbar = await res.json();
        pages = settings_navbar.pages;
    }
    catch (err) {
        console.error("Couldn't get navbar settings.", err);
        return;
    }

    if (settings_navbar.hide === "true")
    {
        // Stop attempting to load navbar
        return;
    }

    if (pages === null) return;

    const nav = document.createElement("div");
    
    nav.id = "nav";

    pages.forEach(page => {
        let innerHTML;
        
        if (page.image != "")
        {
            innerHTML = `<a href="${page.href}"> <img src="${page.image}" alt="${page.displayName}"></a>`;
        }
        else
        {
            innerHTML = `<a href="${page.href}">${page.displayName}</a>`;
        }

        nav.innerHTML += innerHTML;
    });

    document.body.prepend(nav);
}

async function appendSmallText()
{
    try {
        const res = await fetch("/config/site_info.json");
        site_info = await res.json();
    }
    catch (err) {
        console.error("Couldn't get navbar settings.", err);
        return;
    }

    const smallTextElement = document.createElement("p");
    smallTextElement.id = "bottomText";
    smallTextElement.innerHTML = `v${site_info.version} - released ${site_info.releaseDate} - © PURPLE SWING 2026, JOINT AUTHORSHIP`;
    document.body.append(smallTextElement);
}


// CSS load
loadCSS("site");
document.addEventListener("DOMContentLoaded", () => createNavBar());
appendSmallText();