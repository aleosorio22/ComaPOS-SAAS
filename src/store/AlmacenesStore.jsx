import { data } from "react-router-dom";
import { create } from "zustand";
import { EliminarAlmacen, InsertarStockAlmacen, MostrarAlmaceneXSucursal, MostrarStockAlmaceneXSucursal } from "../index";

export const useAlmacenesStore = create ((set, get) => ({
    dataAlmacen: [],
    dataAlmacenXSucursalXProducto: [],
    mostrarAlmacen: async (p) =>{
        const response = await MostrarStockAlmaceneXSucursal(p);
        set ({dataAlmacenes: response});
        return response;
    },
    mostrarAlmacenXSucursal: async (p) =>{
        const response = await MostrarAlmaceneXSucursal(p);
        set ({dataAlmacenXSucursalXProducto: response});
        const {dataAlmacenXSucursalXProducto} = get();
        return dataAlmacenXSucursalXProducto;
       /*  const response = await MostrarAlmaceneXSucursal(p);
        console.log("📦 Almacenes por sucursal:", response);
        set ({dataAlmacenXSucursalXProducto: response || []});
        return response;  */
    },
    insertarStockAlmacenes: async (p) =>{
        await InsertarStockAlmacen(p);
    },
    eliminarAlmacen: async(p) => {
        await EliminarAlmacen(p);
    }

}));