import { Offer } from '../../types/offers';
import Description from '../one-description/one-description';

type DescriptionProp = {
  propListDescription: Offer | null;
}

export default function DescriptionList ({propListDescription}: DescriptionProp): JSX.Element{
  const arrayDiscription = propListDescription?.description.split('.');

  return(
    <div className="property__description">
      {arrayDiscription && (arrayDiscription.map((item) => (
        item !== '' ? <Description key={item} propDescription={item}/> : ''
      )))}
    </div>
  );
}
