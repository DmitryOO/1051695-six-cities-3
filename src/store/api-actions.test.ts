import createAPI from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '.';
import { Action } from '@reduxjs/toolkit';
import { APIRoute, cities } from '../consts';
import { AuthorizationStatus } from '../consts';
import { checkAuthAction, fetchOffersAction, loginAction, fetchFavoritesAction, logoutAction } from './api-actions';
import { authData, userData } from './api-actions';
import * as tokenStorage from './../services/token';

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, ThunkDispatch<State, ReturnType<typeof createAPI>, Action>>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
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
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch CAA.pending and CAA.fulfilled with thunk "checkAuthAction" when server reply 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);
      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });
    it('should dispatch CAA.pending and CAA.rejected with thunk "checkAuthAction" when server reply 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);
      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });
  });
  describe('fetchOffersAction', () => {
    it('should dispatch FCA.pending, FCA.fulfilled & server returns 200 ', async () => {
      const mockReply = [
        {
          'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
          'title': 'Beautiful & luxurious studio at great location',
          'type': 'apartment',
          'price': 120,
          'city': {
            'name': 'Amsterdam',
            'location': {
              'latitude': 52.35514938496378,
              'longitude': 4.673877537499948,
              'zoom': 8
            }
          },
          'location': {
            'latitude': 52.35514938496378,
            'longitude': 4.673877537499948,
            'zoom': 8
          },
          'isFavorite': false,
          'isPremium': false,
          'rating': 4,
          'previewImage': 'https://url-to-image/image.png'
        }
      ];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockReply);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions[1] as ReturnType<typeof fetchOffersAction.fulfilled>;
      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockReply);

    });
    it('should dispatch FCA.pending, FCA.rejected & server returns 400 ', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch LA.pending and LA.fulfilled when server reply 200', async () => {
      const fakeUser: authData = {
        'email': 'Oliver.conner@gmail.com',
        'password': 'password1'
      };
      const mockReply: userData = {
        'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false,
        'email': 'Oliver.conner@gmail.com',
        'token': 'T2xdmVyLmNv'
      };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockReply);
      await store.dispatch(loginAction(fakeUser));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const loginActionFulfilled = emittedActions[3] as ReturnType<typeof loginAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        loginAction.pending.type,
        fetchFavoritesAction.pending.type,
        fetchOffersAction.pending.type,
        loginAction.fulfilled.type
      ]);
      expect(loginActionFulfilled.payload).toEqual(mockReply);
    });

    it('should call "saveToken" with the received token', async () => {
      const fakeUser: authData = {
        'email': 'Oliver.conner@gmail.com',
        'password': 'password1'
      };
      const mockReply: userData = {
        'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false,
        'email': 'Oliver.conner@gmail.com',
        'token': 'T2xdmVyLmNv'
      };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockReply);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledWith(mockReply.token);
      expect(mockSaveToken).toBeCalledTimes(1);
    });
  });
  describe('logout', () => {
    it('should dispatch LO.pending, LO.fulfilled, FOA.pending and call dropToken with reply 200', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDeleteToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        logoutAction.pending.type,
        fetchOffersAction.pending.type,
        logoutAction.fulfilled.type
      ]);
      expect(mockDeleteToken).toBeCalledTimes(1);
    });

  });

});
