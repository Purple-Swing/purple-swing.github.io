const newsletter_link = document.createElement("link");
newsletter_link.href = "/inner-css/newsletter.css";
newsletter_link.rel = "stylesheet";
newsletter_link.type = "text/css";
document.head.appendChild(newsletter_link);

document.addEventListener("DOMContentLoaded", async () => {
    fetch("/config/newsletters.json").then(res => res.json()).then(letters => {
        const slug = window.location.pathname.match(/([^/]+)\.html$/)?.[1];
        let newsletter = letters.find(letter => letter.slug === slug);

        if (!newsletter)
        {
            return;
        }

        if (newsletter.show === false) {
            const container = document.getElementById("container");
            container.innerText = "Selected newsletter could not be accessed and may be private.";
            container.style = "margin: 3rem; text-align: center;";
        }

        document.title = `Purple Swing | Newsletters | ${newsletter.title}`;
        document.getElementById("head").innerHTML = `${newsletter.title} | ${newsletter.release} <span style="font-size: medium;">by ${newsletter.authors}</span>`;
    });
});