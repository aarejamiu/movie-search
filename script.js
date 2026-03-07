const API_KEY = '7f12673c';
async function search() {
    let searchInput = document.getElementById('searchInput').value.trim();
    localStorage.setItem("lastSearch", searchInput);
    let url = `https://www.omdbapi.com/?s=${searchInput}&apikey=${API_KEY}`;
    document.getElementById('loading').innerHTML = 'Loading...';
    try {
        let response = await fetch(url);
        let result = await response.json();
        document.getElementById('loading').innerHTML = '';
        if(result.Response === "False"){
        document.getElementById('result').innerHTML = "No movies found";
        return;
        }

        let movies = result.Search;

        let output = '';

        movies.forEach(movie => {

        output += `
        <div class="movie">
        <a href="details.html?id=${movie.imdbID}">
        <img src="${movie.Poster}" width="200">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        </a>
        </div>
        `;

        });

        document.getElementById('result').innerHTML = output;    } 
        catch (error) {
        console.error('Error:', error);
    }
}
/* -------- DETAILS PAGE -------- */

async function getMovieDetails(){

let params = new URLSearchParams(window.location.search);

let movieId = params.get("id");

if(!movieId) return;

let url = `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`;

try{

let response = await fetch(url);
let movie = await response.json();

if(movie.Response === "False"){
document.getElementById("movieDetails").innerHTML = "Movie not found";
return;
}

let output = `
<img src="${movie.Poster}">
<h2>${movie.Title}</h2>

<p><strong>Year:</strong> ${movie.Year}</p>
<p><strong>Genre:</strong> ${movie.Genre}</p>
<p><strong>Actors:</strong> ${movie.Actors}</p>
<p><strong>Rating:</strong> ${movie.imdbRating}/10</p>
<p><strong>Plot:</strong> ${movie.Plot}</p>
`;

document.getElementById("movieDetails").innerHTML = output;

}

catch(error){
console.error(error);
}

}


/* -------- RUN FUNCTIONS -------- */

if(document.getElementById("movieDetails")){
getMovieDetails();
}

window.onload = function(){

let lastSearch = localStorage.getItem("lastSearch");

if(lastSearch){
document.getElementById("searchInput").value = lastSearch;
search();

localStorage.removeItem("lastSearch");
}

}