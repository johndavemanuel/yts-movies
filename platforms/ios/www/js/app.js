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
    vi: {
        placementId: 'pltWU1VaLaaSS34L1qN'
    }
});


// Init/Create main view
var mainView = app.views.create('.view-main', {
    url: '/'
});

// GLOBAL VARIABLES
var baseUrl = 'https://yts.am/api/v2/';
var isSingleSearch = false;
var isAdvanceSearch = false;
var prepairedAd;



$$(document).on('page:init', '.page[data-name="home"]', function(e) {
    app.infiniteScroll.create(".infinite-scroll-content-latest-movies");
    app.ptr.create(".ptr-content-latest-movies");

    // ADS
    if (!app.vi.sdkReady) {
        app.on('viSdkReady', function() {
            prepairedAd = app.vi.createAd({
                autoplay: false,
            });
        })
    } else {
        prepairedAd = app.vi.createAd({
            autoplay: false,
        });
    }

    latestMovies();

    // INIFINITE SCROLL LATEST
    var allowInfinite = true;
    var lastItemIndex = $$('#latest-movies-wrapper ul li').length;
    var maxItems = 2000;
    var itemsPerLoad = 20;
    var scrollInfiniteCounter = 2;

    $$('.infinite-scroll-content-latest-movies').on('infinite', function() {
        console.log("Infinite Scroll Latest");
        if (!allowInfinite) return;
        allowInfinite = false;
        setTimeout(function() {
            allowInfinite = true;

            if (lastItemIndex >= maxItems) {
                app.infiniteScroll.destroy('.infinite-scroll-content-latest-movies');
                $$('.infinite-scroll-preloader').remove();
                return;
            }
            $.ajax({
                url: baseUrl + 'list_movies.json?page=' + scrollInfiniteCounter + '&limit=20',
                type: "GET",
            }).fail(function(data) {
                console.log('error:' + data);
                alertServerError();
            }).done(function(data) {
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

            lastItemIndex = $$('#latest-movies-wrapper ul li').length;
            scrollInfiniteCounter++;
        }, 1000);
    });

    // PULL TO REFRESH LATEST
    $$('.ptr-content-latest-movies').on('ptr:refresh', function(e) {
        console.log("PTR Latest");
        $$('#latest-movies').html("");
        latestMovies();
        setTimeout(function() {
            app.ptr.done();
            alert("done");
        }, 2000);
    });

    // TABS HOME
    $$('#latest').on('tab:show', function() {
        app.infiniteScroll.create(".infinite-scroll-content-latest-movies");
        app.ptr.create(".ptr-content-latest-movies");

        latestMovies();

        // INIFINITE SCROLL LATEST
        var allowInfinite = true;
        var lastItemIndex = $$('#latest-movies-wrapper ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-latest-movies').on('infinite', function() {
            console.log("Infinite Scroll Latest");
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-latest-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
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

                lastItemIndex = $$('#latest-movies-wrapper ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });

        // PULL TO REFRESH LATEST
        $$('.ptr-content-latest-movies').on('ptr:refresh', function(e) {
            console.log("PTR Latest");
            $$('#latest-movies').html("");
            latestMovies();
            setTimeout(function() {
                app.ptr.done();
            }, 2000);
        });
    });

    $$('#rated').on('tab:show', function() {
        app.infiniteScroll.create(".infinite-scroll-content-rated-movies");
        app.ptr.create(".ptr-content-rated-movies");
        topRatedMovies();
        // INIFINITE SCROLL RATED
        var allowInfinite = true;
        var lastItemIndex = $$('#rated-movies-wrapper ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-rated-movies').on('infinite', function() {
            console.log("Infinite Scroll Rated");
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-rated-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json??minimum_rating=9&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
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

                lastItemIndex = $$('#rated-movies-wrapper ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });

        // PULL TO REFRESH RATED
        $$('.ptr-content-rated-movies').on('ptr:refresh', function(e) {
            console.log("PTR Rated");
            $$('#rated-movies').html("");
            topRatedMovies();
            setTimeout(function() {
                app.ptr.done();
            }, 2000);
        });
    });

    $$('#download').on('tab:show', function() {
        app.infiniteScroll.create(".infinite-scroll-content-download-movies");
        app.ptr.create(".ptr-content-download-movies");
        topDownloadMovies();
        // INIFINITE SCROLL DOWNLOAD
        var allowInfinite = true;
        var lastItemIndex = $$('#download-movies-wrapper ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-download-movies').on('infinite', function() {
            console.log("Infinite Scroll Download");
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-download-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json??sort_by=download_count&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
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

                lastItemIndex = $$('#download-movies-wrapper ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });

        // PULL TO REFRESH DOWNLOAD
        $$('.ptr-content-download-movies').on('ptr:refresh', function(e) {
            console.log("download PTR");
            $$('#download-movies').html("");
            topDownloadMovies();
            setTimeout(function() {
                app.ptr.done();
            }, 2000);
        });
    });
})

$$(document).on('page:init', '.page[data-name="quality"]', function(e) {
    app.infiniteScroll.create(".infinite-scroll-content-quality1-movies");
    app.ptr.create(".ptr-content-quality1-movies");


    sevenTwentyP();
    // INIFINITE SCROLL QUALITY 1
    var allowInfinite = true;
    var lastItemIndex = $$('#quality1-movies ul li').length;
    var maxItems = 2000;
    var itemsPerLoad = 20;
    var scrollInfiniteCounter = 2;

    $$('.infinite-scroll-content-quality1-movies').on('infinite', function() {
        console.log("Infinite Scroll Quality 1");
        if (!allowInfinite) return;
        allowInfinite = false;
        setTimeout(function() {
            allowInfinite = true;

            if (lastItemIndex >= maxItems) {
                app.infiniteScroll.destroy('.infinite-scroll-content-quality1-movies');
                $$('.infinite-scroll-preloader').remove();
                return;
            }
            $.ajax({
                url: baseUrl + 'list_movies.json?quality=720p&page=' + scrollInfiniteCounter + '&limit=20',
                type: "GET",
            }).fail(function(data) {
                console.log('error:' + data);
                alertServerError();
            }).done(function(data) {
                $.each(data.data.movies, function(key, val) {
                    var qualityOneItemHolder = '<li>' +
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
                    $$('#quality1-movies').append(qualityOneItemHolder);
                });
            });

            lastItemIndex = $$('#quality1-movies ul li').length;
            scrollInfiniteCounter++;
        }, 1000);
    });

    // PULL TO REFRESH QUALITY 1
    // $$('.ptr-content-quality1-movies').on('ptr:refresh', function(e) {
    //     $$('#test').show();
    //     $$('#quality1-movies').html("");
    //     sevenTwentyP();
    //     setTimeout(function() {
    //         $$('#test').hide();
    //         app.ptr.done();
    //     }, 2000);
    // });

    $$('#quality1').on('tab:show', function() {
        sevenTwentyP();
        // INIFINITE SCROLL QUALITY 1
        var allowInfinite = true;
        var lastItemIndex = $$('#quality1-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-quality1-movies').on('infinite', function() {
            console.log("Infinite Scroll Quality 1");
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-quality1-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?quality=720p&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var qualityOneItemHolder = '<li>' +
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
                        $$('#quality1-movies').append(qualityOneItemHolder);
                    });
                });

                lastItemIndex = $$('#quality1-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });

        // PULL TO REFRESH QUALITY 1
        // $$('.ptr-content-quality1-movies').on('ptr:refresh', function(e) {
        //     console.log("PTR Quality 1");
        //     $$('#quality1-movies').html("");
        //     sevenTwentyP();
        //     setTimeout(function() {
        //         app.ptr.done();
        //     }, 2000);
        // });
    });

    $$('#quality2').on('tab:show', function() {
        app.infiniteScroll.create(".infinite-scroll-content-quality2-movies");
        app.ptr.create(".ptr-content-quality2-movies");
        tenEightyP();

        // INIFINITE SCROLL QUALITY 1
        var allowInfinite = true;
        var lastItemIndex = $$('#quality2-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-quality2-movies').on('infinite', function() {
            console.log("Infinite Scroll Quality 1");
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-quality2-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?quality=1080p&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var qualityTwoItemHolder = '<li>' +
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
                        $$('#quality2-movies').append(qualityTwoItemHolder);
                    });
                });

                lastItemIndex = $$('#quality2-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#quality3').on('tab:show', function() {
        app.infiniteScroll.create(".infinite-scroll-content-quality3-movies");
        app.ptr.create(".ptr-content-quality3-movies");
        threeD();
        // INIFINITE SCROLL QUALITY 1
        var allowInfinite = true;
        var lastItemIndex = $$('#quality3-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-quality3-movies').on('infinite', function() {
            console.log("Infinite Scroll Quality 1");
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-quality3-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?quality=3D&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var qualityThreeItemHolder = '<li>' +
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
                        $$('#quality3-movies').append(qualityThreeItemHolder);
                    });
                });

                lastItemIndex = $$('#quality3-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });
})


$$(document).on('page:init', '.page[data-name="moviedetails"]', function(e, page) {
    var movieID = (page.route.query.id);
    movieDetails(movieID);
    movieSuggestions(movieID);
})


$$(document).on('page:init', '.page[data-name="genre"]', function(e) {
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

    genreAction();

    var allowInfinite = true;
    var lastItemIndex = $$('#action-movies ul li').length;
    var maxItems = 2000;
    var itemsPerLoad = 20;
    var scrollInfiniteCounter = 2;

    $$('.infinite-scroll-content-action-movies').on('infinite', function() {
        if (!allowInfinite) return;
        allowInfinite = false;
        setTimeout(function() {
            allowInfinite = true;

            if (lastItemIndex >= maxItems) {
                app.infiniteScroll.destroy('.infinite-scroll-content-action-movies');
                $$('.infinite-scroll-preloader').remove();
                return;
            }
            $.ajax({
                url: baseUrl + 'list_movies.json?genre=action&page=' + scrollInfiniteCounter + '&limit=20',
                type: "GET",
            }).fail(function(data) {
                console.log('error:' + data);
                alertServerError();
            }).done(function(data) {
                $.each(data.data.movies, function(key, val) {
                    var actionItemHolder = '<li>' +
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
                    $$('#action-movies').append(actionItemHolder);
                });
            });

            lastItemIndex = $$('#action-movies ul li').length;
            scrollInfiniteCounter++;
        }, 1000);
    });

    $$('#action').on('tab:show', function() {
        genreAction();
        var allowInfinite = true;
        var lastItemIndex = $$('#action-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-action-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-action-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=action&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var actionItemHolder = '<li>' +
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
                        $$('#action-movies').append(actionItemHolder);
                    });
                });

                lastItemIndex = $$('#action-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#animation').on('tab:show', function() {
        genreAnimation();
        var allowInfinite = true;
        var lastItemIndex = $$('#animation-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-animation-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-animation-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=animation&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var animationItemHolder = '<li>' +
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
                        $$('#animation-movies').append(animationItemHolder);
                    });
                });

                lastItemIndex = $$('#animation-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#comedy').on('tab:show', function() {
        genreComedy();
        var allowInfinite = true;
        var lastItemIndex = $$('#comedy-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-comedy-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-comedy-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=comedy&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var comedyItemHolder = '<li>' +
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
                        $$('#comedy-movies').append(comedyItemHolder);
                    });
                });

                lastItemIndex = $$('#comedy-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#documentary').on('tab:show', function() {
        genreDocumentary();
        var allowInfinite = true;
        var lastItemIndex = $$('#documentary-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-documentary-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-documentary-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=documentary&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var documentaryItemHolder = '<li>' +
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
                        $$('#documentary-movies').append(documentaryItemHolder);
                    });
                });

                lastItemIndex = $$('#documentary-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#family').on('tab:show', function() {
        genreFamily();
        var allowInfinite = true;
        var lastItemIndex = $$('#family-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-family-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-family-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=family&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var familyItemHolder = '<li>' +
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
                        $$('#family-movies').append(familyItemHolder);
                    });
                });

                lastItemIndex = $$('#family-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#film-noi').on('tab:show', function() {
        genrefilmnoi();
        var allowInfinite = true;
        var lastItemIndex = $$('#film-noi-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-film-noi-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-film-noi-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=film-noi&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var filmnoiItemHolder = '<li>' +
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
                        $$('#film-noi-movies').append(filmnoiItemHolder);
                    });
                });

                lastItemIndex = $$('#film-noi-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#horror').on('tab:show', function() {
        genreHorror();
        var allowInfinite = true;
        var lastItemIndex = $$('#horror-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-horror-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-horror-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=horror&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var horrorItemHolder = '<li>' +
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
                        $$('#horror-movies').append(horrorItemHolder);
                    });
                });

                lastItemIndex = $$('#horror-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    // START
    $$('#musical').on('tab:show', function() {
        genreMusical();
        var allowInfinite = true;
        var lastItemIndex = $$('#musical-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-musical-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-musical-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=musical&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var musicalItemHolder = '<li>' +
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
                        $$('#musical-movies').append(musicalItemHolder);
                    });
                });

                lastItemIndex = $$('#musical-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#romance').on('tab:show', function() {
        genreRomance();
        var allowInfinite = true;
        var lastItemIndex = $$('#romance-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-romance-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-romance-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=romance&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var romanceItemHolder = '<li>' +
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
                        $$('#romance-movies').append(romanceItemHolder);
                    });
                });

                lastItemIndex = $$('#romance-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#sport').on('tab:show', function() {
        genreSport();
        var allowInfinite = true;
        var lastItemIndex = $$('#sport-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-sport-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-sport-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=sport&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var sportItemHolder = '<li>' +
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
                        $$('#sport-movies').append(sportItemHolder);
                    });
                });

                lastItemIndex = $$('#sport-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#war').on('tab:show', function() {
        genreWar();
        var allowInfinite = true;
        var lastItemIndex = $$('#war-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-war-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-war-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=war&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var warItemHolder = '<li>' +
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
                        $$('#war-movies').append(warItemHolder);
                    });
                });

                lastItemIndex = $$('#war-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#adventure').on('tab:show', function() {
        genreAdventure();
        var allowInfinite = true;
        var lastItemIndex = $$('#adventure-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-adventure-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-adventure-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=adventure&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var adventureItemHolder = '<li>' +
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
                        $$('#adventure-movies').append(adventureItemHolder);
                    });
                });

                lastItemIndex = $$('#adventure-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#biography').on('tab:show', function() {
        genreBiography();
        var allowInfinite = true;
        var lastItemIndex = $$('#biography-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-biography-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-biography-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=biography&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var biographyItemHolder = '<li>' +
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
                        $$('#biography-movies').append(biographyItemHolder);
                    });
                });

                lastItemIndex = $$('#biography-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#crime').on('tab:show', function() {
        genreCrime();
        var allowInfinite = true;
        var lastItemIndex = $$('#crime-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-crime-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-crime-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=crime&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var crimeItemHolder = '<li>' +
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
                        $$('#crime-movies').append(crimeItemHolder);
                    });
                });

                lastItemIndex = $$('#crime-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#drama').on('tab:show', function() {
        genreDrama();
        var allowInfinite = true;
        var lastItemIndex = $$('#drama-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-drama-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-drama-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=drama&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var dramaItemHolder = '<li>' +
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
                        $$('#drama-movies').append(dramaItemHolder);
                    });
                });

                lastItemIndex = $$('#drama-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#fantasy').on('tab:show', function() {
        genreFantasy();
        var allowInfinite = true;
        var lastItemIndex = $$('#fantansy-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-fantansy-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-fantansy-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=fantansy&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var fantasyItemHolder = '<li>' +
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
                        $$('#fantansy-movies').append(fantasyItemHolder);
                    });
                });

                lastItemIndex = $$('#fantansy-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#history').on('tab:show', function() {
        genreHistory();
        var allowInfinite = true;
        var lastItemIndex = $$('#history-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-history-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-history-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=history&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var historyItemHolder = '<li>' +
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
                        $$('#history-movies').append(historyItemHolder);
                    });
                });

                lastItemIndex = $$('#history-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#music').on('tab:show', function() {
        genreMusic();
        var allowInfinite = true;
        var lastItemIndex = $$('#music-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-music-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-music-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=music&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var musicItemHolder = '<li>' +
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
                        $$('#music-movies').append(musicItemHolder);
                    });
                });

                lastItemIndex = $$('#music-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#mystery').on('tab:show', function() {
        genreMystery();
        var allowInfinite = true;
        var lastItemIndex = $$('#mystery-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-mystery-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-mystery-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=mystery&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var mysteryItemHolder = '<li>' +
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
                        $$('#mystery-movies').append(mysteryItemHolder);
                    });
                });

                lastItemIndex = $$('#mystery-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#scifi').on('tab:show', function() {
        genreScifi();
        var allowInfinite = true;
        var lastItemIndex = $$('#scifi-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-scifi-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-scifi-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=scifi&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var scifiItemHolder = '<li>' +
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
                        $$('#scifi-movies').append(scifiItemHolder);
                    });
                });

                lastItemIndex = $$('#scifi-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#thriller').on('tab:show', function() {
        genreThriller();
        var allowInfinite = true;
        var lastItemIndex = $$('#thriller-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-thriller-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-thriller-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=thriller&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var thrillerItemHolder = '<li>' +
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
                        $$('#thriller-movies').append(thrillerItemHolder);
                    });
                });

                lastItemIndex = $$('#thriller-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
    });

    $$('#western').on('tab:show', function() {
        genreWestern();
        var allowInfinite = true;
        var lastItemIndex = $$('#western-movies ul li').length;
        var maxItems = 2000;
        var itemsPerLoad = 20;
        var scrollInfiniteCounter = 2;

        $$('.infinite-scroll-content-western-movies').on('infinite', function() {
            if (!allowInfinite) return;
            allowInfinite = false;
            setTimeout(function() {
                allowInfinite = true;

                if (lastItemIndex >= maxItems) {
                    app.infiniteScroll.destroy('.infinite-scroll-content-western-movies');
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }
                $.ajax({
                    url: baseUrl + 'list_movies.json?genre=western&page=' + scrollInfiniteCounter + '&limit=20',
                    type: "GET",
                }).fail(function(data) {
                    console.log('error:' + data);
                    alertServerError();
                }).done(function(data) {
                    $.each(data.data.movies, function(key, val) {
                        var westernItemHolder = '<li>' +
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
                        $$('#western-movies').append(westernItemHolder);
                    });
                });

                lastItemIndex = $$('#western-movies ul li').length;
                scrollInfiniteCounter++;
            }, 1000);
        });
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

    $$('#search-movie-advance').on('click', function(e) {
        isAdvanceSearch = true;
        var movieQuality = $$('#quality').val();
        var movieGenre = $$('#genre').val();
        var movieRating = $$('#rating').val();
        var movieSortby = $$('#sortby').val();
        mainView.router.navigate('/search-results/?movieQuality=' + movieQuality + '&movieGenre=' + movieGenre + '&movieRating=' + movieRating + '&movieSortby=' + movieSortby + '');
    });
})


