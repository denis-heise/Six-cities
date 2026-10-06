import ImageProperty from '../image-property/image-property';
import { Hotel } from '../../types/offers';

type ImageProp = {
  imgOffer: Hotel | null;
}

export default function ImageList (imgOffer: ImageProp): JSX.Element {
  const newArrayImg = imgOffer.imgOffer?.images.slice(0, 6);

  return(
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {typeof newArrayImg === 'undefined' ? '' : newArrayImg.map( (item) => (
          <ImageProperty key={item} linkImg={item}/>
        ))}
      </div>
    </div>
  );
}

