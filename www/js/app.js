// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
    root: '#app',
    id: 'io.framework7.ytsmovies',
    name: 'YTS Movies',
    theme: 'auto',
    routes: routes,
    cache: false,
    cacheDuration: 0,
    init: false,
    statusbar: {
        androidBackgroundColor: '#6ac045c9'
    },
    materialRipple: false,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
    url: '/'
});

var baseUrl = 'https://yts.am/api/v2/';
var isSingleSearch = false;
var isAdvanceSearch = false;

$$(document).on('page:init', '.page[data-name="home"]', function(e) {
    // app.statusbar.show();
    // app.dialog.alert('This mobile application is using YTS.AM API (Application Programming Interface) to work. If the API server is down or error, this app will not work properly.');
    latestMovies();

    $$('#latest').on('tab:show', function() {
        latestMovies();
    });

    $$('#rated').on('tab:show', function() {
        topRatedMovies();
    });
    $$('#download').on('tab:show', function() {
        topDownloadMovies();
    });
})

$$(document).on('page:init', '.page[data-name="quality"]', function(e) {
    sevenTwentyP();
    $$('#quality1').on('tab:show', function() {
        sevenTwentyP();
    });
    $$('#quality2').on('tab:show', function() {
        tenEightyP();
    });
    $$('#quality3').on('tab:show', function() {
        threeD();
    });

})


$$(document).on('page:init', '.page[data-name="moviedetails"]', function(e, page) {
    var movieID = (page.route.query.id);
    movieDetails(movieID);
    movieSuggestions(movieID);
})


$$(document).on('page:init', '.page[data-name="genre"]', function(e) {
    genreAction();
    $$('#genre').on('tab:show', function() {
        genreAction();
    });
    $$('#animation').on('tab:show', function() {
        genreAnimation();
    });
    $$('#comedy').on('tab:show', function() {
        genreComedy();
    });
    $$('#documentary').on('tab:show', function() {
        genreDocumentary();
    });
    $$('#family').on('tab:show', function() {
        genreFamily();
    });
    $$('#film-noi').on('tab:show', function() {
        genrefilmnoi();
    });
    $$('#horror').on('tab:show', function() {
        genreHorror();
    });
    $$('#musical').on('tab:show', function() {
        genreMusical();
    });
    $$('#romance').on('tab:show', function() {
        genreRomance();
    });
    $$('#sport').on('tab:show', function() {
        genreSport();
    });
    $$('#war').on('tab:show', function() {
        genreWar();
    });
    $$('#adventure').on('tab:show', function() {
        genreAdventure();
    });
    $$('#biography').on('tab:show', function() {
        genreBiography();
    });
    $$('#crime').on('tab:show', function() {
        genreCrime();
    });
    $$('#drama').on('tab:show', function() {
        genreDrama();
    });
    $$('#fantasy').on('tab:show', function() {
        genreFantasy();
    });
    $$('#history').on('tab:show', function() {
        genreHistory();
    });
    $$('#music').on('tab:show', function() {
        genreMusic();
    });
    $$('#mystery').on('tab:show', function() {
        genreMystery();
    });
    $$('#scifi').on('tab:show', function() {
        genreScifi();
    });
    $$('#thriller').on('tab:show', function() {
        genreThriller();
    });
    $$('#western').on('tab:show', function() {
        genreWestern();
    });
})

$$(document).on('page:init', '.page[data-name="search-results"]', function(e, page) {
    if (isSingleSearch == true) {
        var movieNameSearch = (page.route.query.moviename);

        isSingleSearch = false;
        $('#searh-result-category').html('Search for: ' + '<span style="font-style: italic;">' + movieNameSearch + '<span>');
        searchSingle(movieNameSearch);
    }

    if (isAdvanceSearch == true) {
        var movieQualitySearch = (page.route.query.movieQuality);
        var movieGenreSearch = (page.route.query.movieGenre);
        var movieRatingSearch = (page.route.query.movieRating);
        var movieSortbySearch = (page.route.query.movieSortby);

        // app.dialog.alert(movieQualitySearch + movieGenreSearch + movieRatingSearch + movieSortbySearch);
        isAdvanceSearch = false;
        var advanceCat = '<p>' + 'Quality: ' + '<span class="advanccatlabel">' + movieQualitySearch + '</span>' + '<p>';
        advanceCat += '<p>' + 'Genre: ' + '<span class="advanccatlabel">' + movieGenreSearch + '</span>' + '<p>';
        advanceCat += '<p>' + 'Rating: ' + '<span class="advanccatlabel">' + movieRatingSearch + '</span>' + '<p>';
        advanceCat += '<p>' + 'Sort By: ' + '<span class="advanccatlabel">' + movieSortbySearch + '</span>' + '<p>';


        $('#searh-result-category').append(advanceCat);
        searchAdvanced(movieQualitySearch, movieGenreSearch, movieRatingSearch, movieSortbySearch);
    }
})

