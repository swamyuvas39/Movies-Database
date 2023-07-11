const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieResults = document.getElementById('movie-results');

searchButton.addEventListener('click', searchMovies);

function searchMovies() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        // Clear previous results
        movieResults.innerHTML = '';

        // Fetch movie data from API
        fetch(`http://www.omdbapi.com/?apikey=1252e3b&s=${searchTerm}`)
            .then(response => response.json())
            .then(data => displayMovies(data.Search))
            .catch(error => console.error('Error searching movies:', error));
    }
}

function displayMovies(movies) {
    if (movies === undefined || movies.length === 0) {
        movieResults.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const title = document.createElement('h2');
        title.textContent = movie.Title;
        movieCard.appendChild(title);

        const year = document.createElement('p');
        year.textContent = `Year: ${movie.Year}`;
        movieCard.appendChild(year);

        const poster = document.createElement('img');
        poster.src = movie.Poster;
        movieCard.appendChild(poster);

        movieResults.appendChild(movieCard);
    });
}
