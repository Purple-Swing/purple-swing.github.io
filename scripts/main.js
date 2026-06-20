const global_link = document.createElement("link");
global_link.href = "/global.css";
global_link.rel = "stylesheet";
global_link.type = "text/css";
document.head.appendChild(global_link);

async function documentLoaded() {
    let site_version = "NAN";
    let newest_newsletter;
    let navbar_enabled = true;
    let navbar_pages;

    // Get site info
    try {
        const res = await fetch("/config/site-info.json");
        const data = await res.json();
        site_version = data.version;
        newest_newsletter = data.newest_newsletter;
        navbar_enabled = data.navbar;
        navbar_pages = data.navbar_pages;
    }
    catch (err) {
        console.error("Couldn't get site info.", err);
    }

    const nav = document.createElement("div");
    if (navbar_enabled) {
        nav.id = "nav";
        nav.innerHTML = `
        <a href="/index.html"><img src="/site-assets/LogoLQ.webp" style="height: 5em; padding: 0.1em 0.1em 0.1em 0.1em"></a>`;

        navbar_pages.forEach(page => {
            nav.innerHTML += page;
        });
    }

    const copyright = document.createElement("div");
    copyright.id = "copyright";

    // Automatically update info 
    copyright.textContent = `
    © PURPLE SWING, 2026 | UK UNREGISTERED JOINT AUTHORSHIP | Site v${site_version}
    `
    
    const newsletter = document.getElementById("newest-newsletter-link");
    if (newsletter != null)
    {
    newsletter.href = `/newsletters/${newest_newsletter}.html`;
    }

    // Put before everything
    document.body.prepend(nav);

    // Put after
    document.body.append(copyright)
}
document.addEventListener("DOMContentLoaded", documentLoaded);