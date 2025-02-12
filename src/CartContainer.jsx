import CartItem from './CartItem';
import { useGlobalContext } from './context';

const CartContainer = () => {
  const { total, amount, cart, clear } = useGlobalContext();
  if (cart.length === 0) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
         <h4>total <span>${total}</span></h4>
        </div>
        <button className='clear-btn btn' onClick={clear}>clear all</button>
      </footer>
    </section>
  );
};
export default CartContainer;