$$(document).on('page:init', '.page[data-name="search"]', function(e) {
    $$('#search-movie-name').on('click', function(e) {
        var movieName = $$('#movie-name-search-input').val();
        if (movieName == "") {
            var notificationWithButton = app.notification.create({
                title: 'YTS Movies',
                subtitle: 'Search field cannot be empty',
                closeButton: true,
                closeTimeout: 5000
            });
            notificationWithButton.open();
        } else {
            isSingleSearch = true;
            mainView.router.navigate('/search-results/?moviename=' + movieName + '');
        }
        // app.dialog.alert(movieName);
    });

    $$('#search-movie-advance').on('click', function(e) {
        isAdvanceSearch = true;
        var movieQuality = $$('#quality').val();
        var movieGenre = $$('#genre').val();
        var movieRating = $$('#rating').val();
        var movieSortby = $$('#sortby').val();
        // app.dialog.alert(movieQuality + movieGenre + movieRating + movieSortby);
        mainView.router.navigate('/search-results/?movieQuality=' + movieQuality + '&movieGenre=' + movieGenre + '&movieRating=' + movieRating + '&movieSortby=' + movieSortby + '');
    });



})

var toggle = app.toggle.create({
    el: '.toggle',
    on: {
        change: function() {
            var toggle = app.toggle.get('.toggle');

            if (toggle.checked) {
                $$('body').addClass('theme-dark');
                localStorage.setItem('color-theme-dark', 'theme-dark');
            } else {
                $$('body').removeClass('theme-dark');
                localStorage.removeItem('color-theme-dark');
            }
        }
    }
})


$$('#side-menu li > a').on('click', function(e) {
    var panel = app.panel.create({
        el: '.panel-left',
    })
    panel.close();
});

var themecolor_select = app.actions.create({
    grid: true,
    buttons: [
        [{
                text: 'Select Color',
                label: true
            },
            {
                text: 'Red',
                icon: '<button class="button button-fill button-round button-raised color-red"></button>',
                onClick: function() {
                    $('body').removeClass();
                    $$('body').addClass('color-theme-red');
                    localStorage.setItem('color-theme', 'color-theme-red');
                    localStorage.setItem('color-theme-form', 'color-red');
                }
            },
            {
                text: 'Green',
                icon: '<button class="button button-fill button-round button-raised color-green"></button>',
                onClick: function() {
                    $('body').removeClass();
                    $$('body').addClass('color-theme-green');
                    localStorage.setItem('color-theme', 'color-theme-green');
                    localStorage.setItem('color-theme-form', 'color-green');
                }
            },
            {
                text: 'Blue',
                icon: '<button class="button button-fill button-round button-raised color-blue"></button>',
                onClick: function() {
                    $('body').removeClass();
                    $$('body').addClass('color-theme-blue');
                    localStorage.setItem('color-theme', 'color-theme-blue');
                    localStorage.setItem('color-theme-form', 'color-blue');
                }
            },
        ],
        [{
                text: 'Pink',
                icon: '<button class="button button-fill button-round button-raised color-pink"></button>',
                onClick: function() {
                    $('body').removeClass();
                    $$('body').addClass('color-theme-pink');
                    localStorage.setItem('color-theme', 'color-theme-pink');
                    localStorage.setItem('color-theme-form', 'color-pink');
                }
            },
            {
                text: 'Black',
                icon: '<button class="button button-fill button-round button-raised color-black"></button>',
                onClick: function() {
                    $('body').removeClass();
                    $$('body').addClass('color-theme-black');
                    localStorage.setItem('color-theme', 'color-theme-black');
                    localStorage.setItem('color-theme-form', 'color-black');
                }
            },
            {
                text: 'Orange',
                icon: '<button class="button button-fill button-round button-raised color-orange"></button>',
                onClick: function() {
                    $('body').removeClass();
                    $$('body').addClass('color-theme-orange');
                    localStorage.setItem('color-theme', 'color-theme-orange');
                    localStorage.setItem('color-theme-form', 'color-orange');
                }
            },
        ]
    ]
});

$$('#theme-color').on('click', function() {
    themecolor_select.open();
});


var currentTheme = localStorage.getItem('color-theme');
if (currentTheme == null) {
    currentTheme = "color-theme-green";
}
$('body').removeClass();
$$('body').addClass(currentTheme);

var currentThemeDark = localStorage.getItem('color-theme-dark');
if (currentThemeDark == null) {
    currentThemeDark = "theme-light";
    $$('#theme-dark-checkbox').prop('checked', false);
} else {
    $$('#theme-dark-checkbox').prop('checked', true);
}
$$('body').addClass(currentThemeDark);




