import { render, screen } from "@testing-library/react";
import { cities } from "../../mocks/cities";
import CityItem from "./city-item";
import userEvent from '@testing-library/user-event';

describe('Component: City', () => {
  it('If displayed correctly', () => {
    const onClick = jest.fn();

    render(
      <CityItem key={cities[0]} oneCity={cities[0]} isActiveCity={true} onClick={onClick}/>
    );

    expect(screen.getByText(cities[0])).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('tabs__item--active');
  })

  it('Bean with private route if user is authorized', async () => {
    const onClick = jest.fn();

    render(
      <CityItem key={cities[0]} oneCity={cities[0]} isActiveCity={true} onClick={onClick}/>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toBeCalledWith(cities[0]);
  })
})
