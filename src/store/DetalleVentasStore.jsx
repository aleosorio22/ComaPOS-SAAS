import { data } from "react-router-dom";
import { create } from "zustand";
import { EliminarDetalleVentas, InsertarDetalleVentas, MostrarDetalleVenta, } from "../index";

export const useDetalleVentasStore = create ((set, get) => ({
    dataDetalleVentas: [],
    parametros: {},
    total: 0,
    mostrarDetalleVentas: async(p)=>{
        const response = await MostrarDetalleVenta(p);
        set({parametros: p});
        set ({dataDetalleVentas: response || []});
        let total = 0;
        response?.forEach((item) => {
            const array = Object.values(item);
            total += array[4];
        });
        set ({total: total});
        return response;
    },
    insertarDetalleVentas: async (p) =>{
        await InsertarDetalleVentas(p);
    },
    eliminarDetalleVentas: async (p) =>{
        await EliminarDetalleVentas(p);
        const {mostrarDetalleVentas} = get();
        const {parametros} = get();
        set (mostrarDetalleVentas(parametros) );
    }    

}));

