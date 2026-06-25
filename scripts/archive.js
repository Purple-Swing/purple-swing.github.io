let archive_data;

async function createArchive() {
    try {
        const res = await fetch("/config/archive.json");
        archive_data = await res.json();
    } 
    catch (err) {
        console.error("Couldn't get archive.", err);
        return;
    }

    const archiveContainer = document.getElementById("archive-container");
    for (let i = 0; i < archive_data.length; ++i)
    {
        const archiveTopic = archive_data[i];

        const projectArchiveElement = document.createElement("div")
        projectArchiveElement.id = ("project-archive");
            
        const topicList = document.createElement("ul");
        topicList.textContent = archiveTopic.name;

        archiveTopic.versions.forEach(versionData => {
            const list = document.createElement("li");
            const link = versionData.link ? document.createElement("a") : document.createElement("p");

            link.textContent = `v${versionData.version} - ${versionData.releaseDate ? versionData.releaseDate : "unknown"}`;

            if (versionData.link)
            {
                link.href = `/bin/${versionData.binFolder}/${versionData.link}`;
            }
            else
            {
                link.style.color = "#6a4e6f";
                link.style.fontStyle = "italic";
            }

            list.appendChild(link);
            topicList.appendChild(list);
        });

        archiveContainer.appendChild(topicList);

        if (i < archive_data.length - 1) {
            archiveContainer.appendChild(document.createElement("hr"));
        }        
    }
}

document.addEventListener("DOMContentLoaded", createArchive);