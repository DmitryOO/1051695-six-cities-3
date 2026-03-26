import { cities } from '../consts';
import { currentOfferType } from '../pages/offer-page/current-offer-type';

export const currentOffers: currentOfferType[] =
  [
    {
      'id': '6af6f711',
      'title': 'Beautiful urus studio at great location',
      'type': 'house',
      'price': 120,
      'city': {
        'name': cities[0],
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
      'isFavorite': true,
      'isPremium': true,
      'rating': 3.5,
      'description': 'So cozy and picturesque that hides behind a a river by the unique light. A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      'bedrooms': 1,
      'goods': [
        'Heating',
        'Washing machine',
        'Wi-Fi',
        'Cabel TV',
      ],
      'host': {
        'name': 'Oliver Conner',
        'avatarUrl': '../../img/avatar-max.jpg',
        'isPro': true
      },
      'images': [
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
      ],
      'maxAdults': 10
    },
    {
      'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
      'title': 'Beautiful & lion',
      'type': 'hotel',
      'price': 820,
      'city': {
        'name': cities[3],
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
      'rating': 2.3,
      'description': 'So cozy and picturesque that hides behind a a river by the unique light. A quiet cozy and The building is green and from 18th century.',
      'bedrooms': 1,
      'goods': [
        'Wi-Fi',
        'Cabel TV',
      ],
      'host': {
        'name': 'Ironer',
        'avatarUrl': '../../img/avatar-max.jpg',
        'isPro': true
      },
      'images': [
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
      ],
      'maxAdults': 3
    },
    {
      'id': '6af6f711-333-e0b462a27f00',
      'title': 'Beautiful & luxurious studio at great location',
      'type': 'apartment',
      'price': 3420,
      'city': {
        'name': cities[5],
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
      'description': 'A quiet cozy and picturesque that hides.',
      'bedrooms': 3,
      'goods': [
        'Heating'
      ],
      'host': {
        'name': 'n',
        'avatarUrl': '../../img/avatar-max.jpg',
        'isPro': false
      },
      'images': [
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',

      ],
      'maxAdults': 14
    },
    {
      'id': '6a-c2-4121-82cd-e0b462a27f00',
      'title': '& luxurious studio at great location',
      'type': 'house',
      'price': 140,
      'city': {
        'name': cities[3],
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
      'rating': 2.3,
      'description': 'A quiet cozy and picturesque that hides.',
      'bedrooms': 3,
      'goods': [
        'Heating'
      ],
      'host': {
        'name': 'n',
        'avatarUrl': '../../img/avatar-max.jpg',
        'isPro': false
      },
      'images': [
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',
        '../../img/apartment-01.jpg',

      ],
      'maxAdults': 4
    }
  ];