app.init();

function alertServerError() {
    // app.dialog.alert('Cannot connect to server. Please try again.');
}

// INDEX
function latestMovies() {
    $.ajax({
        url: baseUrl + 'list_movies.json',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        // console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var latestItemHolder = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#latest-movies').append(latestItemHolder);
        });
    });
}

function topRatedMovies() {
    $.ajax({
        url: baseUrl + 'list_movies.json?minimum_rating=9',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        // console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var ratedItemHolder = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#rated-movies').append(ratedItemHolder);
        });
    });
}

function topDownloadMovies() {
    $.ajax({
        url: baseUrl + 'list_movies.json?sort_by=download_count',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        // console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var downloadItemHolder = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#download-movies').append(downloadItemHolder);
        });
    });
}

// QUALIRY
function sevenTwentyP() {
    $.ajax({
        url: baseUrl + 'list_movies.json?quality=720p',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        // console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var quality1moviesHolder = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#quality1-movies').append(quality1moviesHolder);
        });
    });
}

function tenEightyP() {
    $.ajax({
        url: baseUrl + 'list_movies.json?quality=1080p',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        // console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var quality2moviesHolder = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#quality2-movies').append(quality2moviesHolder);
        });
    });
}

function threeD() {
    $.ajax({
        url: baseUrl + 'list_movies.json?quality=3D',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        // console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var quality3moviesHolder = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#quality3-movies').append(quality3moviesHolder);
        });
    });
}


function movieSuggestions(id) {
    $.ajax({
        url: baseUrl + 'movie_suggestions.json?movie_id=' + id + '',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data.movies);
        $.each(data.data.movies, function(key, val) {
            var movieSuggestionsItem = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#movie-suggestions-holder').append(movieSuggestionsItem);
        });
    });
}

function movieDetails(movieID) {
    $.ajax({
        url: baseUrl + 'movie_details.json?movie_id=' + movieID + '&with_images=true&with_cast=true',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data.movie.mpa_rating);

        $$('.movie-title').text(data.data.movie.title);
        var movieDetailsHolder = '<div class="card demo-card-header-pic">' +
            '<div style="background-image:url(' + data.data.movie.large_cover_image + ')" class="card-header align-items-flex-end">' + data.data.movie.title + '</div>' +
            '<div class="card-content card-content-padding">' +
            '<p>' + data.data.movie.description_full + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="block-title">Cast</div>' +
            '<div class="block block-strong" id="cast-holder">' +
            '</div>' +
            '<div class="block-title">Year</div>' +
            '<p class="block block-strong">' + data.data.movie.year + '</p>' +
            '<div class="block-title">Language</div>' +
            '<p class="block block-strong">' + data.data.movie.language + '</p>' +
            '<div class="block-title">MPA Rating</div>' +
            '<p class="block block-strong">' + data.data.movie.mpa_rating + '</p>' +
            '</div>' +
            '<div class="block-title">MDB Rating</div>' +
            '<p class="block block-strong">' + data.data.movie.rating + '</p>' +
            '</div>' +
            '<div class="block-title">Genres</div>' +
            '<div class="block block-strong" id="genre-holder">' +
            '</div>' +
            '<div class="block-title">Torrent Download</div>' +
            '<div class="block" id="download-holder">' +
            '</div>' +
            '</div>';
        $$('#movide-details-holder').append(movieDetailsHolder);

        // console.log(data.data.movie.cast);

        var currentThemeForm = localStorage.getItem('color-theme-form');
        if (currentThemeForm == null) {
            currentThemeForm = "color-green";
        }

        $.each(data.data.movie.cast, function(key, val) {
            var movieCasts = '<div class="chip ' + currentThemeForm + '">' +
                ' <div class="chip-media"><img src="' + val.url_small_image + '"/></div>' +
                '<div class="chip-label">' + val.name + '</div>';
            $$('#cast-holder').append(movieCasts);
        });

        // console.log(data.data.movie.genres);
        $.each(data.data.movie.genres, function(key, val) {
            var moviegenres = '<div class="chip ' + currentThemeForm + '">' +
                '<div class="chip-label">' + val + '</div>';
            $$('#genre-holder').append(moviegenres);
        });

        // console.log(data.data.movie.torrents);
        $.each(data.data.movie.torrents, function(key, val) {
            var torrentList = '<div class="card demo-card-header-pic">' +
                '<div class="card-content card-content-padding">' +
                '<p class="date">Quality: ' + val.quality + '</p>' +
                '<p>Seeds: ' + val.seeds + '</p>' +
                '<p>Peers: ' + val.peers + '</p>' +
                '<p>Size: ' + val.size + '</p>' +
                '</div>' +
                '<div class="card-footer"><a class="link external" href="' + val.url + '" class="link">DOWNLOAD</a></div>' +
                '</div>';
            $$('#download-holder').append(torrentList);
        });
    });
}


