// Your code here
document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000';
    
    // Function to fetch and display movie details
    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(`${baseURL}/films/1`);
            const movieData = await response.json();

            // Populate movie details on the page
            // Example: document.getElementById('movie-title').innerText = movieData.title;

        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    // Function to fetch and display all movies in the menu
    const fetchAllMovies = async () => {
        try {
            const response = await fetch(`${baseURL}/films`);
            const movies = await response.json();
            const filmsList = document.getElementById('films');

            // Clear existing menu items
            filmsList.innerHTML = '';

            // Populate menu with movies
            movies.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = movie.title;
                listItem.classList.add('film', 'item');
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => deleteFilm(movie.id));
                
                listItem.appendChild(deleteBtn);
                filmsList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    // Function to handle buying a ticket
    const buyTicket = async () => {

        // Add logic to buy ticket, update frontend and backend
    };

    // Function to handle deleting a film
    const deleteFilm = async (filmId) => {
        try {
            const response = await fetch(`${baseURL}/films/${filmId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                
                // Remove the film from the menu on the frontend
                const filmItem = document.querySelector(`.film-item[data-id="${filmId}"]`);
                if (filmItem) {
                    filmItem.remove();
                }
            } else {
                console.error('Failed to delete film:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting film:', error);
        }
    };

    // Initializations
    fetchMovieDetails();
    fetchAllMovies();

    // Event listeners
    document.getElementById('buy-ticket-btn').addEventListener('click', buyTicket);
});