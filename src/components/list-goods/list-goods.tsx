import { Offer } from '../../types/offers';
import Goods from '../goods/goods';

type GoodsProp = {
  propListGoods: Offer | null;
}

export default function ListGoods ({propListGoods}: GoodsProp):JSX.Element{
  return(
    <ul className="property__inside-list">
      {propListGoods && (propListGoods.goods.map((item) => (
        <Goods key={item} propGoods={item}/>
      )))}
    </ul>
  );
}
