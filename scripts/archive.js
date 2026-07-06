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
        projectArchiveElement.id = "project-archive";
            
        const topicList = document.createElement("ul");
        topicList.id = "project-archive";
        topicList.textContent = archiveTopic.name;

        archiveTopic.versions.forEach(versionData => {
            const li = document.createElement("li");
            li.id = "project-archive";

            li.append(`v${versionData.version} ( `);

            ["Windows", "Mac", "Linux"].forEach((os, index) => {
                li.appendChild(createPlatform(versionData, os, archiveTopic.binFolder));

                if (index < 2) {
                    const appendLine = document.createElement("span");
                    appendLine.innerText = " | "; 
                    appendLine.style.color = "#33727a";
                    
                    li.appendChild(appendLine);
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

function createPlatform(versionData, os, folder) {
    let file = "";

    if ((versionData.link || versionData.offsite) && versionData.platforms)
    {
        if (versionData.platforms.includes(os.toLowerCase()))
        {        
            switch (os) 
            {
                case "Windows":
                    {
                        file = `${versionData.link}-win.zip`;
                        break;
                    }
                case "Mac":
                    {
                        file = `${versionData.link}-mac.zip`;
                        break;
                    }
                case "Linux":
                    {
                        file = `${versionData.link}-lix.zip`;
                        break;
                    }
            }  
        }
    }

    if (file) 
    {
        const link = document.createElement("a");
        link.href = versionData.offsite ? versionData.offsite : `/bin/${folder}/${file}`;
        link.textContent = os;

        return link;
    }

    const span = document.createElement("span");
    span.textContent = os;
    span.style.fontStyle = "italic";
    span.style.color = "#33727a";
    return span;
}

document.addEventListener("DOMContentLoaded", createArchive);