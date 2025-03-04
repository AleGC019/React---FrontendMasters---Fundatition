import { useDebugValue, useEffect, useState } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  useDebugValue(
    pizzaOfTheDay
      ? `Pizza of the Day: ${pizzaOfTheDay.name}, ${pizzaOfTheDay.description}`
      : "Loading...",
  );

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const res = await fetch("/api/pizza-of-the-day");
      const data = await res.json();
      setPizzaOfTheDay(data);
    }

    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
