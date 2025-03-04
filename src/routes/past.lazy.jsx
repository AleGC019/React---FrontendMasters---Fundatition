import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders.js";
import getPastOrder from "../api/getPastOrder.js";
import Modal from "../hooks/Modal.jsx";
import { priceConverter } from "../utils/useCurrency";
import ErrorBoundry from "../utils/ErrorBoundry.jsx";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundryWrappedPastOrdersRoute,
});

function ErrorBoundryWrappedPastOrdersRoute(props) {
  return (
    <ErrorBoundry>
      <PastOrdersRoute {...props} />
    </ErrorBoundry>
  );
}

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState(null);
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  const {
    isLoading: isLoadingOrder,
    data: orderData,
    isError: isErrorOrder,
    error: errorOrder,
  } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 86400000,
    enabled: !!focusedOrder,
  });

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="past-orders">
        <h2>Error: {error.message}</h2>
      </div>
    );
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingOrder && !isErrorOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {orderData.orderItems.map((item) => (
                  <tr key={`${item.pizzaTypeId}_${item.size}`}>
                    <td>
                      <img src={item.image} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                    <td>{priceConverter(item.price)}</td>
                    <td>{priceConverter(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading.. </p>
          )}
          <button onClick={() => setFocusedOrder()}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
