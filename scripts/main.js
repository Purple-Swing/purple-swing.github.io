document.addEventListener("DOMContentLoaded", () => {
    fetch("blogs/posts.json")
        .then(res => res.json())
        .then(posts => {

            if (!posts || posts.length === 0) return;

            const latest = posts[posts.length - 1];

            const container = document.getElementById("newestBlogContainer");
            const link = document.getElementById("newestBlog");

            if (container && link) {
                // Show the "newest blog"
                link.href = `blogs/${latest}`;
                container.style.display = "list-item";
            }

        })
        .catch(err => console.error("Could not load posts list.", err));
});