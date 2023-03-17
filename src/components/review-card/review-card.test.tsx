import { render, screen } from "@testing-library/react";
import ReviewCard from "./review-card";


const comment =   {
  comment: 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
  date: '2022-06-23T12:25:36.939Z',
  id: 1,
  rating: 3,
  user: {
    avatarUrl: 'https://10.react.pages.academy/static/avatar/3.jpg',
    id: 12,
    isPro: true,
    name: 'Isaac'
  }
};

describe('Component: ReviewCard', () => {
  it('If displayed correctly', () => {

    render(
      <ReviewCard reviewInfo={comment}/>
    )

    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
  })
})
