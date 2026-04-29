
import { mainOfferType } from '../pages/main-page/main-offer-type';
import { cities } from '../consts';
import { name, internet, lorem, finance, address } from 'faker';

export const makeFakeOffers = (): mainOfferType[] => (new Array(~~(100 * Math.random())).fill(null).map(() => (
  {
    'id': name.title(),
    'title': lorem.sentences(3),
    'type': 'apartment',
    'price': Number(finance.amount(0, 1000)),
    'city': {
      'name': cities[~~((cities.length - 1) * Math.random())],
      'location': {
        'latitude': Number(address.latitude()),
        'longitude': Number(address.longitude()),
        'zoom': 8
      }
    },
    'location': {
      'latitude': Number(address.latitude()),
      'longitude': Number(address.longitude()),
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': Number(finance.amount(0, 5)),
    'previewImage': internet.avatar()
  }))) as mainOfferType[];

export const makeFakeError = (): { error: string } => (
  { error: lorem.sentences(1) }
);
