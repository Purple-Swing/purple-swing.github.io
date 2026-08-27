async function loadInfo(pageLink)
{
    if (pageLink == "") {
        console.error("News page link was left empty. Is this intentional?");
        return;
    }

    try {
        const res = await fetch("/config/news.json");
        data = await res.json();
    } 
    catch (err) {
        console.error("Couldn't get news json.", err);
        return;
    }

    for (const currentNewsElement of data)
    {
        var dataMatches = currentNewsElement.link == pageLink;

        if (!dataMatches) 
        {
            console.warn(`Data with link ${currentNewsElement.link} didn't match`);
            continue;
        }
        else
        {
            document.title = `Purple Swing | News: ${currentNewsElement.name}`;

            document.getElementById("titleText").innerText = `${currentNewsElement.name}`;
            var authorText = document.getElementById("authorText");
        
            authorText.innerText = "written by ";
            for (let i = 0; i < currentNewsElement.authors.length; ++i)
            {
                if (i == currentNewsElement.authors.length - 1)
                {
                    authorText.append(`${currentNewsElement.authors[i]}`);
                }
                else
                {
                    authorText.append(`${currentNewsElement.authors[i]}, `);
                }
            }
        }
    }
}