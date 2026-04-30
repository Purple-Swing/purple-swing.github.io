document.addEventListener("DOMContentLoaded", () => {
    fetch("docs/blogs/posts.json")
        .then(res => res.json())
        .then(posts => {

            // Don't attempt to display
            if (!posts || posts.length === 0) return;

            // Get latest post by json length
            const latest = posts[posts.length - 1];

            const container = document.getElementById("newestBlogContainer");
            const link = document.getElementById("newestBlog");

            if (container && link) {
                // Both container and link are available, so set the container to be visible
                link.href = `docs/blogs/${latest}`;
                container.style.display = "list-item";
            }

        })
        .catch(err => console.error("Could not load posts list.", err));
});