document.addEventListener("DOMContentLoaded", () => {
    const nav = document.createElement("div");
    nav.id = "nav";
    nav.innerHTML = `
        <a href="/index.html">Home</a>
        <a href="/subpage/projects.html">Projects</a>
        <a href="/subpage/socials.html">Socials</a>
    `;

    // put before everything
    document.body.prepend(nav);
});