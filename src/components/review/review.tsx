import dayjs from 'dayjs';
import { memo } from 'react';
export type commentType = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
}

type reviewProps = {
  comment: commentType;
}


const ReviewComponent = ({ comment }: reviewProps) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={comment.user.avatarUrl}
          width={54}
          height={54}
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{comment.user.name}</span>
      {comment.user.isPro && <span className="offer__user-status">Pro</span>}
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{ width: `${comment.rating * 20}%` }} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {comment.comment}
      </p>
      <time className="reviews__time" dateTime={dayjs(comment.date).format('YYYY-MM-DD')}>
        {dayjs(comment.date).format('MMMM YYYY')}
      </time>
    </div>
  </li>);

const Review = memo(ReviewComponent);

export default Review;
