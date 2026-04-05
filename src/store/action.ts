import { createAction } from '@reduxjs/toolkit';
import { mainOfferType } from '../pages/main-page/main-offer-type';

const changeCity = createAction<string>('changeCity');
const showOffers = createAction<mainOfferType[]>('showOffers');
const loadOffers = createAction<mainOfferType[]>('loadOffers');
const requireAuthorization = createAction<string>('requireAuthorization');
const setError = createAction<string | null>('setError');
const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export { changeCity, showOffers, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus };

