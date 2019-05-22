// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
    root: '#app',
    id: 'io.davemanuel.ytsmovies',
    name: 'YTS Movies',
    theme: 'md',
    routes: routes,
    cache: false,
    cacheDuration: 0,
    init: false,
    materialRipple: false,
    lazy: {
        threshold: 50,
        sequential: false,
    },
});


// Init/Create main view
var mainView = app.views.create('.view-main', {
    url: '/'
});

// GLOBAL VARIABLES
var baseUrl = 'https://yts.am/api/v2/';
var isSingleSearch = false;
var isAdvanceSearch = false;
var favorites = [];


$$(document).on('page:init', '.page[data-name="home"]', function (e) {
    app.infiniteScroll.create(".infinite-scroll-content-latest-movies");
    app.infiniteScroll.create(".infinite-scroll-content-rated-movies");
    app.infiniteScroll.create(".infinite-scroll-content-download-movies");
    homeMovies("#latest");

    // INIFINITE SCROLL LATEST
    var scrollInfiniteCounterLatest = 2;
    $$('.infinite-scroll-content-latest-movies').on('infinite', function () {
        infiniteScroll("latest", scrollInfiniteCounterLatest, false);
        scrollInfiniteCounterLatest++;
    });

    // TABS HOME
    $$('#latest').on('tab:show', function () {
        homeMovies("#latest");
        // INIFINITE SCROLL LATEST
        var scrollInfiniteCounterLatest = 2;
        $$('.infinite-scroll-content-latest-movies').on('infinite', function () {
            infiniteScroll("latest", scrollInfiniteCounterLatest, false);
            scrollInfiniteCounterLatest++;
        });
    });

    $$('#rated').on('tab:show', function () {
        homeMovies("#rated");
        // INIFINITE SCROLL RATED
        var scrollInfiniteCounterRated = 2;
        $$('.infinite-scroll-content-rated-movies').on('infinite', function () {
            infiniteScroll("rated", scrollInfiniteCounterRated, false);
            scrollInfiniteCounterRated++;
        });
    });

    $$('#download').on('tab:show', function () {
        homeMovies("#download");
        // INIFINITE SCROLL DOWNLOAD
        var scrollInfiniteCounterDownload = 2;
        $$('.infinite-scroll-content-download-movies').on('infinite', function () {
            infiniteScroll("download", scrollInfiniteCounterDownload, false);
            scrollInfiniteCounterDownload++;
        });
    });
});

$$(document).on('page:init', '.page[data-name="quality"]', function (e) {
    app.infiniteScroll.create(".infinite-scroll-content-quality1-movies");
    app.infiniteScroll.create(".infinite-scroll-content-quality2-movies");
    app.infiniteScroll.create(".infinite-scroll-content-quality3-movies");
    qualityMovies("#quality1");
    var scrollInfiniteCounterQuality1 = 2;
    $$('.infinite-scroll-content-quality1-movies').on('infinite', function () {
        infiniteScroll("quality1", scrollInfiniteCounterQuality1, false);
        scrollInfiniteCounterQuality1++;
    });

    $$('#quality1').on('tab:show', function () {
        qualityMovies("#quality1");
        // INIFINITE SCROLL QUALITY 1
        var scrollInfiniteCounterQuality1 = 2;
        $$('.infinite-scroll-content-quality1-movies').on('infinite', function () {
            infiniteScroll("quality1", scrollInfiniteCounterQuality1, false);
            scrollInfiniteCounterQuality1++;
        });
    });

    $$('#quality2').on('tab:show', function () {
        qualityMovies("#quality2");
        var scrollInfiniteCounterQuality2 = 2;
        $$('.infinite-scroll-content-quality2-movies').on('infinite', function () {
            infiniteScroll("quality2", scrollInfiniteCounterQuality2, false);
            scrollInfiniteCounterQuality2++;
        });
    });

    $$('#quality3').on('tab:show', function () {
        qualityMovies("#quality3");
        var scrollInfiniteCounterQuality3 = 2;
        $$('.infinite-scroll-content-quality3-movies').on('infinite', function () {
            infiniteScroll("quality3", scrollInfiniteCounterQuality3, false);
            scrollInfiniteCounterQuality3++;
        });
    });
});

