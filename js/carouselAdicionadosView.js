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

        this.renderMoviesFilter();
    }

    this.renderMoviesFilter = function () {

        const divBaseAdicionados = document.getElementById(this.idCarouselAdicionados);

        divBaseAdicionados.innerHTML = ''

        this.tiposAdicionados.forEach(tipoAdicionado => {

            const idTipo = 'idTipo' + tipoAdicionado;

            divBaseAdicionados.innerHTML += '<div class="typeCarousel"><h2>' + this.showType(tipoAdicionado) + '</h2>';

            divBaseAdicionados.innerHTML += '<div id="' + idTipo + '"></div>';

            divBaseAdicionados.innerHTML += '</div>';

            this.renderMovies(idTipo, this.filmesAdicionados.filter(filme => filme.titleType == tipoAdicionado))
        })

        this.startCarousel()
    }
}

carouselAdicionadosView()