import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ProductType } from "@/types/types";
import { toast } from "react-toastify";

interface CartItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface CartStore {
  items: CartItem[];
  hydrated: boolean;
}

interface CartStoreActions {
  setHydrated: () => void;
  addItem: (product: ProductType, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const cartStore = create<CartStore & CartStoreActions>()(
  persist(
    immer((set) => ({
      items: [],
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      addItem(product, quantity) {
        set((state) => {
          if (!state.hydrated) return;

          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            state.items.push({
              id: product.id!,
              title: product.title,
              quantity,
              price: product.discountedPrice,
              imageUrl: product.productImages[0]?.url || "",
            });
          }
        });
        toast.success(`${product.title} added to Cart Successfully.`);
      },

      removeItem(id) {
        set((state) => {
          if (!state.hydrated) return;
          state.items = state.items.filter((item) => item.id !== id);
        });
        toast.success("Item removed from the cart Successfully.");
      },

      clearCart() {
        set({ items: [] });
        toast.success("All items Removed from the cart");
      },

      getCartTotal() {
        const totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        return totalPrice;
      },
    })),
    {
      name: "cart",
      onRehydrateStorage() {
        return (state, error) => {
          if (error) {
            console.error("Error during cart store hydration", error);
          } else {
            state?.setHydrated();
          }
        };
      },
    }
  )
);