$$(document).on('page:init', '.page[data-name="genre"]', function (e) {
    app.infiniteScroll.create(".infinite-scroll-content-action-movies");
    app.infiniteScroll.create(".infinite-scroll-content-animation-movies");
    app.infiniteScroll.create(".infinite-scroll-content-comedy-movies");
    app.infiniteScroll.create(".infinite-scroll-content-documentary-movies");
    app.infiniteScroll.create(".infinite-scroll-content-family-movies");
    app.infiniteScroll.create(".infinite-scroll-content-film-noi-movies");
    app.infiniteScroll.create(".infinite-scroll-content-horror-movies");
    app.infiniteScroll.create(".infinite-scroll-content-musical-movies");
    app.infiniteScroll.create(".infinite-scroll-content-romance-movies");
    app.infiniteScroll.create(".infinite-scroll-content-sport-movies");
    app.infiniteScroll.create(".infinite-scroll-content-war-movies");
    app.infiniteScroll.create(".infinite-scroll-content-adventure-movies");
    app.infiniteScroll.create(".infinite-scroll-content-biography-movies");
    app.infiniteScroll.create(".infinite-scroll-content-crime-movies");
    app.infiniteScroll.create(".infinite-scroll-content-drama-movies");
    app.infiniteScroll.create(".infinite-scroll-content-fantasy-movies");
    app.infiniteScroll.create(".infinite-scroll-content-history-movies");
    app.infiniteScroll.create(".infinite-scroll-content-music-movies");
    app.infiniteScroll.create(".infinite-scroll-content-mystery-movies");
    app.infiniteScroll.create(".infinite-scroll-content-scifi-movies");
    app.infiniteScroll.create(".infinite-scroll-content-thriller-movies");
    app.infiniteScroll.create(".infinite-scroll-content-western-movies");

    genreMovies("action");
    var scrollInfiniteCounterAction = 2;
    $$('.infinite-scroll-content-action-movies').on('infinite', function () {
        infiniteScroll("action", scrollInfiniteCounterAction, true);
        scrollInfiniteCounterAction++;
    });

    $$('#action').on('tab:show', function () {
        genreMovies("action");
        var scrollInfiniteCounterAction = 2;
        $$('.infinite-scroll-content-action-movies').on('infinite', function () {
            infiniteScroll("action", scrollInfiniteCounterAction, true);
            scrollInfiniteCounterAction++;
        });
    });

    $$('#animation').on('tab:show', function () {
        genreMovies("animation");
        var scrollInfiniteCounterAnimation = 2;
        $$('.infinite-scroll-content-animation-movies').on('infinite', function () {
            infiniteScroll("action", scrollInfiniteCounterAnimation, true);
            scrollInfiniteCounterAnimation++;
        });
    });

    $$('#comedy').on('tab:show', function () {
        genreMovies("comedy");
        var scrollInfiniteCounterComedy = 2;
        $$('.infinite-scroll-content-comedy-movies').on('infinite', function () {
            infiniteScroll("comedy", scrollInfiniteCounterComedy, true);
            scrollInfiniteCounterComedy++;
        });
    });

    $$('#documentary').on('tab:show', function () {
        genreMovies("documentary");
        var scrollInfiniteCounterDocu = 2;
        $$('.infinite-scroll-content-documentary-movies').on('infinite', function () {
            infiniteScroll("documentary", scrollInfiniteCounterDocu, true);
            scrollInfiniteCounterDocu++;
        });
    });

    $$('#family').on('tab:show', function () {
        genreMovies("family");
        var scrollInfiniteCounterFamily = 2;
        $$('.infinite-scroll-content-family-movies').on('infinite', function () {
            infiniteScroll("family", scrollInfiniteCounterFamily, true);
            scrollInfiniteCounterFamily++;
        });
    });

    $$('#film-noi').on('tab:show', function () {
        genreMovies("film-noi");
        var scrollInfiniteCounterFilmNoi = 2;
        $$('.infinite-scroll-content-film-noi-movies').on('infinite', function () {
            infiniteScroll("film-noi", scrollInfiniteCounterFilmNoi, true);
            scrollInfiniteCounterFilmNoi++;
        });
    });

    $$('#horror').on('tab:show', function () {
        genreMovies("horror");
        var scrollInfiniteCounterHorror = 2;
        $$('.infinite-scroll-content-horror-movies').on('infinite', function () {
            infiniteScroll("horror", scrollInfiniteCounterHorror, true);
            scrollInfiniteCounterHorror++;
        });
    });

    $$('#musical').on('tab:show', function () {
        genreMovies("musical");
        var scrollInfiniteCounterMusical = 2;
        $$('.infinite-scroll-content-musical-movies').on('infinite', function () {
            infiniteScroll("musical", scrollInfiniteCounterMusical, true);
            scrollInfiniteCounterMusical++;
        });
    });

    $$('#romance').on('tab:show', function () {
        genreMovies("romance");
        var scrollInfiniteCounterRomance = 2;
        $$('.infinite-scroll-content-romance-movies').on('infinite', function () {
            infiniteScroll("romance", scrollInfiniteCounterRomance, true);
            scrollInfiniteCounterRomance++;
        });
    });

    $$('#sport').on('tab:show', function () {
        genreMovies("sport");
        var scrollInfiniteCounterSport = 2;
        $$('.infinite-scroll-content-sport-movies').on('infinite', function () {
            infiniteScroll("sport", scrollInfiniteCounterSport, true);
            scrollInfiniteCounterSport++;
        });
    });

    $$('#war').on('tab:show', function () {
        genreMovies("war");
        var scrollInfiniteCounterWar = 2;
        $$('.infinite-scroll-content-war-movies').on('infinite', function () {
            infiniteScroll("war", scrollInfiniteCounterWar, true);
            scrollInfiniteCounterWar++;
        });
    });

    $$('#adventure').on('tab:show', function () {
        genreMovies("adventure");
        var scrollInfiniteCounterAdv = 2;
        $$('.infinite-scroll-content-adventure-movies').on('infinite', function () {
            infiniteScroll("adventure", scrollInfiniteCounterAdv, true);
            scrollInfiniteCounterAdv++;
        });
    });

    $$('#biography').on('tab:show', function () {
        genreMovies("biography");
        var scrollInfiniteCounterBio = 2;
        $$('.infinite-scroll-content-biography-movies').on('infinite', function () {
            infiniteScroll("biography", scrollInfiniteCounterBio, true);
            scrollInfiniteCounterBio++;
        });
    });

    $$('#crime').on('tab:show', function () {
        genreMovies("crime");
        var scrollInfiniteCounterCrime = 2;
        $$('.infinite-scroll-content-crime-movies').on('infinite', function () {
            infiniteScroll("crime", scrollInfiniteCounterCrime, true);
            scrollInfiniteCounterCrime++;
        });
    });

    $$('#drama').on('tab:show', function () {
        genreMovies("drama");
        var scrollInfiniteCounterDrama = 2;
        $$('.infinite-scroll-content-drama-movies').on('infinite', function () {
            infiniteScroll("drama", scrollInfiniteCounterDrama, true);
            scrollInfiniteCounterDrama++;
        });
    });

    $$('#fantasy').on('tab:show', function () {
        genreMovies("fantasy");
        var scrollInfiniteCounterFantasy = 2;
        $$('.infinite-scroll-content-fantasy-movies').on('infinite', function () {
            infiniteScroll("fantasy", scrollInfiniteCounterFantasy, true);
            scrollInfiniteCounterFantasy++;
        });
    });

    $$('#history').on('tab:show', function () {
        genreMovies("history");
        var scrollInfiniteCounterHistory = 2;
        $$('.infinite-scroll-content-history-movies').on('infinite', function () {
            infiniteScroll("history", scrollInfiniteCounterHistory, true);
            scrollInfiniteCounterHistory++;
        });
    });

    $$('#music').on('tab:show', function () {
        genreMovies("music");
        var scrollInfiniteCounterMusic = 2;
        $$('.infinite-scroll-content-music-movies').on('infinite', function () {
            infiniteScroll("music", scrollInfiniteCounterMusic, true);
            scrollInfiniteCounterMusic++;
        });
    });

    $$('#mystery').on('tab:show', function () {
        genreMovies("mystery");
        var scrollInfiniteCounterMystery = 2;
        $$('.infinite-scroll-content-mystery-movies').on('infinite', function () {
            infiniteScroll("mystery", scrollInfiniteCounterMystery, true);
            scrollInfiniteCounterMystery++;
        });
    });

    $$('#scifi').on('tab:show', function () {
        genreMovies("scifi");
        var scrollInfiniteCounterScifi = 2;
        $$('.infinite-scroll-content-scifi-movies').on('infinite', function () {
            infiniteScroll("scifi", scrollInfiniteCounterScifi, true);
            scrollInfiniteCounterScifi++;
        });
    });

    $$('#thriller').on('tab:show', function () {
        genreMovies("thriller");
        var scrollInfiniteCounterThriller = 2;
        $$('.infinite-scroll-content-thriller-movies').on('infinite', function () {
            infiniteScroll("thriller", scrollInfiniteCounterThriller, true);
            scrollInfiniteCounterThriller++;
        });
    });

    $$('#western').on('tab:show', function () {
        genreMovies("western");
        var scrollInfiniteCounterWestern = 2;
        $$('.infinite-scroll-content-western-movies').on('infinite', function () {
            infiniteScroll("western", scrollInfiniteCounterWestern, true);
            scrollInfiniteCounterWestern++;
        });
    });
});

