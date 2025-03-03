const date = new Date();
const dayCurr = String(date.getDate()).padStart(2, '0');
const monthCurr = String(date.getMonth() + 1).padStart(2, '0');
const yearCurr = date.getFullYear();
let currDate = `${yearCurr}-${monthCurr}-${dayCurr}`;

date.setDate(date.getDate() - 25);
const dayPast = String(date.getDate()).padStart(2, '0');
const monthPast = String(date.getMonth() + 1).padStart(2, '0');
const yearPast = date.getFullYear();
let pastDate = `${yearPast}-${monthPast}-${dayPast}`;

const key = "3f824129ca044bb1b0682af2a1771af9";

async function Load(url) {

    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
                "Connection": "keep-alive"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();

        if (!data.articles) {
            throw new Error("No articles found in the response");
        }

        const article = data.articles;
        const main = document.querySelector("main");
        main.innerHTML = "";

        Array.from(article).forEach((ele) => {
            if (ele.urlToImage) {
                const title = ele.title;
                const image = ele.urlToImage;
                const sourceUrl = ele.url;
                const source = ele.source.name;
                const description = ele.description;
                const date = new Date(ele.publishedAt).toLocaleString("en-US", {
                    timeZone: "Asia/Jakarta",
                });

                let newDiv = document.createElement("a");
                newDiv.classList.add("news");
                newDiv.innerHTML = `
                    <img src="" loading="lazy" class="image" onerror="this.src='default.png';">
                    <h3></h3>
                    <span></span>
                    <p></p>`;

                main.appendChild(newDiv);

                const imageEle = newDiv.querySelector("img");
                const titleEle = newDiv.querySelector("h3");
                const sourceEle = newDiv.querySelector("span");
                const desEle = newDiv.querySelector("p");

                imageEle.src = image;
                titleEle.textContent = title;
                sourceEle.textContent = source + " " + date;
                newDiv.href = sourceUrl;
                desEle.textContent = description;
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

Load(`https://newsapi.org/v2/everything?q=india&from=${pastDate}&to=${currDate}&apikey=${key}`);

const logo = document.getElementById("logo_img");

logo.addEventListener('click',()=>{
    Load(`https://newsapi.org/v2/everything?q=india&from=${pastDate}&to=${currDate}&apikey=${key}`);
})


function linkSearch(links){

    const categories = links.getElementsByTagName("a");

    Array.from(categories).forEach((category)=>{

    category.addEventListener('click',()=>{

        const categoryName = category.textContent;

        const categoryUrl = `https://newsapi.org/v2/everything?q=${categoryName}&from=${pastDate}&to=${currDate}&apikey=${key}`;

        Load(categoryUrl);
    })

    category.addEventListener('click',(event)=>{

        const categories = links.getElementsByTagName("a");
        
        Array.from(categories).forEach((anchorTag)=>{

            anchorTag.style.color = "rgb(40, 40, 40)";
        })

        event.target.style.color = "blue";

    })
    
})

}

const linksHorizontal = document.getElementById("links");
linkSearch(linksHorizontal);

const linksVertical = document.getElementById("options");
linkSearch(linksVertical);

const searchbtn = document.getElementById("searchbtn");

searchbtn.addEventListener('click',()=>{

    const queryField = document.getElementById("search_element");

    console.log(queryField.value);
    
    if(queryField.value)
    {
        const url = `https://newsapi.org/v2/everything?q=${queryField.value}&from=${pastDate}&to=${currDate}&apikey=${key}`;

        Load(url);

        const links = document.getElementById("links");
        const categories = links.getElementsByTagName("a");

        Array.from(categories).forEach((category)=>{
            category.style.color = "rgb(40, 40, 40)";
        })
    }

})


const menuBtn = document.getElementById("menu");

menuBtn.addEventListener('click',()=>{
    const optionBar = document.getElementById("options");
   
    if(optionBar.classList == "")
    {
        optionBar.classList.add("animation1");
    }

    else if(optionBar.classList == "animation2")
    {
        optionBar.classList.remove("animation2");
        optionBar.classList.add("animation1");
    }

    else
    {
        optionBar.classList.remove("animation1");
        optionBar.classList.add("animation2");
    }
   
})
