const apikey = "7959e3fda5db4003b4c7b8b7e5143a7e";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apikey}`;
    const response = await fetch(apiUrl);

    const data = await response.json();

    return data.articles;
    // console.log(data);
  } catch (error) {
    console.log("Error fetching random news", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if(query!== ""){
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
})

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
    
        const data = await response.json();
    
        return data.articles;
        // console.log(data);
    } catch (error) {
        console.log("Error fetching random news", error);
        return [];
    }
}


function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blog = document.createElement("div");
    blog.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle =
        article.title.length > 30
            ? article.title.slice(0, 30) + "..."
            : article.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncatedDes =
    article.description.length > 120
        ? article.description.slice(0, 120) + "..."
        : article.description;
    description.textContent = truncatedDes;

    blog.appendChild(img);
    blog.appendChild(title);
    blog.appendChild(description);
    blog.addEventListener('click', ()=>{
        window.open(article.url, '_blank');
    })
    blogContainer.appendChild(blog);

    console.log(blog);
    // blog.innerHTML = `<h3>${article.title}</h3>
    // <p>${article.description}</p>
    // <a href="${article.url}">Read More</a>`;
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    // console.log(articles);

    displayBlogs(articles);
  } catch (error) {
    console.log("Error fetching random news", error);
  }
})();
