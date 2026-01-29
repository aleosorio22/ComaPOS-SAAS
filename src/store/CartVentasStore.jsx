import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useClientesProveedoresStore } from "./ClientesProveedoresStore";

const initialState = {
  items: [],
  total: 0,
  stateCheckout: false,
  tipoCobro: ""
};

function calcularTotal(items) {
  return items.reduce(
    (total, item) => total + item._precio_venta * item._cantidad,
    0
  );
}

export const useCartVentasStore = create(
  persist(
    (set) => ({
      ...initialState,

      addItem: (p) =>
        set((state) => {
          // Verificar si el producto ya está en el carrito
          const existingItem = state.items.find(
            (item) => item._producto_id === p._producto_id
          );
          if (existingItem) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            const updatedItems = state.items.map((item) => {
              if (item._producto_id === p._producto_id) {
                return {
                  ...item,
                  _cantidad: item._cantidad + 1,
                  _total: item._total + p._cantidad * p._precio_venta,
                };
              }
              return item;
            });
            return { items: updatedItems, total: calcularTotal(updatedItems) };
          } else {
            // Si el producto no está en el carrito, agregarlo
            return {
              items: [...state.items, p],
              total: calcularTotal([...state.items, p]),
            };
          }
        }),
      removeItem: (p) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item._producto_id !== p._producto_id);
          return {
            items: updatedItems,
            total: calcularTotal(updatedItems)
          };
        }),
      resetState: () => {
        const {selectCP} = useClientesProveedoresStore.getState();
        selectCP([])
        set(initialState)
        
      },
      addCantidadItem: (p) =>
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item._producto_id === p._producto_id && item._cantidad > 0) {
              const updatedItem = { ...item, _cantidad: item._cantidad + 1 };
              updatedItem._total = updatedItem._cantidad * updatedItem._precio_venta;
              return updatedItem;
            }
            return item;
          });
          return { items: updatedItems, total: calcularTotal(updatedItems) };
        }),
      restarCantidadItem: (p) =>
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item._producto_id === p._producto_id && item._cantidad > 0) {
                const updatedQuantity = item._cantidad - 1;
                if (updatedQuantity === 0) {
                  return null;
                } else {
                  const updatedItem = {
                    ...item,
                    _cantidad: updatedQuantity
                  };
                  updatedItem._total = updatedItem._cantidad * updatedItem._precio_venta;
                  return updatedItem;
                }
              }
              return item;
            })
            .filter(Boolean); //Filtrar elementos nulos
          return { items: updatedItems, total: calcularTotal(updatedItems) };
        }),
        setStateCheckout: (p) => set((state)=>{
            if(state.items.length===0) {
                toast.warning("El carrito está vacío. No se puede proceder al checkout.");
                return state;
            }else{
                return {
                    stateCheckout:!state.stateCheckout,
                    tipoCobro: p.tipoCobro
                }
            }
        })
    }),
    {
      name: "cart-ventas-storage",
    }
  )
);