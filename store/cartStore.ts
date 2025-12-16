import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
    id: string; // unique id for the cart item (product.id + addons hash)
    product: Product;
    addons: string[];
    quantity: number;
    pricePerUnit: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product, addons: string[], price: number) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product, addons, price) => {
                const items = get().items;
                // Simple unique ID logic for now
                const newItemId = `${product.id}-${addons.sort().join('-')}`;

                const existingItem = items.find(item => item.id === newItemId);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.id === newItemId
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    });
                } else {
                    set({
                        items: [...items, {
                            id: newItemId,
                            product,
                            addons,
                            pricePerUnit: price,
                            quantity: 1
                        }]
                    });
                }
            },

            removeFromCart: (itemId) => {
                set({ items: get().items.filter(item => item.id !== itemId) });
            },

            updateQuantity: (itemId, quantity) => {
                if (quantity < 1) return;
                set({
                    items: get().items.map(item =>
                        item.id === itemId
                            ? { ...item, quantity }
                            : item
                    )
                });
            },

            clearCart: () => set({ items: [] }),

            totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

            totalPrice: () => get().items.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0),
        }),
        {
            name: 'cart-storage',
        }
    )
);
