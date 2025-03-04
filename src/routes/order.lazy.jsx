import { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts/contexts.jsx";
import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../components/Pizza.jsx";
import Cart from "../components/Cart.jsx";

export const Route = createLazyFileRoute("/order")({
  component: OrderLazy,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function OrderLazy() {
  //const pizzaType = "pepperoni";
  //const pizzaSize = "M";
  //const pizzaDescription = "Tomato, mozzarella, pepperoni";

  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("The Pepperoni Pizza");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [cart, setCart] = useContext(CartContext);

  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    if (selectedPizza) {
      price = intl.format(selectedPizza.sizes[pizzaSize]);
    }
  }

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaData = await pizzaRes.json();
    setPizzaTypes(pizzaData);
    setLoading(false);
  }

  async function checkout() {
    setLoading(true);
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    setCart([]);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  function addTheCart() {
    setCart([...cart, { pizza: selectedPizza, size: pizzaSize }]);
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form action={addTheCart}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                value={pizzaType}
                onChange={(e) => setPizzaType(e.target.value)}
              >
                {pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    id="pizza-s"
                    type="radio"
                    name="pizza-size"
                    value="S"
                    checked={pizzaSize === "S"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    id="pizza-m"
                    type="radio"
                    name="pizza-size"
                    value="M"
                    checked={pizzaSize === "M"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    id="pizza-l"
                    type="radio"
                    name="pizza-size"
                    value="L"
                    checked={pizzaSize === "L"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          {loading ? (
            <h1>Loading pizza options...</h1>
          ) : selectedPizza ? (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          ) : (
            <div>
              <h2>No pizza selected</h2>
            </div>
          )}
        </form>
      </div>
      {loading ? (
        <h2>Loading... </h2>
      ) : (
        <Cart checkout={checkout} cart={cart} />
      )}
    </div>
  );
}
