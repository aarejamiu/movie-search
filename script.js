const API_KEY = '7f12673c';
async function search() {
    let searchInput = document.getElementById('searchInput').value;
    let url = `http://www.omdbapi.com/?s=${searchInput}&apikey=${API_KEY}`;
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
        <div>
        <img src="${movie.Poster}" width="200">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        </div>
        `;

        });

        document.getElementById('result').innerHTML = output;    } 
        catch (error) {
        console.error('Error:', error);
    }
}