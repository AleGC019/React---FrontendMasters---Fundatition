import { use } from "react";
import { CartContext } from "../../../contexts/contexts";
import { Link } from "@tanstack/react-router";

const Header = () => {
  const [cart] = use(CartContext);

  return (
    <nav>
      <Link to="/">
        <h1 className="logo">Padre Gino's Pizza </h1>
      </Link>
      <div className="nav-cart">
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
};

export default Header;
