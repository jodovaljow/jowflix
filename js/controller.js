function controller() {

    this.storageOk = false;
    this.filter = '';

    this.onSearchChange = function () {

        const titleInput = document.getElementById('titleInput')

        this.filter = titleInput.value

        this.filterMovies()
    }

    this.refreshMovies = function () {

        this.loadMoviesFromStorage()
        this.renderMoviesFilter()
    }

    this.renderMovies = function (elementId, movies) {

        const filmesAdicionados = document.getElementById(elementId)

        var carousel = '<div class="owl-carousel owl-theme">';

        var items = '';

        movies.forEach(movie => {

            const htmlMovie = movieToHTML(movie);

            if (htmlMovie)
                items += '<div class="item">' + htmlMovie + '</div>';
        })

        carousel += items;

        carousel += '</div>';

        filmesAdicionados.innerHTML = carousel;

        $('.owl-carousel').owlCarousel({
            loop: false,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        })
    }

    this.hasMovie = function (movieCheck) {

        return this.filmesAdicionados.some(movie => movie.id == movieCheck.id)
    }

    this.movieToHTML = function (movie) {

        var movieHTML = '<div class="movie">';

        if (this.hasMovie(movie)) {

            movieHTML += '<button onclick="removeMovie(\'' + movie.id + '\')"><i class="fas fa-minus-square"></i></button>';
        }
        else {

            movieHTML += '<button onclick="addMovie(\'' + movie.id + '\')"><i class="fas fa-plus-square"></i></button>';
        }

        movieHTML += '<img class="box-filme" src="' + movie.image.url + '" alt=""></img>';

        movieHTML += '<p>' + movie.title + '</p>';

        movieHTML += '</div>';

        return movieHTML;
    }

    this.checkStorage = function () {

        if (typeof (Storage) !== "undefined") {

            this.storageOk = true

            // window.localStorage.clear()

            const storageEmpty = window.localStorage.length < 1;
            if (storageEmpty || !window.localStorage.getItem('movies')) {

                this.initStorage();
            }

            this.loadMoviesFromStorage()
        } else {

            console.log('Sorry! No Web Storage support..');
        }
    }

    this.initStorage = function () {

        const moviesInit = initValue

        window.localStorage.setItem('movies', JSON.stringify(moviesInit))
    }

    this.checkStorage()
}

controller()