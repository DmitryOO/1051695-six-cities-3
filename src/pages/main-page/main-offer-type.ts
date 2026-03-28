
type apartmentType = 'apartment' | 'room' | 'house' | 'hotel';
export type locationType = {
      'latitude': number;
      'longitude': number;
      'zoom': number;
    };


export type mainOfferType = {
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
    'previewImage': string;
  }
