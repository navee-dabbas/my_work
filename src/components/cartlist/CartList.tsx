"use client";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks/hooks";
import { deleteCart } from "@/app/store/slices/cart";
const CartList = () => {
  const cart = useAppSelector((state) => state.cartSlice);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Cart Details</h1>
      {cart.map((val, i) => {
        return (
          <div className="grid grid-cols-4 gap-4" key={i}>
            <div>{val.name}</div>
            <div>{val.category}</div>
            <div>{val.qty}</div>
            <button
              className="bg-black/70 rounded-md mt-3 text-white text-sm p-2"
              onClick={() => dispatch(deleteCart(val.name))}
            >
              Delete Item
            </button>
          </div>
        );
      })}
      
    </div>
  );
};

export default CartList;
