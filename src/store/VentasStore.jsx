import { data } from "react-router-dom";
import { create } from "zustand";
import { EliminarVentasIncompletas, InsertarVentas, MostrarVentasXSucursal } from "../index";

export const useVentasStore = create ((set) => ({
    dataVentas: [],
    ventaid: 0,
    resetearVentas: () => set({
        ventaid: 0
    }),
    insertarVentas: async (p) =>{
        const result = await InsertarVentas(p);
        if(result){
            set({ventaid: result.venta_id});
        }
        return result;
    },
    eliminarVentasIncompletas: async(p)=>{
        await EliminarVentasIncompletas(p);
    },
    mostrarVentasXSucursal: async(p)=>{
        const response = await MostrarVentasXSucursal(p);
        set({dataVentas: response});
        set({ventaid: response?.venta_id? response?.venta_id : 0});
        return response;
    }


}));

