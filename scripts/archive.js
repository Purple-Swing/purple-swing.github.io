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
            const li = document.createElement("li");

            li.append(`v${versionData.version} ( `);

            ["Windows", "Mac", "Linux"].forEach((os, index) => {
                li.appendChild(createPlatform(versionData, os));

                if (index < 2) {
                    li.append(" | ");
                }
            });

            li.append(` ) - ${versionData.releaseDate ? versionData.releaseDate : "Unknown"}`);

            topicList.appendChild(li);
        });

        archiveContainer.appendChild(topicList);

        if (i < archive_data.length - 1) {
            archiveContainer.appendChild(document.createElement("hr"));
        }        
    }
}

function createPlatform(versionData, os) {
    let file = "";

    switch (os) 
    {
        case "Windows":
            file = versionData.winLink;
            break;
        case "Mac":
            file = versionData.macLink;
            break;
        case "Linux":
            file = versionData.linuxLink;
            break;
    }

    if (file) 
    {
        const link = document.createElement("a");
        link.href = `/bin/${versionData.binFolder}/${file}`;
        link.textContent = os;
        return link;
    }

    const span = document.createElement("span");
    span.textContent = os;
    span.style.fontStyle = "italic";
    span.style.color = "#6a4e6f";
    return span;
}

document.addEventListener("DOMContentLoaded", createArchive);