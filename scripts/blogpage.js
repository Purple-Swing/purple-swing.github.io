function loadInfo() {
    fetch("/docs/blogs/posts.json") // Get json
        .then(res => res.json())
        .then(posts => {
            const current = posts[index]
            const title = document.getElementById("blogtitle");
            const date = document.getElementById("blogdate");

            if (title && date) {
                title.textContent = `${current.title}`;
                date.textContent = `Dated: ${current.date} | Written by ${current.author}`;
                document.title = `Purple Swing | Blogs | ${current.title}`;
            };
        })
        .catch(err => console.error("Failed to load info", err));
}

document.addEventListener("DOMContentLoaded", loadInfo);