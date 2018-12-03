routes = [{
    path: '/',
    url: './index.html',
  },
  {
    path: '/moviedetails/',
    url: './pages/moviedetails.html',
  },
  {
    path: '/search/',
    url: './pages/search.html',
  },
  {
    path: '/search-results/',
    url: './pages/search-results.html',
  },
  {
    path: '/upcoming/',
    url: './pages/upcoming.html',
  },
  {
    path: '/quality/',
    url: './pages/quality.html',
  },
  {
    path: '/genre/',
    url: './pages/genre.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/credits/',
    url: './pages/credits.html',
  },
  {
    path: '/f7/',
    url: 'https://framework7.io',
  },

  {
    path: '/yts/',
    url: 'https://yts.am/api',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];