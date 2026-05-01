function loadArchive() {
    fetch("/docs/blogs/posts.json") // Get json
        .then(res => res.json())
        .then(posts => {
            const ul = document.querySelector(".group");

            if (!posts || posts.length === 0) {
                const li = document.createElement("li");
                li.textContent = "No blog posts";
                ul.appendChild(li);
                return;
            }

            // For every post in the json, make an li and a tag for them, the a href will be the post
            // html file name.
            posts.forEach(post => {
                const li = document.createElement("li");

                const a = document.createElement("a");
                a.href = `/${post.slug}`;
                a.textContent = `${post.title} - ${post.date}`;

                li.appendChild(a);
                ul.appendChild(li);
            });
        })
        .catch(err => {
            // Posts weren't parsed correctly
            console.error("Failed to load blog archive", err);

            const ul = document.querySelector(".group");

            const li = document.createElement("li");
            li.textContent = "No blog posts";
            ul.appendChild(li);
        });
};

document.addEventListener("DOMContentLoaded", loadArchive); 