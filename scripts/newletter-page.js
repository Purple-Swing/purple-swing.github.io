const newsletter_link = document.createElement("link");
newsletter_link.href = "/inner-css/newsletter.css";
newsletter_link.rel = "stylesheet";
newsletter_link.style = "text/css";
document.head.appendChild(newsletter_link);

document.addEventListener("DOMContentLoaded", () => { 
    fetch("/newsletters.json").then(res => res.json()).then(letters => {
        const slug = window.location.pathname.match(/([^/]+)\.html$/)?.[1];
        const newsletter = letters.find(letter => letter.slug === slug);

        document.title = `Purple Swing | Newsletters | ${newsletter.title}`;

        document.getElementById("head").innerHTML = `${newsletter.title} | ${newsletter.release} <span style="font-size: medium;">by ${newsletter.authors}</span>`;
    });
});