$$(document).on('page:init', '.page[data-name="favorites"]', function (e, page) {

    var getFavorite = localStorage.getItem('favorites');
    var getFavoriteParse = JSON.parse(getFavorite);
    console.log(getFavoriteParse);
    if (getFavoriteParse == null) {
        $$("#favorite-movies-wrapper").prepend('<p class="text-center">You do not have favorites yet</p>');
        return false;
    }
    $.each(getFavoriteParse, function (key, val) {
        $.ajax({
            url: baseUrl + 'movie_details.json?movie_id=' + val + '&with_images=true&with_cast=true',
            type: "GET",
        }).fail(function (data) {
            alertServerError();
        }).done(function (data) {
            var movieItem = '<li>' +
                '<a href="/moviedetails/?id=' + data.data.movie.id + '" class="item-link item-content">' +
                '<div class="item-media"><img class="lazy lazy-fade-in" data-src="' + data.data.movie.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + data.data.movie.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + data.data.movie.year + '</div>' +
                '<div class="item-text">' + data.data.movie.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            $$("#favorite-movies").append(movieItem);
            app.lazy.create("#favorite-movies");
        });
    });
});

$$(document).on('page:init', '.page[data-name="moviedetails"]', function (e, page) {
    $$("#movide-details-holder").html("");
    $$("#movie-suggestions-holder").html("");
    var movieID = page.route.query.id;
    movieDetails(movieID);
    movieSuggestions(movieID);

    $$('.js-favorite').on('click', function () {
        var movieID = $(this).data('id');
        if ($(this).find('i').text() == 'favorite_border') {
            addToFavorite(movieID);
            $(this).find('i').text('favorite');
        } else {
            removeToFavorite(movieID);
            $(this).find('i').text('favorite_border');
        }
    });
});

