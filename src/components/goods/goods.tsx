type GoodsName = {
  propGoods:string;
}

export default function Goods ({propGoods}: GoodsName):JSX.Element{
  return(
    <li className="property__inside-item">
      {propGoods}
    </li>
  );
}
