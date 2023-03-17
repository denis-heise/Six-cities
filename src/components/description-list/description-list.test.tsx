import { render, screen } from "@testing-library/react"
import { cities } from "../../mocks/cities"
import { Offer } from "../../types/offers";
import DescriptionList from "./description-list"

const OfferDescriptionList: Offer[] = [
  {
    bedrooms: 43,
    city: {
      name: cities[0],
      location: {
        latitude: 34.7654,
        longitude: 22.876,
        zoom: 12,
      },
    },
    description: 'description description.',
    goods: ['goods'],
    host: {
      avatarUrl: 'avatarUrl',
      id: 22,
      isPro: true,
      name: 'nameUser',
      email: 'user@gmail.com',
      token: 'tokenqwerty'
    },
    id: 11,
    images: ['imgUrl'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 34.7654,
      longitude: 22.876,
      zoom: 12,
    },
    maxAdults: 2,
    previewImage: 'previewImage',
    price: 653,
    rating: 3.7,
    title: 'title',
    type: 'room'
  }
]

describe('Component: DescriptionList', () => {
  it('If displayed correctly', () => {
    render(
      <DescriptionList propListDescription={OfferDescriptionList[0]}/>
    )

    expect(screen.getByText(OfferDescriptionList[0].description)).toBeInTheDocument();
  })
})
