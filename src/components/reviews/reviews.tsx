import Review from '../review/review';
import { commentType } from '../review/review';
import { memo } from 'react';
import dayjs from 'dayjs';


type reviewsProps = { comments: commentType[] };
const ReviewsComponent = ({ comments }: reviewsProps) => {
  const sortedSlicedComments = comments.toSorted((comment1,comment2)=>dayjs(comment2.date).diff(dayjs(comment1.date))).slice(0,10);
  return (
    <section>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      {!sortedSlicedComments.length ||
        <ul className="reviews__list">
          {sortedSlicedComments.map((comment) => (<Review comment={comment} key={comment.id} />))}
        </ul>}
    </section>
  );
};
const Reviews = memo(ReviewsComponent);
export default Reviews;
