
import { changeCity, setError, Slice } from './slice';
import { cities } from '../consts';
import { AuthorizationStatus } from '../consts';
import { InitialStateType } from './slice';
describe('Slice', () => {
  const expectedState: InitialStateType = {
    user: {},
    city: cities[0],
    offers: [],
    authorizationStatus: AuthorizationStatus.Unknown,
    error: null,
    isLoading: false,
    isSending: false,
    isOffersDataLoading: false,
    isFavoritesDataLoading: false,
    nearbyOffers: [],
    currentOffer: null,
    comments: [],
    favorites: []
  };
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = Slice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = Slice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city state', ()=> {
    const newState = {...expectedState, city: cities[1]};
    const result = Slice.reducer(undefined, changeCity(cities[1]));

    expect(result).toEqual(newState);
  });

  it('should change error state', ()=>{
    const result = Slice.reducer(undefined, setError('err'));

    expect(result.error).toBe('err');
  });
});
