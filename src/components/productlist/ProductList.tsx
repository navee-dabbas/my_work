"use client";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks/hooks";
import { addProduct } from "@/app/store/slices/product";
import { addCart } from "@/app/store/slices/cart";

export const ProductList = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState("");

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productSlice);
  const carts = useAppSelector((state) => state.cartSlice);
  console.log(carts, "dhfff");

  return (
    <>
      <div className="grid grid-cols-4 gap-3  m-4">
        <input
          type="text"
          placeholder="Product name"
          className="rounded-md bg-green-100 p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category name"
          className="rounded-md bg-green-100 p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="rounded-md bg-green-100 p-2"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
        <button
          className="bg-gray-100"
          onClick={() => {
            dispatch(addProduct({ name, category, qty }));
          }}
        >
          Add Item
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((item) => {
          return (
            <div
              className="w-350 border rounded-md bg-slate-300 p-4"
              key={item.name}
            >
              <h1>{item.name}</h1>
              <p>{item.category}</p>
              <p>{item.qty}</p>
              <button
                onClick={() => dispatch(addCart(item))}
                className="bg-black/70 rounded-md mt-3 text-white text-sm p-2"
              >
                Add Cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
