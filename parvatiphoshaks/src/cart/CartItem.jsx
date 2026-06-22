import { Link } from 'react-router-dom';

const CartItem = ({ item, increaseQty, decreaseQty, deleteCartItem }) => {
  return (
    <div className="cart-item">
      <div className="item-info">
        <img src={item.image} alt={item.name} className="item-image" />
        <div className="item-details">
          <Link to={`/product/${item.product}`} className="item-name">
            {item.name}
          </Link>
          <p className="item-price">Price: ₹{item.price}</p>
        </div>
      </div>
      <div className="quantity-controls">
        <button
          className="quantity-button"
          onClick={() => decreaseQty(item.product, item.quantity)}
        >
          -
        </button>
        <input type="text" className="quantity-input" value={item.quantity} readOnly />
        <button
          className="quantity-button"
          onClick={() => increaseQty(item.product, item.quantity, item.stock)}
        >
          +
        </button>
      </div>
      <div className="item-total">₹{item.price * item.quantity}</div>
      <div className="item-actions">
        <button className="remove-item-btn" onClick={() => deleteCartItem(item.product)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
