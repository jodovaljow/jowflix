function carouselAdicionadosView() {
    this.idCarouselAdicionados = 'filmes-adicionados';
    this.filmesAdicionados = [];
    this.filterAdicionados = '';
    this.tiposAdicionados = [];

    this.filterMovies = function () {

        this.filterAdicionados = this.filter;
        this.loadMoviesFromStorage();
    }

    this.loadMoviesFromStorage = function () {

        this.filmesAdicionados = [];

        if (this.storageOk) {

            this.filmesAdicionados = JSON.parse(window.localStorage.getItem('movies'))
        }

        if (this.filterAdicionados) {

            this.filmesAdicionados = this.filmesAdicionados.filter(movie => movie.title.toLocaleLowerCase().includes(this.filterAdicionados.toLocaleLowerCase()))
        }

        this.tiposAdicionados = [...new Set(this.filmesAdicionados.map(movie => movie.titleType))]

        console.log(this.tiposAdicionados);


        this.renderMoviesFilter();
    }

    this.renderMoviesFilter = function () {

        this.renderMovies(this.idCarouselAdicionados, this.filmesAdicionados)
    }

    // todo: fix: render navbar
}

carouselAdicionadosView()