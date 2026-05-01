function loadBlog() {
    fetch("docs/blogs/posts.json")
        .then(res => res.json())
        .then(posts => {

            // Don't attempt to display
            if (!posts || posts.length === 0) return;

            // Sort by newest date parameter
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            const latest = posts[0];
            const container = document.getElementById("newestBlogContainer");
            const newest = document.getElementById("newestBlog");

            if (container && newest && latest) {
                container.style.display = "list-item";
                newest.href = `/${latest.slug}`;
                newest.textContent = `Latest Post: ${latest.title}`;
            }
        })
        .catch(err => console.error("Could not load posts list.", err));
}

document.addEventListener("DOMContentLoaded", loadBlog)