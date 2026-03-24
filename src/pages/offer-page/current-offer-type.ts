
type apartmentType = 'apartment' | 'room' | 'house' | 'hotel';
type locationType = {
      'latitude': number;
      'longitude': number;
      'zoom': number;
    };
type hostType = {
      'name': string;
      'avatarUrl': string;
      'isPro': boolean;
    }

export type currentOfferType = {
    'id': string;
    'title': string;
    'type': apartmentType;
    'price': number;
    'city': {
      'name': string;
      'location': locationType;
    };
    'location': locationType;
    'isFavorite': boolean;
    'isPremium': boolean;
    'rating': number;
    'description': string;
    'bedrooms': number;
    'goods':string[];
    'host': hostType;
    'images': string[];
    'maxAdults': number;
  }
