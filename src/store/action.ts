import { createAction } from '@reduxjs/toolkit';
import { mainOfferType } from '../pages/main-page/main-offer-type';

const changeCity = createAction<string>('changeCity');
const showOffers = createAction<mainOfferType[]>('showOffers');

export { changeCity, showOffers };

