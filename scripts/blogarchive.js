document.addEventListener("DOMContentLoaded", () => {
    fetch("posts.json")
        .then(res => res.json())
        .then(posts => {
            const ul = document.querySelector(".group");

            if (!posts || posts.length === 0) {
                const li = document.createElement("li");
                li.textContent = "No blog posts";
                ul.appendChild(li);
                return;
            }

            posts.forEach(post => {
                const li = document.createElement("li");

                const a = document.createElement("a");
                a.href = `${post}`;
                a.textContent = post;

                li.appendChild(a);
                ul.appendChild(li);
            });
        })
        .catch(err => {
            console.error("Failed to load blog archive", err);

            const ul = document.querySelector(".group");

            const li = document.createElement("li");
            li.textContent = "No blog posts";
            ul.appendChild(li);
        });
});