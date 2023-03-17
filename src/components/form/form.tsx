import {MAX_TEXT_REVIEW, MIN_TEXT_REVIEW, STARS_COUNT, SubmitStatus} from '../../utils/const';
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { Fragment, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getComments, getCommentStatus } from '../../store/site-data/types-site-data';
import { CommentAuth } from '../../types/comment';

type FormProp = {
  onSubmitForm: (arg0: CommentAuth) => void;
}

export default function Form ({onSubmitForm}: FormProp) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const isCommentsOffer = useAppSelector(getComments);
  const textArea = useRef(null);
  const statusSendComment = useAppSelector(getCommentStatus);
  const isSubmiting = statusSendComment === SubmitStatus.Pending;
  const labelForm: HTMLElement | null = document.querySelector('.reviews__label.form__label');

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const newComment: CommentAuth = {
    id: isCommentsOffer.length + 1,
    comment: text,
    rating
  };
  const listenSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitForm(newComment);
  };

  useEffect(() => {
    if(statusSendComment === SubmitStatus.Fullfilled && labelForm){
      labelForm.textContent = 'Your review';
      labelForm.style.color = '#000';
      setText('');
      setRating(0);
    }
    if(statusSendComment === SubmitStatus.Rejected && labelForm){
      labelForm.textContent = 'Error send comment! Try again.';
      labelForm.style.color = 'red';
    }
  }, [statusSendComment]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={listenSubmit}>
      <label className="reviews__label form__label" htmlFor="review"> Your review </label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: STARS_COUNT}, (_,i) => (
          <Fragment key={`Star ${STARS_COUNT - i}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={STARS_COUNT - i}
              id={`${STARS_COUNT - i}-stars`}
              type="radio"
              checked={STARS_COUNT - i === rating}
              onChange={handleInputChange}
              disabled={isSubmiting}
            />
            <label
              htmlFor={`${STARS_COUNT - i}-stars`}
              className="reviews__rating-label form__rating-label"
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
        value={text}
        onChange={handleTextareaChange}
        disabled={isSubmiting}
        ref={textArea}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
            with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!rating || text.length < MIN_TEXT_REVIEW || text.length > MAX_TEXT_REVIEW || isSubmiting}
        >
            Submit
        </button>
      </div>
    </form>
  );
}
