function getAuthors(authors)
{
    fin = "";

    for (let i = 0; i < authors.length; ++i)
    {
        if (i == authors.length - 1)
        {
            fin += `${authors[i]}`
        }
        else
        {
            fin += `${authors[i]}, `
        }
    }

    return fin;
}

async function addNewsPages()
{
    try {
        const res = await fetch("/config/news.json");
        data = await res.json();
    } 
    catch (err) {
        console.error("Couldn't get news json.", err);
        return;
    }

    const newsList = document.getElementById("news-list");

    for (const currentNewsElement of data) 
    {
        const listElement = document.createElement("li");

        const link = document.createElement("a");
        link.href = `/news/${currentNewsElement.link}.html`;
        link.textContent = `${currentNewsElement.name} - ${currentNewsElement.date} | by ${getAuthors(currentNewsElement.authors)}`;

        listElement.appendChild(link);
        newsList.appendChild(listElement);
    }
}

document.addEventListener("DOMContentLoaded", addNewsPages);