
const Settings = {
  isSignedIn: true,
};

const AuthorizationStatus = {
  Auth:'AUTH',
  NoAuth:'NO_AUTH',
  Unknown:'UNKNOWN',
} as const ;

const cities = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
];

const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorite: '/favorites',
  Offer: '/offer',
};

const ratings = [
  { value: 5, label: 'perfect' },
  { value: 4, label: 'good' },
  { value: 3, label: 'not bad' },
  { value: 2, label: 'badly' },
  { value: 1, label: 'terribly' },
];

const NEAR_PLACES_MAX_LENGTH = 3;

const CitiesCardClass = {
  CITIES: 'cities',
  NEAR_PLACES: 'near-places',
  FAVORITES: 'favorites'
};

const UrlMarker = {
  Current: '../../img/pin-active.svg',
  Default: '../../img/pin.svg',
} as const;

const SORT_OPTIONS = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
] satisfies Record<SortOption, string>;

const enum SortOption {
  Popular,
  PriceLowToHigh,
  PriceHighToLow,
  TopRatedFirst
}

const enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorites',
  Comments = '/comments'
}

const TIMEOUT_ERROR = 2000;


export { Settings, cities, AppRoute, ratings, NEAR_PLACES_MAX_LENGTH, CitiesCardClass, UrlMarker, SORT_OPTIONS, SortOption, AuthorizationStatus, APIRoute, TIMEOUT_ERROR };