$$(document).on('page:init', '.page[data-name="search"]', function (e) {
    $$('#search-movie-name').on('click', function (e) {
        var movieName = $$('#movie-name-search-input').val();
        if (movieName == "") {
            var notificationWithButton = app.notification.create({
                title: 'YTS Movies',
                subtitle: 'Search field cannot be empty.',
                closeButton: true,
                closeTimeout: 5000
            });
            notificationWithButton.open();
        } else {
            isSingleSearch = true;
            mainView.router.navigate('/search-results/?moviename=' + movieName + '');
        }
    });

    $$('#search-movie-advance').on('click', function (e) {
        isAdvanceSearch = true;
        var movieQuality = $$('#quality').val();
        var movieGenre = $$('#genre').val();
        var movieRating = $$('#rating').val();
        var movieSortby = $$('#sortby').val();
        mainView.router.navigate('/search-results/?movieQuality=' + movieQuality + '&movieGenre=' + movieGenre + '&movieRating=' + movieRating + '&movieSortby=' + movieSortby + '');
    });
});

$$(document).on('page:init', '.page[data-name="search-results"]', function (e, page) {
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

        isAdvanceSearch = false;
        var advanceCat = '<p>' + 'Quality: ' + '<span class="advanccatlabel">' + movieQualitySearch + '</span>' + '<p>';
        advanceCat += '<p>' + 'Genre: ' + '<span class="advanccatlabel">' + movieGenreSearch + '</span>' + '<p>';
        advanceCat += '<p>' + 'Rating: ' + '<span class="advanccatlabel">' + movieRatingSearch + '</span>' + '<p>';
        advanceCat += '<p>' + 'Sort By: ' + '<span class="advanccatlabel">' + movieSortbySearch + '</span>' + '<p>';

        $('#searh-result-category').append(advanceCat);
        searchAdvanced(movieQualitySearch, movieGenreSearch, movieRatingSearch, movieSortbySearch);
    }
});

