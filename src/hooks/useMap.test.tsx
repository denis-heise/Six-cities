import { render, renderHook, screen } from "@testing-library/react";
import useMap from "./useMap";
import { Map } from "leaflet";
import { City } from "../types/offers";

const cityOffer: City = {
  name: 'Paris',
  location: {
    latitude: 48.85881,
    longitude: 65.73111,
    zoom: 16,
  }
}

const TestMapComponent = () => <div data-testid="map"/>;

describe('Hook: useMap', () => {
  it('Return map', () => {
    render(<TestMapComponent />);
    const mapContainer = screen.getByTestId('map');

    expect(mapContainer).toBeEmptyDOMElement();

    const { result } = renderHook(() =>
      useMap({current: mapContainer}, cityOffer)
    );

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
    expect(mapContainer).not.toBeEmptyDOMElement();

  })
})
