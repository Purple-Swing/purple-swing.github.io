async function createHighlightedProjectInfo()
{
    try {
        const res = await fetch("/config/highlighted.json");
        data = await res.json();
    } 
    catch (err) {
        console.error("Couldn't get highlighted json.", err);
        return;
    }
    
    const project = document.getElementById("highlighted-project");

    if (project)
    {
        project.style.backgroundColor = data.backgroundColor ?? "#200f2c";
        project.style.filter = `drop-shadow(0em 0em 0.5em ${data.glow})`;
    }

    document.getElementById("title").innerText = `Highlighted Project - ${data.title}`;

    if (data.description != null)
    {
        const desc = document.getElementById("description");
        desc.innerHTML = data.description;
        
        desc.querySelectorAll("a").forEach(link => {
            link.style.color = data.linkColor;
        });
    }

    if (data.video != null)
    {
        document.getElementById("video").src = data.video;
    }
    else
    {
        document.getElementById("video").remove();
    }
}

document.addEventListener("DOMContentLoaded", () => { createHighlightedProjectInfo(); });