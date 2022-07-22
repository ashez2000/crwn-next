import { useDispatch, useSelector } from 'react-redux'

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../store/cart/cart.slice'
import { selectCartItems, selectCartTotal } from '../store/cart/cart.selector'

const CheckoutPage = () => {
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <div className="container">
      <table className="table mb-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>
                <span
                  className="btn btn-secondary me-4"
                  onClick={() => dispatch(addItemToCart(item))}
                >
                  +
                </span>
                {item.quantity}
                <span
                  className="btn btn-secondary ms-4"
                  onClick={() => dispatch(removeItemFromCart(item))}
                >
                  -
                </span>
              </td>
              <td>$ {item.price}</td>
              <td
                className="text-danger cursor-pointer"
                onClick={() => dispatch(clearItemFromCart(item))}
              >
                remove
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Total: ${cartTotal}</p>
    </div>
  )
}

export default CheckoutPage
