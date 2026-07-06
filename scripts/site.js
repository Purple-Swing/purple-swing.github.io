let settings_navbar;
let member_list;
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
        
        if (page.image)
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

async function loadSiteInfo()
{
    try {
        const res = await fetch("/config/site_info.json");
        site_info = await res.json();
    }
    catch (err) {
        console.error("Couldn't get site info.", err);
        return;
    }

    // Bottom Text
    const smallTextElement = document.createElement("p");
    smallTextElement.id = "bottomText";
    smallTextElement.innerHTML = `v${site_info.version} | ${site_info.releaseDate} - © PURPLE SWING 2026, JOINT AUTHORSHIP`;
    document.body.append(smallTextElement);

    // Member list
    const member_list = site_info.members;
    const memberListElement = document.getElementById("memberList");

    
    if (memberListElement)
    {
        memberListElement.innerHTML = "";
    }
    
    for (let i = 0; i < member_list.length; i++) {
        const member = member_list[i];

        const key = Object.keys(member)[0];
        const value = Object.values(member)[0];

        const isLastElement = (i < member_list.length - 1);
        const isAnd = isLastElement ? "" : "and ";
        const hasComma = isLastElement ? ", " : "";

        const text = `${isAnd} <a href="${value}">${key}</a>${hasComma}`;
        
        if (memberListElement) {
            memberListElement.innerHTML += text;
        }
    }
}

function genMeta()
{
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(meta);
}

// CSS load
genMeta();
loadCSS("site");
document.addEventListener("DOMContentLoaded", () => createNavBar());
loadSiteInfo();