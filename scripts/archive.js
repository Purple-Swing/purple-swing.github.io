let archive_data;

async function createArchive() 
{
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
        topicList.style.listStyle = "none";

        archiveTopic.versions.forEach(versionData => {
            const li = document.createElement("li");
            li.id = "project-archive";

            li.append(`v${versionData.version} ( `);

            if (versionData.platforms === "any")
            {
                li.appendChild(createPlatform(versionData, "Any", archiveTopic.binFolder));
            }
            else if (Array.isArray(versionData.platforms))
            {
                versionData.platforms.forEach((platform, index) => {
                    const os = platform.charAt(0).toUpperCase() + platform.slice(1);

                    li.appendChild(createPlatform(versionData, os, archiveTopic.binFolder));

                    if (index < versionData.platforms.length - 1) 
                    {
                        const appendLine = document.createElement("span");
                        appendLine.innerText = " | ";
                        appendLine.style.color = "#33727a";

                        li.appendChild(appendLine);
                    }
                });
            }
            else
            {
                const span = document.createElement("span");
                span.textContent = "No Download";
                span.style.fontStyle = "italic";
                span.style.color = "#33727a";

                li.appendChild(span);
            }

            li.append(` ) - ${versionData.releaseDate ? versionData.releaseDate : "Unknown"}`);

            topicList.appendChild(li);
        });

        archiveContainer.appendChild(topicList);

        if (i < archive_data.length - 1) 
        {
            archiveContainer.appendChild(document.createElement("hr"));
        }        
    }
}

function createPlatform(versionData, os, folder)
{
    const osExtensions = {
        windows: "win",
        mac: "mac",
        linux: "lnx"
    };

    let file = "";

    if (versionData.platforms === "any")
    {
        file = `${versionData.link}-any.zip`;
    }
    else if (Array.isArray(versionData.platforms))
    {
        const platform = os.toLowerCase();

        if (versionData.platforms.includes(platform) && osExtensions[platform])
        {
            file = `${versionData.link}-${osExtensions[platform]}.zip`;
        }
    }

    if ((versionData.link || versionData.offsite) && file)
    {
        const link = document.createElement("a");

        link.href = versionData.offsite || `/bin/${folder}/${file}`;
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