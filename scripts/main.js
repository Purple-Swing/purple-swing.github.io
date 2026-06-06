const global_link = document.createElement("link");
global_link.href = "/global.css";
global_link.rel = "stylesheet";
global_link.style = "text/css";
document.head.appendChild(global_link);

function documentLoaded() {
    const nav = document.createElement("div");
    nav.id = "nav";
    nav.innerHTML = `
        <a href="/index.html"><img src="/site-assets/LogoLQ.webp" style="height: 5em; padding: 0.1em 0.1em 0.1em 0.1em"></a></img>
        <a href="/subpage/projects.html">Projects</a>
        <a href="/subpage/socials.html">Socials</a>
        <a href="/subpage/newsletters.html">Newsletters</a>
        <a href="/subpage/site-updates.html">Site Updates</a>
    `;

    const copyright = document.createElement("div");
    copyright.id = "copyright";
    copyright.innerHTML = `
    © PURPLE SWING, 2026 | UK UNREGISTERED JOINT AUTHORSHIP | Site v2.4
    `

    // Put before everything
    document.body.prepend(nav);

    // Put after
    document.body.append(copyright)
}

document.addEventListener("DOMContentLoaded", documentLoaded);