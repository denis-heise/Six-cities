import { Comment } from '../../types/comment';
import {getDateMounthYear} from '../../utils/date';

type ReviewCard = {
  reviewInfo: Comment;
}

export default function ReviewCard (ReviewInfo: ReviewCard): JSX.Element {
  return(
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={ReviewInfo.reviewInfo.user.avatarUrl !== undefined ? ReviewInfo.reviewInfo.user.avatarUrl : '../img/avatar.svg'} width={54} height={54} alt={ReviewInfo.reviewInfo.user.name} />
        </div>
        <span className="reviews__user-name">
          {ReviewInfo.reviewInfo.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${Math.round(ReviewInfo.reviewInfo.rating) * 10 * 2}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {ReviewInfo.reviewInfo.comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">
          {getDateMounthYear(ReviewInfo.reviewInfo.date)}
        </time>
      </div>
    </li>
  );
}
