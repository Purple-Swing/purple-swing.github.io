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
        projectLink.title = project.name;

        const projectImage = document.createElement("img");
        projectImage.src = project.img ? `/img/projects/${project.type}/${project.img}` : "/img/missing.webp";

        projectElement.appendChild(projectLink);
        projectLink.appendChild(projectImage);
        grid.appendChild(projectElement);
    });

    // Fallback if no items
    grids.forEach(grid => {
        if (grid.children.length === 0) {
            grid.textContent = `No ${getPluralForm(grid.id)} found.`;
        }
    });
}

function getPluralForm(name)
{
    switch (name.substr(name.length - 1))
    {
        case "c":
            {
                return name;
            }
        case "x":
            {
                return name;
            }
        case "s": 
            {
                return name;
            }
        case "t":
            {
                return name;
            }
        case "y":
            {
                return name.slice(0, -1) + "ies";
            }
        default:
            {
                return name + "s";
            }
    }
}


document.addEventListener("DOMContentLoaded", () => createProjects());