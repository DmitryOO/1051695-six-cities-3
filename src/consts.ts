const Settings = {
  rentOffersCount: 5,
  isSignedIn: true,
};

const locations = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
];

const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorite: '/favorites',
  Offer: '/offer/:id',
} ;

export { Settings, locations, AppRoute };