$$(document).on('page:init', '.page[data-name="credits"]', function (e, page) {
    var currentTheme = localStorage.getItem('color-theme');
    var bgColorTheme;

    if (currentTheme == "color-theme-orange") {
        bgColorTheme = "#c66900";
    } else if (currentTheme == "color-theme-gray") {
        bgColorTheme = "#9e9e9e";
    } else if (currentTheme == "color-theme-pink") {
        bgColorTheme = "#b0003a";
    } else if (currentTheme == "color-theme-blue") {
        bgColorTheme = "#0069c0";
    } else if (currentTheme == "color-theme-green") {
        bgColorTheme = "#087f23";
    } else if (currentTheme == "color-theme-red") {
        bgColorTheme = "#ba000d";
    } else {
        bgColorTheme = "#087f23";
    }
    $$('.f7-link-web').on('click', function () {
        var f7 = cordova.InAppBrowser.open('https://framework7.io/', '_blank', 'location=yes,toolbarcolor=' + bgColorTheme + ',navigationbuttoncolor=#FFFFFF,closebuttoncolor=#FFFFFF');
        f7.addEventListener('exit', loadExitCallBack);
    });

    $$('.yts-link-web').on('click', function () {
        var yts = cordova.InAppBrowser.open('https://yts.am/api', '_blank', 'location=yes,toolbarcolor=' + bgColorTheme + ',navigationbuttoncolor=#FFFFFF,closebuttoncolor=#FFFFFF');
        yts.addEventListener('exit', loadExitCallBack);
    });

    function loadExitCallBack(params) {
        mainView.router.navigate('/');
    }
});

var toggle = app.toggle.create({
    el: '.toggle',
    on: {
        change: function () {
            var toggle = app.toggle.get('.toggle');

            if (toggle.checked) {
                $$('body').removeClass('theme-light');
                $$('body').addClass('theme-dark');
                localStorage.setItem('color-theme-dark', 'theme-dark');
            } else {
                $$('body').removeClass('theme-dark');
                $$('body').addClass('theme-light');
                localStorage.removeItem('color-theme-dark');
            }
        }
    }
});

$$('#side-menu li > a').on('click', function (e) {
    var panel = app.panel.create({
        el: '.panel-left',
    })
    panel.close();
});

var themecolor_select = app.actions.create({
    grid: true,
    buttons: [
        [{
                text: 'Select Theme Color',
                label: true
            },
            {
                text: 'Red',
                icon: '<button class="button button-fill button-round button-raised color-red"></button>',
                onClick: function () {
                    statusbarColor("red", "#ba000d");
                }
            },
            {
                text: 'Green',
                icon: '<button class="button button-fill button-round button-raised color-green"></button>',
                onClick: function () {
                    statusbarColor("green", "#087f23");
                }
            },
            {
                text: 'Blue',
                icon: '<button class="button button-fill button-round button-raised color-blue"></button>',
                onClick: function () {
                    statusbarColor("blue", "#0069c0");
                }
            },
        ],
        [{
                text: 'Pink',
                icon: '<button class="button button-fill button-round button-raised color-pink"></button>',
                onClick: function () {
                    statusbarColor("pink", "#b0003a");
                }
            },
            {
                text: 'Gray',
                icon: '<button class="button button-fill button-round button-raised color-gray"></button>',
                onClick: function () {
                    statusbarColor("gray", "#707070");
                }
            },
            {
                text: 'Orange',
                icon: '<button class="button button-fill button-round button-raised color-orange"></button>',
                onClick: function () {
                    statusbarColor("orange", "#c66900");
                }
            },
        ]
    ]
});

