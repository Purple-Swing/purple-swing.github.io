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
        const data = await res.json();
        pages = data.pages;
    }
    catch (err) {
        console.error("Couldn't get site info.", err);
    }

    if (pages === null) return;

    const nav = document.createElement("div");
    
    nav.id = "nav";
    nav.innerHTML = `<a href="/index.html"><img src="" style="height: 5em; padding: 0.1em 0.1em 0.1em 0.1em"></a>`;

    pages.forEach(page => {
        nav.innerHTML += `<a href="${page.href}">${page.displayName}</a>`;
    });

    document.body.prepend(nav);
}

// CSS load
loadCSS("site");
document.addEventListener("DOMContentLoaded", createNavBar);