$$(document).on('page:init', '.page[data-name="credits"]', function(e, page) {
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
    $$('.f7-link-web').on('click', function() {
        var f7 = cordova.InAppBrowser.open('https://framework7.io/', '_blank', 'location=yes,toolbarcolor=' + bgColorTheme + ',navigationbuttoncolor=#FFFFFF,closebuttoncolor=#FFFFFF');
        f7.addEventListener('exit', loadExitCallBack);
    });

    $$('.yts-link-web').on('click', function() {
        var yts = cordova.InAppBrowser.open('https://yts.am/api', '_blank', 'location=yes,toolbarcolor=' + bgColorTheme + ',navigationbuttoncolor=#FFFFFF,closebuttoncolor=#FFFFFF');
        yts.addEventListener('exit', loadExitCallBack);
    });

    function loadExitCallBack(params) {
        mainView.router.navigate('/');
    }
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
                text: 'Select Theme Color',
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
                    isDarkTheme();
                    StatusBar.backgroundColorByHexString("#ba000d");
                    StatusBar.styleLightContent();
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
                    isDarkTheme();
                    StatusBar.backgroundColorByHexString("#087f23");
                    StatusBar.styleLightContent();
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
                    isDarkTheme();
                    StatusBar.backgroundColorByHexString("#0069c0");
                    StatusBar.styleLightContent();
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
                    isDarkTheme();
                    StatusBar.backgroundColorByHexString("#b0003a");
                    StatusBar.styleLightContent();
                }
            },
            {
                text: 'Gray',
                icon: '<button class="button button-fill button-round button-raised color-gray"></button>',
                onClick: function() {
                    $('body').removeClass();
                    $$('body').addClass('color-theme-gray');
                    localStorage.setItem('color-theme', 'color-theme-gray');
                    localStorage.setItem('color-theme-form', 'color-gray');
                    isDarkTheme();
                    StatusBar.backgroundColorByHexString("#707070");
                    StatusBar.styleLightContent();
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
                    isDarkTheme();
                    StatusBar.backgroundColorByHexString("#c66900");
                    StatusBar.styleLightContent();
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
    app.dialog.alert('Cannot connect to server. Please try again later.');
}

function isDarkTheme() {
    var isDarkThemeEnabled = localStorage.getItem('color-theme-dark');
    if (isDarkThemeEnabled == "theme-dark") {
        $$('body').addClass('theme-dark');
    }
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

// QUALIYY
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

// MOVIE
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

        // console.log(data.data.movie.genres)
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

// SEARCH
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