console.log("This is my index js file");

// Initialize the news api parameters
let source = 'bbc-news';
let apiKey = '7657639799d343bca84daaebb3a13216'
let category = 'sports'
// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');
let stockMarket = document.getElementById('stock');
let globalNews = document.getElementById("globalNews");
let indianNews = document.getElementById("indianNews");
let sports = document.getElementById("sports");
let tech = document.getElementById("tech");
let science = document.getElementById("science");
let prev = null;
// Create an ajax get request
const xhr = new XMLHttpRequest();
stockMarket.addEventListener("click", function () {
    colorFun(this, prev);
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${apiKey}`, true);
    whenLoad();
});
globalNews.addEventListener("click", function () {
    colorFun(this, prev);
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`, true);
    whenLoad();
});
indianNews.addEventListener("click", function () {
    colorFun(this, prev);
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`, true);
    whenLoad();
});
sports.addEventListener("click", function () {
    colorFun(this, prev);
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?language=en&category=sports&apiKey=${apiKey}`, true);
    whenLoad();
});
tech.addEventListener("click", function () {
    colorFun(this, prev);
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?language=en&category=technology&apiKey=${apiKey}`, true);
    whenLoad();
});

science.addEventListener("click", function () {
    colorFun(this, prev);
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?language=en&category=science&apiKey=${apiKey}`, true);
    whenLoad();
});
// What to do when response is ready
function colorFun(curr, previousElement) {
    if (previousElement != null)
        previousElement.parentElement.classList.remove("bg-danger");
    curr.parentElement.classList.add("bg-danger");
    prev = curr;
}
function whenLoad() {
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let articles = json.articles;
            console.log(articles);
            let newsHtml = "";
            articles.forEach(function (element, index) {
                // console.log(element, index)
                let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                   <b>Breaking News ${index + 1}:</b> ${element["title"]}
                                </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
                            </div>
                        </div>`;
                newsHtml += news;
            });
            newsAccordion.innerHTML = newsHtml;
        }
        else {
            console.log("Some error occured")
        }
    }

    xhr.send()
}
indianNews.click();

