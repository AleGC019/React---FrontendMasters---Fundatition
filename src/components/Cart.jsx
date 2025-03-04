const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Cart = ({ cart, checkout }) => {
  let total = 0;
  for (const item of cart) {
    total += item.pizza.sizes[item.size];
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size} - </span>
            <span className="name">{item.pizza.name} - </span>
            <span className="price">
              {intl.format(item.pizza.sizes[item.size])}
            </span>
          </li>
        ))}
      </ul>
      <p> Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;
