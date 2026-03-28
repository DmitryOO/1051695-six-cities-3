import Review from '../review/review';
import { commentType } from '../review/review';


type reviewsProps = { comments: commentType[] };
function Reviews({ comments }: reviewsProps) {
  return (
    <section>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      {!comments.length ||
        <ul className="reviews__list">
          {comments.map((comment) => (<Review comment={comment} key={comment.id} />))}
        </ul>}
    </section>
  );
}

export default Reviews;
