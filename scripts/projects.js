let projects_data;

async function createProjects()
{
    try {
        const res = await fetch("/config/projects.json");
        projects_data = await res.json();
    }
    catch (err) {
        console.error("Couldn't get projects data.", err);
        return;
    }

    if (!projects_data)
    {
        return;
    }

    const projects_list = projects_data.projects;
    const grids = document.querySelectorAll(".projects-grid");

    projects_list.forEach(project => {
        const grid = document.getElementById(`${project.type}`)

        if (!grid) return;

        const projectElement = document.createElement("div");
        projectElement.id = "projects-grid-item";

        const projectLink = document.createElement("a");
        projectLink.href = project.link;

        const projectImage = document.createElement("img");
        projectImage.src = project.img ? `/img/projects/${project.type}/${project.img}` : "/img/missing.webp";

        projectElement.appendChild(projectLink);
        projectLink.appendChild(projectImage);
        grid.appendChild(projectElement);
    });

    // Fallback if no items
    grids.forEach(grid => {
        if (grid.children.length === 0) {
            grid.textContent = `No ${makePlural(grid.id)} found.`;
        }
    });
}

function makePlural(name)
{
    let irregular = name.endsWith("c") ||  name.endsWith("x") ||  name.endsWith("y") ||  name.endsWith("s");

    return name += !irregular ? "s" : "";
}


document.addEventListener("DOMContentLoaded", () => createProjects());