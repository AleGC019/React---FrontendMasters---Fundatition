import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};

//const App = () => {
//  return React.createElement("div", null, [
//    React.createElement("h1", null, "Padre Gino's - React App"),
//    React.createElement(Pizza, {
//      name: "Margherita",
//      description: "Tomato, mozzarella, basil",
//    }),
//    React.createElement(Pizza, {
//      name: "Pepperoni",
//      description: "Tomato, mozzarella, pepperoni",
//    }),
//    React.createElement(Pizza, {
//      name: "Hawaiian",
//
//      description: "Tomato, mozzarella, pineapple, ham, bacon",
//    }),
//    React.createElement(Pizza, {
//      name: "Meat Feast",
//      description: "Tomato, mozzarella, ham, pepperoni, bacon, beef",
//    }),
//    React.createElement(Pizza, {
//      name: "Vegetarian",
//      description: "Tomato, mozzarella, mushroom, onion, pepper, sweetcorn",
//    }),
//  ]);
//};

const container = document.getElementById("root");

const root = createRoot(container);

root.render(React.createElement(App));
