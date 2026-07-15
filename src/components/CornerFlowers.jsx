import bouquet from '../assets/flower-bouquet.png';
import peony from '../assets/flower-peony.png';

export function FlowerCornerA({ style }) {
  return <img src={bouquet} alt="" style={style} />;
}

export function FlowerCornerB({ style }) {
  return <img src={peony} alt="" style={style} />;
}

export default FlowerCornerA;
