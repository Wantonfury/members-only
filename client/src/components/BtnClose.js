import '../styles/BtnClose.css';
import IconClose from '../assets/images/btn-close.svg';

const BtnClose = (props) => {
  return <button type='button' className='btn-close' onClick={(e) => props.onClick?.(e)}><img src={IconClose} alt='Close Button' /></button>;
}

export default BtnClose;