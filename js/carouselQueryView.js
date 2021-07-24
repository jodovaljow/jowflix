function carouselQueryView() {
    this.idCarouselQuery = 'filmes-buscados';
    this.filmesBuscados = [];
    this.filterBuscados = '';

    this.queryMovies = function () {

        this.filterBuscados = this.filter;
        this.filterAdicionados = '';

        this.filmesBuscados = [];

        if (this.filterBuscados) {

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

            xhr.addEventListener("readystatechange", (function (global_this) {

                if (this.readyState === this.DONE) {

                    var queryMoviesResult = JSON.parse(this.responseText);

                    global_this.filmesBuscados = queryMoviesResult.results.filter(queryMovie => !!queryMovie.image && !!queryMovie.image.url && (queryMovie.titleType == 'tvSeries' || queryMovie.titleType == 'tvMovie' || queryMovie.titleType == 'movie' || queryMovie.titleType == 'short'));

                    global_this.renderMoviesQuery(global_this.filmesBuscados)
                }
            }).bind(xhr, this));

            xhr.open("GET", "https://imdb8.p.rapidapi.com/title/find?q=" + this.filterBuscados);
            xhr.setRequestHeader("x-rapidapi-key", "69e646a011msh8bcfde21c4d374dp136168jsn326ef31bd536");
            xhr.setRequestHeader("x-rapidapi-host", "imdb8.p.rapidapi.com");

            xhr.send(null);
        }

        this.renderMoviesQuery(this.filmesBuscados)
    }

    this.renderMoviesQuery = function () {

        this.renderMovies(this.idCarouselQuery, this.filmesBuscados)
        this.startCarousel()
    }

    this.addMovie = function (idMovie) {

        const movie = this.filmesBuscados.find(filmeBuscado => filmeBuscado.id == idMovie);

        var movies = JSON.parse(window.localStorage.getItem('movies'));

        movies.push(movie);

        window.localStorage.setItem('movies', JSON.stringify(movies))

        this.loadMoviesFromStorage()
        this.renderMoviesQuery()
    }

    this.removeMovie = function (idMovie) {

        var movies = JSON.parse(window.localStorage.getItem('movies'))

        movies = movies.filter(movie => movie.id != idMovie)

        window.localStorage.setItem('movies', JSON.stringify(movies))

        this.loadMoviesFromStorage()
        this.renderMoviesQuery()
    }
}

carouselQueryView()