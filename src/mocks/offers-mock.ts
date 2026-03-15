import { CITIES } from '../consts';
import { mainOfferType } from '../pages/main-page/main-offer-type';

export const offers: mainOfferType[] = [
  {
    'id': '6af6f711',
    'title': 'Beautiful urus studio at great location',
    'type': 'apartment',
    'price': 120,
    'city': {
      'name': CITIES[0],
      'location': {
        'latitude': 62.35514938496378,
        'longitude': 44.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 32.35514938496378,
      'longitude': 14.673877537499948,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 5,
    'previewImage': `https://picsum.photos/400/300?random${Math.random()}`
  },
  {
    'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Beautiful & lion',
    'type': 'hotel',
    'price': 820,
    'city': {
      'name': CITIES[1],
      'location': {
        'latitude': 42.35514938496378,
        'longitude': 44.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 82.35514938496378,
      'longitude': 64.673877537499948,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 2,
    'previewImage': `https://picsum.photos/400/300?random${Math.random()}`
  },
  {
    'id': '6af6f711-c28d-4121-82-e0b462a27f00',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 3420,
    'city': {
      'name': CITIES[1],
      'location': {
        'latitude': 72.35514938496378,
        'longitude': 34.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 62.35514938496378,
      'longitude': 24.673877537499948,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 4,
    'previewImage': `https://picsum.photos/400/300?random${Math.random()}`
  },
  {
    'id': '6af6f711-c2-4121-82cd-e0b462a27f00',
    'title': '& luxurious studio at great location',
    'type': 'house',
    'price': 140,
    'city': {
      'name': CITIES[3],
      'location': {
        'latitude': 42.35514938496378,
        'longitude': 14.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 53.35514938496378,
      'longitude': 10.673877537499948,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 1,
    'previewImage': `https://picsum.photos/400/300?random${Math.random()}`
  },
];