function searchSingle(movieNameSearch) {
    $.ajax({
        url: baseUrl + 'list_movies.json?query_term=' + movieNameSearch + '',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $("#advancedsearch-movies").hide();
        if (data.data.movie_count > 0) {
            $.each(data.data.movies, function(key, val) {
                var simpleSearchHolder = '<li>' +
                    '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                    '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title-row">' +
                    '<div class="item-title">' + val.title_english + '</div>' +
                    '</div>' +
                    '<div class="item-subtitle">' + val.year + '</div>' +
                    '<div class="item-text">' + val.description_full + '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>';
                $$('#simplesearch-movies').append(simpleSearchHolder);
            });
        } else {
            $$('#simplesearch-movies').append("<div class='block'><p style='text-align: center;padding: 10px;'>No result found</p></div>");
        }

    });
}

function searchAdvanced(movieQualitySearch, movieGenreSearch, movieRatingSearch, movieSortbySearch) {
    $.ajax({
        url: baseUrl + 'list_movies.json?quality=' + movieQualitySearch + '&genre=' + movieGenreSearch + '&minimum_rating=' + movieRatingSearch + '&sort_by=' + movieSortbySearch + '',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $("#simplesearch-movies").hide();
        if (data.data.movie_count > 0) {
            $.each(data.data.movies, function(key, val) {
                var advancedSearchHolder = '<li>' +
                    '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                    '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title-row">' +
                    '<div class="item-title">' + val.title_english + '</div>' +
                    '</div>' +
                    '<div class="item-subtitle">' + val.year + '</div>' +
                    '<div class="item-text">' + val.description_full + '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>';
                $$('#advancedsearch-movies').append(advancedSearchHolder);
            });
        } else {

            $$('#advancedsearch-movies').append("<div class='block'><p style='text-align: center;padding: 10px;'>No result found</p></div>");
        }

    });
}



// GENRE
function genreAction() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=action',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreAction = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#action-movies').append(genreAction);
        });
    });
}

function genreAnimation() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=animation',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreAnimation = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#animation-movies').append(genreAnimation);
        });
    });
}

function genreComedy() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=comedy',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreComedy = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#comedy-movies').append(genreComedy);
        });
    });
}

function genreDocumentary() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=documentary',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreDocumentary = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#documentary-movies').append(genreDocumentary);
        });
    });
}

function genreFamily() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=family',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreFamily = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#family-movies').append(genreFamily);
        });
    });
}

function genrefilmnoi() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=filmnoi',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreFilmnoi = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#film-noi-movies').append(genreFilmnoi);
        });
    });
}

function genreHorror() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=horror',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreHorror = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#horror-movies').append(genreHorror);
        });
    });
}

function genreMusical() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=musical',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreMusical = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#musical-movies').append(genreMusical);
        });
    });
}

function genreRomance() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=romance',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreRomance = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#romance-movies').append(genreRomance);
        });
    });
}

function genreSport() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=sport',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreSport = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#sport-movies').append(genreSport);
        });
    });
}

function genreWar() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=war',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreWar = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#war-movies').append(genreWar);
        });
    });
}

function genreAdventure() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=adventure',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreAdventure = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#adventure-movies').append(genreAdventure);
        });
    });
}

function genreBiography() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=biography',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreBiography = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#biography-movies').append(genreBiography);
        });
    });
}

function genreCrime() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=crime',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreCrime = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#crime-movies').append(genreCrime);
        });
    });
}

function genreDrama() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=drama',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreDrama = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#drama-movies').append(genreDrama);
        });
    });
}

function genreFantasy() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=fantasy',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreFantasy = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#fantasy-movies').append(genreFantasy);
        });
    });
}

function genreHistory() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=history',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreHistory = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#history-movies').append(genreHistory);
        });
    });
}

function genreMusic() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=music',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreMusic = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#music-movies').append(genreMusic);
        });
    });
}

function genreMystery() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=mystery',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreMystery = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#mystery-movies').append(genreMystery);
        });
    });
}

function genreScifi() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=scifi',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreScifi = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#scifi-movies').append(genreScifi);
        });
    });
}


function genreThriller() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=thriller',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreThriller = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#thriller-movies').append(genreThriller);
        });
    });
}


function genreWestern() {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=western',
        type: "GET",
    }).fail(function(data) {
        console.log('error:' + data);
        alertServerError();
    }).done(function(data) {
        console.log(data.data);
        $.each(data.data.movies, function(key, val) {
            var genreWestern = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$('#western-movies').append(genreWestern);
        });
    });
}