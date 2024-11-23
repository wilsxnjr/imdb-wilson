document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("movieResults");

  const defaultMovies = [
    {
      Title: "Avatar",
      Year: "2009",
      Poster:
        "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg",
      imdbID: "tt0499549",
    },
    {
      Title: "Transformers",
      Year: "2007",
      Poster:
        "https://upload.wikimedia.org/wikipedia/en/6/66/Transformers07.jpg",
      imdbID: "tt0418279",
    },
    {
      Title: "The Avengers",
      Year: "2012",
      Poster:
        "https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg",
      imdbID: "tt0848228",
    },
  ];

  resultsContainer.innerHTML = defaultMovies
    .map(
      (movie) => `
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
              <p class="card-text"><strong>Year:</strong> ${movie.Year}</p>
              <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Ver Filme</a>
            </div>
          </div>
        </div>
      `
    )
    .join("");
});

document.getElementById("searchButton").addEventListener("click", async () => {
  const query = document.getElementById("movieSearch").value.trim();
  const apiKey = "3PHr5qGq337arQu1TXdLmT:68kY6OGU3D1xD9i7Oxzepp";
  const resultsContainer = document.getElementById("movieResults");

  if (query === "") {
    alert("Please enter a movie title!");
    return;
  }

  try {
    const response = await fetch(
      `https://api.collectapi.com/imdb/imdbSearchByName?query=${query}`,
      {
        method: "GET",
        headers: {
          authorization: `apikey ${apiKey}`,
          "content-type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      resultsContainer.innerHTML = data.result
        .map(
          (movie) => `
            <div class="col-md-4 mb-3">
              <div class="card h-100">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                  <h5 class="card-title">${movie.Title}</h5>
                  <p class="card-text"><strong>Year:</strong> ${movie.Year}</p>
                  <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Ver Filme</a>
                </div>
              </div>
            </div>
          `
        )
        .join("");
    } else {
      resultsContainer.innerHTML = `<div class="alert alert-danger">Não encontrado!</div>`;
    }
  } catch (error) {
    resultsContainer.innerHTML = `<div class="alert alert-danger">Problemas com Internet</div>`;
    console.error(error);
  }
});
