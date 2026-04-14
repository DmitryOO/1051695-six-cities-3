import { useState, ReactEventHandler, Fragment } from 'react';
import { ratings } from '../../consts';
import { FormEvent } from 'react';
import { postReviewAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import { setError } from '../../store/offer-slice/offer-slice';
import { clearErrorAction } from '../../store/api-actions';
import { State } from '../../store';
import { useAppSelector } from '../../hooks';
type changeHandlerType = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

function Form(): JSX.Element {
  const error = useAppSelector((state: State) => state.error);
  const isSending = useAppSelector((state: State) => state.isSending);
  const [review, setReview] = useState({ comment: '', rating: 0 });
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const handleTextAreaChange: changeHandlerType = (evt) => {
    setReview({ ...review, comment: evt.currentTarget.value });
  };
  const handleInputChange: changeHandlerType = (evt) => {
    setReview({ ...review, rating: Number(evt.currentTarget.value) });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (id) {
      dispatch(postReviewAction({ ...review, id }))
        .unwrap()
        .then(() => {
          setReview({ comment: '', rating: 0 });
        })
        .catch((err: { message: string }) => {
          dispatch(setError(err.message || 'error'));
          dispatch(clearErrorAction());
        });
    }
  };
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">

        {ratings.map((el) => (
          <Fragment key={el.value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={el.value}
              id={`${el.value}-stars`}
              checked={review.rating === el.value}
              type="radio"
              onChange={handleInputChange}
              disabled = {isSending}
            />
            <label
              htmlFor={`${el.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={el.label}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment}
        onChange={handleTextAreaChange}
        disabled = {isSending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            review.rating === 0 ||
            review.comment.length < 50 ||
            review.comment.length > 300 ||
            Boolean(error) ||
            isSending
          }
        > {isSending ? 'Loading' : 'Submit'}
        </button>
        {error ? error : ''}
      </div>
    </form>);
}

export default Form;
