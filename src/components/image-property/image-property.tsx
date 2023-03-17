type imgProp = {
  linkImg: string;
}
export default function ImageProperty (linkImg: imgProp):JSX.Element {
  return(
    <div className="property__image-wrapper">
      <img className="property__image" src={linkImg.linkImg} alt="Photo studio" />
    </div>
  );
}
