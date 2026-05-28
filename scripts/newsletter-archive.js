document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("newsletter-list");

    fetch("/newsletters.json").then(res => res.json()).then(letters => {
        const visibleLetters = letters.filter(letter => letter.show);

        if (!letters || letters.length === 0 || visibleLetters.length === 0) {
            return;
        }
        else {
            list.innerHTML = ``;
        }

        letters.forEach(letter => {
            if (!letter.show) {
                return;
            }

            const li = document.createElement("li");
            const a = document.createElement("a");

            a.href = `/newsletters/${letter.slug}.html`;
            a.textContent = `${letter.title} - ${letter.release} | by ${letter.authors}`;

            li.appendChild(a);
            list.appendChild(li);
        });
    })
        .catch(err => {
            console.error("Couldn't load letters:", err);
            list.textContent = "Couldn't load letters.";
        });
});