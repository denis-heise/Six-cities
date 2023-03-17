import ReviewCard from '../review-card/review-card';
import { Comment } from '../../types/comment';

type commentsArray = {
  commentsList: Comment[];
}

export default function ReviewsList ({commentsList}: commentsArray): JSX.Element {
  return(
    <ul className="reviews__list">
      {commentsList.map((comment: Comment) => (
        <ReviewCard key={comment.id} reviewInfo={comment}/>
      ))}
    </ul>
  );
}