$$('#theme-color').on('click', function () {
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
    app.dialog.alert('Cannot connect to server. Please try again later.');
}

function isDarkTheme() {
    var isDarkThemeEnabled = localStorage.getItem('color-theme-dark');
    if (isDarkThemeEnabled == "theme-dark") {
        $$('body').addClass('theme-dark');
    }
}

// INDEX
function homeMovies(type) {

    var urlType;

    if (type == "#latest") {
        urlType = baseUrl + 'list_movies.json';
    } else if (type == "#rated") {
        urlType = baseUrl + 'list_movies.json?minimum_rating=9';
    } else if (type == "#download") {
        urlType = baseUrl + 'list_movies.json?sort_by=download_count';
    }

    $.ajax({
        url: urlType,
        type: "GET",
    }).fail(function (data) {
        alertServerError();
    }).done(function (data) {
        ;
        $.each(data.data.movies, function (key, val) {
            var movieItem = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img class="lazy lazy-fade-in" data-src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            app.lazy.create(type + "-movies");
            $$(type + "-movies").append(movieItem);
        });
    });
}

// QUALITY
function qualityMovies(quality) {

    var qualityURL;

    if (quality == "#quality1") {
        qualityURL = baseUrl + 'list_movies.json?quality=720p';
    } else if (quality == "#quality2") {
        qualityURL = baseUrl + 'list_movies.json?quality=1080p';
    } else if (quality == "#quality3") {
        qualityURL = baseUrl + 'list_movies.json?quality=3D';
    }
    $.ajax({
        url: qualityURL,
        type: "GET",
    }).fail(function (data) {
        alertServerError();
    }).done(function (data) {
        $.each(data.data.movies, function (key, val) {
            var movieItem = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img class="lazy lazy-fade-in" data-src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            app.lazy.create(quality + "-movies");
            $$(quality + "-movies").append(movieItem);
        });
    });
}

// GENRE
function genreMovies(genre) {
    $.ajax({
        url: baseUrl + 'list_movies.json?genre=' + genre + '',
        type: "GET",
    }).fail(function (data) {
        alertServerError();
    }).done(function (data) {
        $.each(data.data.movies, function (key, val) {
            var movieItem = '<li>' +
                '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                '<div class="item-media"><img class="lazy lazy-fade-in" data-src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            app.lazy.create("#" + genre + "-movies");
            $$("#" + genre + "-movies").append(movieItem);
        });
    });
}

// MOVIE SUGGESTION
function movieSuggestions(id) {
    $.ajax({
        url: baseUrl + 'movie_suggestions.json?movie_id=' + id + '',
        type: "GET",
    }).fail(function (data) {
        alertServerError();
    }).done(function (data) {
        $.each(data.data.movies, function (key, val) {
            var movieSuggestionsItem = '<li>' +
                '<a href="#" data-id="' + val.id + '" class="item-link item-content movieSuggestion">' +
                '<div class="item-media"><img class="lazy lazy-fade-in" data-src="' + val.medium_cover_image + '" width="80px"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + val.title_english + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + val.year + '</div>' +
                '<div class="item-text">' + val.description_full + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
            app.lazy.create("#movie-suggestions-holder");
            $$('#movie-suggestions-holder').append(movieSuggestionsItem);
        });
        $$('.movieSuggestion').on('click', function () {
            var movieSuggestionID = $(this).attr("data-id");
            $$("#movide-details-holder").html("");
            $$("#movie-suggestions-holder").html("");
            movieDetails(movieSuggestionID);
            movieSuggestions(movieSuggestionID);
        });

    });
}

// MOVIE DETAILS
function movieDetails(movieID) {
    $.ajax({
        url: baseUrl + 'movie_details.json?movie_id=' + movieID + '&with_images=true&with_cast=true',
        type: "GET",
    }).fail(function (data) {
        alertServerError();
    }).done(function (data) {
        $$('.movie-title').text(data.data.movie.title);
        $('.js-favorite').attr('data-id', data.data.movie.id);

        var getFavorite = localStorage.getItem('favorites');
        var getFavoriteParse = JSON.parse(getFavorite);
        $.each(getFavoriteParse, function (key, val) {
            if (data.data.movie.id == val) {
                $('.js-favorite').find('i').text('favorite');
            }
        });


        var movieDetailsHolder = '<div class="card demo-card-header-pic">' +
            '<div data-background=' + data.data.movie.large_cover_image + ' class="card-header align-items-flex-end lazy lazy-fade-in"></div>' +
            '<div class="card-content card-content-padding">' +
            '<p style="font-weight: bold;">' + data.data.movie.title + '</p>' +
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
        app.lazy.create("#movide-details-holder");
        $$('#movide-details-holder').append(movieDetailsHolder);
        $$('div.lazy').trigger('lazy');

        var currentThemeForm = localStorage.getItem('color-theme-form');
        if (currentThemeForm == null) {
            currentThemeForm = "color-green";
        }

        $.each(data.data.movie.cast, function (key, val) {
            var img = val.url_small_image;

            if (img == "" || img == undefined) {
                img = "img/default.png";
            }


            var movieCasts = '<div class="chip ' + currentThemeForm + '">' +
                ' <div class="chip-media"><img src="' + img + '"/></div>' +
                '<div class="chip-label">' + val.name + '</div>';
            $$('#cast-holder').append(movieCasts);
        });

        $.each(data.data.movie.genres, function (key, val) {
            var moviegenres = '<div class="chip ' + currentThemeForm + '">' +
                '<div class="chip-label">' + val + '</div>';
            $$('#genre-holder').append(moviegenres);
        });

        $.each(data.data.movie.torrents, function (key, val) {
            var torrentList = '<div class="card demo-card-header-pic">' +
                '<div class="card-content card-content-padding">' +
                '<p class="date">Quality: ' + val.quality + '</p>' +
                '<p>Seeds: ' + val.seeds + '</p>' +
                '<p>Peers: ' + val.peers + '</p>' +
                '<p>Size: ' + val.size + '</p>' +
                '</div>' +
                '<div class="card-footer"><a class="torrent-download link external" href="' + val.url + '" class="link">DOWNLOAD</a></div>' +
                '</div>';
            $$('#download-holder').append(torrentList);
        });
        $$('.torrent-download').on('click', function () {
            var currentTheme = localStorage.getItem('color-theme');
            var bgColorTheme;

            if (currentTheme == "color-theme-orange") {
                bgColorTheme = "#c66900";
            } else if (currentTheme == "color-theme-gray") {
                bgColorTheme = "#9e9e9e";
            } else if (currentTheme == "color-theme-pink") {
                bgColorTheme = "#b0003a";
            } else if (currentTheme == "color-theme-blue") {
                bgColorTheme = "#0069c0";
            } else if (currentTheme == "color-theme-green") {
                bgColorTheme = "#087f23";
            } else if (currentTheme == "color-theme-red") {
                bgColorTheme = "#ba000d";
            } else {
                bgColorTheme = "#087f23";
            }
            // var link = $(this).attr("href");
            // var torrent = cordova.InAppBrowser.open(link, '_blank', 'location=yes,toolbarcolor=' + bgColorTheme + ',navigationbuttoncolor=#FFFFFF,closebuttoncolor=#FFFFFF');
            // torrent.addEventListener('exit', loadExitCallBack);
        });

        function loadExitCallBack(params) {
            mainView.router.navigate('/');
        }
    });
}

// SEARCH SINGLE
function searchSingle(movieNameSearch) {
    $.ajax({
        url: baseUrl + 'list_movies.json?query_term=' + movieNameSearch + '',
        type: "GET",
    }).fail(function (data) {
        alertServerError();
    }).done(function (data) {
        $("#advancedsearch-movies").hide();
        if (data.data.movie_count > 0) {
            $.each(data.data.movies, function (key, val) {
                var simpleSearchHolder = '<li>' +
                    '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                    '<div class="item-media"><img class="lazy lazy-fade-in" data-src="' + val.medium_cover_image + '" width="80px"/></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title-row">' +
                    '<div class="item-title">' + val.title_english + '</div>' +
                    '</div>' +
                    '<div class="item-subtitle">' + val.year + '</div>' +
                    '<div class="item-text">' + val.description_full + '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>';
                app.lazy.create("#simplesearch-movies");
                $$('#simplesearch-movies').append(simpleSearchHolder);
            });
        } else {
            $$('#simplesearch-movies').append("<div class='block'><p style='text-align: center;padding: 10px;'>No result found</p></div>");
        }

    });
}

// SEARCH ADVANCED
function searchAdvanced(movieQualitySearch, movieGenreSearch, movieRatingSearch, movieSortbySearch) {
    $.ajax({
        url: baseUrl + 'list_movies.json?quality=' + movieQualitySearch + '&genre=' + movieGenreSearch + '&minimum_rating=' + movieRatingSearch + '&sort_by=' + movieSortbySearch + '',
        type: "GET",
    }).fail(function (data) {
        alertServerError();
    }).done(function (data) {
        $("#simplesearch-movies").hide();
        if (data.data.movie_count > 0) {
            $.each(data.data.movies, function (key, val) {
                var advancedSearchHolder = '<li>' +
                    '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                    '<div class="item-media"><img class="lazy lazy-fade-in" data-src="' + val.medium_cover_image + '" width="80px"/></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title-row">' +
                    '<div class="item-title">' + val.title_english + '</div>' +
                    '</div>' +
                    '<div class="item-subtitle">' + val.year + '</div>' +
                    '<div class="item-text">' + val.description_full + '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>';
                app.lazy.create("#advancedsearch-movies");
                $$('#advancedsearch-movies').append(advancedSearchHolder);
            });
        } else {

            $$('#advancedsearch-movies').append("<div class='block'><p style='text-align: center;padding: 10px;'>No result found</p></div>");
        }

    });
}

// STATUS BAR COLOR
function statusbarColor(colorName, colorHex) {
    $('body').removeClass();
    $$('body').addClass('color-theme-' + colorName + '');
    localStorage.setItem('color-theme', 'color-theme-' + colorName + '');
    localStorage.setItem('color-theme-form', 'color-' + colorName + '');
    isDarkTheme();
    StatusBar.backgroundColorByHexString(colorHex);
    StatusBar.styleLightContent();
}

// INFINITE SCROLL
var allowInfinite = true;

function infiniteScroll(element, counter, flag) {
    var lastItemIndex = $$('#' + element + '-movies-wrapper ul li').length;
    var maxItems = 2000;

    var urlType;

    if (flag == false) {
        if (element == "latest") {
            urlType = baseUrl + 'list_movies.json?page=' + counter + '&limit=20';
        } else if (element == "rated") {
            urlType = baseUrl + 'list_movies.json?minimum_rating=9&page=' + counter + '&limit=20';
        } else if (element == "download") {
            urlType = baseUrl + 'list_movies.json?sort_by=download_count&page=' + counter + '&limit=20';
        } else if (element == "quality1") {
            urlType = baseUrl + 'list_movies.json?quality=720p&page=' + counter + '&limit=20';
        } else if (element == "quality2") {
            urlType = baseUrl + 'list_movies.json?quality=1080p&page=' + counter + '&limit=20';
        } else if (element == "quality3") {
            urlType = baseUrl + 'list_movies.json?quality=3D&page=' + counter + '&limit=20';
        }
    } else {
        urlType = baseUrl + 'list_movies.json?genre=' + element + '&page=' + counter + '&limit=20';
    }

    if (!allowInfinite) return;
    allowInfinite = false;
    setTimeout(function () {
        allowInfinite = true;

        if (lastItemIndex >= maxItems) {
            app.infiniteScroll.destroy('.infinite-scroll-content-' + element + '-movies');
            $$('.' + element + '-preloader').remove();
            return;
        }
        $.ajax({
            url: urlType,
            type: "GET",
        }).fail(function (data) {
            alertServerError();
        }).done(function (data) {
            $.each(data.data.movies, function (key, val) {
                var movieItem = '<li>' +
                    '<a href="/moviedetails/?id=' + val.id + '" class="item-link item-content">' +
                    '<div class="item-media"><img class="lazy lazy-fade-in" data-src="' + val.medium_cover_image + '" width="80px"/></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title-row">' +
                    '<div class="item-title">' + val.title_english + '</div>' +
                    '</div>' +
                    '<div class="item-subtitle">' + val.year + '</div>' +
                    '<div class="item-text">' + val.description_full + '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>';
                app.lazy.create('#' + element + "-movies");
                $$('#' + element + "-movies").append(movieItem);
            });
        });
        lastItemIndex = $$('#' + element + "-movies-wrapper ul li").length;
    }, 1000);
}

// ADD TO FAVORITE
function addToFavorite(id) {
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// REMOVE TO FAVORITEs
function removeToFavorite(id) {
    var index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}