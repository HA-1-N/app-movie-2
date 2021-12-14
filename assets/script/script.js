const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const form = document.querySelector('#form');
const input = document.querySelector('#input');
const contentMain = document.querySelector('#content-main');
const iconMenu = document.querySelector('#header-icon-menu');
const model = document.querySelector('#model-side-bar');
const closeIcon = document.querySelector('#model-icon-wrap');
console.log(closeIcon);

getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results)
}

function showMovies(movies) {
    contentMain.innerHTML = '';

    movies.forEach((movie) => {

        const { title, vote_average, release_date, poster_path, overview } = movie;

        const movieEl = document.createElement('div');

        movieEl.className = 'movie-element';

        movieEl.innerHTML = `

            <div class="content-main-wrap-item">
                <div class="${"content-main-item-rate"} ${getClassRate(vote_average)}">${vote_average}</div>
                <img src="${IMGPATH + poster_path}" alt="${title}" class="content-main-img">
                <div class="content-main-item-wrap-title">
                    <h4 class="content-main-item-title-name">${title}</h4>
                    <h6 class="content-main-item-title-cast">${release_date}</h6>
                </div>

                <div class="overview">${overview}</div>
            </div>
                
        `;

        contentMain.appendChild(movieEl);
    });
}

function getClassRate(rate) {
    if (rate >= 8) {
        return "green";
    } else if (rate >= 5 && rate < 8) {
        return "orangi";
    } else {
        return "red";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const search = input.value;

    if (search) {
        getMovies(SEARCHAPI + search);
        input.value = '';
    }

});

iconMenu.onclick = function () {
    model.classList.add('click');
}

closeIcon.addEventListener('click', function () {
    model.classList.remove('click');
})
