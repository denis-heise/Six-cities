type DescriptionText = {
  propDescription:string;
}

export default function Description ({propDescription}: DescriptionText):JSX.Element{
  return(
    <p className="property__text">
      {propDescription.trim()}.
    </p>
  );
}
