import { describe, beforeEach, test, expect, vi } from "vitest";
import { useCartStore } from "./useCartStore";
import { type Product } from "@/types/Product";

// mock products
const [product1, product2]: Product[] = [{
  id: "1",
  title: "Brown eggs",
  type: "dairy",
  description: "Raw organic brown eggs in a basket",
  filename: "0.jpg",
  height: 600,
  width: 400,
  price: 5.1,
  rating: 4
}, {
  id: "2",
  title: "Sweet fresh strawberry",
  type: "fruit",
  description: "Sweet fresh strawberry on the wooden table",
  filename: "1.jpg",
  height: 450,
  width: 299,
  price: 10.5,
  rating: 4
}]

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] }); // Reset Zustand state before each test
    vi.clearAllMocks();
  });

  test("adds an item to the cart", () => {
    useCartStore.getState().addItem(product1);
    const state = useCartStore.getState();

    expect(state.items.length).toBe(1);
    expect(state.items[0]).toEqual({ product: product1, quantity: 1 });
  });

  test("increments quantity when adding the same product again", () => {
    useCartStore.getState().addItem(product1);
    useCartStore.getState().addItem(product1);
    const state = useCartStore.getState();

    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });

  test("removes an item from the cart", () => {
    useCartStore.getState().addItem(product1);
    useCartStore.getState().removeItem(product1.id);
    const state = useCartStore.getState();

    expect(state.items.length).toBe(0);
  });

  test("updates the quantity of an item", () => {
    useCartStore.getState().addItem(product1);
    useCartStore.getState().updateQuantity(product1.id, 5);
    const state = useCartStore.getState();

    expect(state.items[0].quantity).toBe(5);
  });

  test("clears the cart", () => {
    useCartStore.getState().addItem(product1);
    useCartStore.getState().addItem(product2);
    useCartStore.getState().clearCart();
    const state = useCartStore.getState();

    expect(state.items.length).toBe(0);
  });

  test("calculates totalItems correctly", () => {
    useCartStore.getState().addItem(product1);
    useCartStore.getState().addItem(product2);
    useCartStore.getState().addItem(product1);

    const state = useCartStore.getState();
    expect(state.totalItems).toBe(3);
  });

  test("calculates totalPrice correctly", () => {
    useCartStore.getState().addItem(product1);
    useCartStore.getState().addItem(product2);
    useCartStore.getState().addItem(product1);

    const state = useCartStore.getState();
    expect(state.totalPrice).toBe(product1.price * 2 + product2.price * 1);
  });

});