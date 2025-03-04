import { Component } from "react";
import { Link } from "@tanstack/react-router";
import { usePizzaOfTheDay } from "../hooks/usePizzaOfTheDay.jsx";

class ErrorBoundry extends Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  cel;
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            Something went wrong. Please try again later.{" "}
            <Link to={"/"}>Click here</Link>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function EWithHooks(props) {
  const potd = usePizzaOfTheDay();
  return <ErrorBoundry potd={potd} />;
}

export default ErrorBoundry;
