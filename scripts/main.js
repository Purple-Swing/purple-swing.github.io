document.addEventListener("DOMContentLoaded", () => {
    const nav = document.createElement("div");
    nav.id = "nav";
    nav.innerHTML = `
        <a href="/index.html">Home</a>
        <a href="/subpage/projects.html">Projects</a>
        <a href="/subpage/socials.html">Socials</a>
        <a href="/subpage/newsletters.html">Newsletters</a>
    `;
    // <a href="/subpage/site-update-log.html">Site Updates</a>


    const copyright = document.createElement("div");
    copyright.id = "copyright";
    copyright.innerHTML = `
    © PURPLE SWING, 2026 | UK UNREGISTERED JOINT AUTHORSHIP | Site v2.2
    `

    // put before everything
    document.body.prepend(nav);

    // put after
    document.body.append(copyright)
});