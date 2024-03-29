import { get } from "./api.js";

const spaceNews = document.querySelector('.news-container')
const submitBtnNews = document.querySelector('#submitBtnNews')
let isArticleOn = false

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
}

function createArticleBox(data) {
    const articleBox = document.createElement('div');
    articleBox.classList.add('article-box');
    const imgSection = document.createElement('div');
    imgSection.classList.add('img-section');

    const summaryText = truncateText(data.summary, 160);

    articleBox.innerHTML = `
        <div class="info-section" onclick="window.open('${data.url}', '_blank')">
            <div class="content">
                <div class="title">${data.title}</div>
                <div class="summary">${summaryText}</div>
            </div>
            <div class="details">
                <div class="author"><span class="white">By: </span>${data.news_site}</div>
            </div>
        </div>
    `;

    imgSection.style.background = `center top no-repeat url('${data.image_url}')`;
    imgSection.style.backgroundSize = `cover`;
    spaceNews.appendChild(articleBox);
    articleBox.appendChild(imgSection);
}


function searchArticle(keyword, limit) {
    const loadArticles = get(`space-news`, `?limit=${limit}&${keyword}`);

    if (isArticleOn) {
        const articlesOn = document.querySelectorAll('.article-box');
        articlesOn.forEach((article) => { article.remove(); });
    }

    loadArticles.then((data) => {
        data.results.forEach((articleData) => {
            createArticleBox(articleData);
        });
    });
    isArticleOn = true;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.location.pathname.includes("home.html")) {
        searchArticle("", 3);
        const moreNews = document.querySelector('#moreNews')
        moreNews.addEventListener('click', () => {
            window.location.href = './news.html'
        })        
    }else{
        searchArticle("", 15)
    }
});

submitBtnNews.addEventListener('click', () => {
    const inSearchNews = document.querySelector('#inSearchNews').value;
    
    if (document.location.pathname.includes("home.html")) {
        searchArticle("search=" + inSearchNews, 3);
    }else{
        searchArticle("search=" + inSearchNews, 15)
    }
});



