import { createAction } from '@reduxjs/toolkit';

const changeCity = createAction<string>('changeCity');
const showOffers = createAction('showOffers');

export { changeCity, showOffers };

