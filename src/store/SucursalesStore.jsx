import { data } from "react-router-dom";
import { create } from "zustand";
import { MostrarSucursalAsignadasXUsuario, MostrarSucursales } from "../index";

export const useSucursalesStore = create ((set) => ({

    sucursalesItemSelect: [],
    selectSucursal:(p) => {
        set({sucursalesItemSelect: p});
    },
    dataSucursales: [],
    dataSucursalesAsignadas: [],
    sucursalesAsignadasItemSelect: [],
    mostrarSucursales: async (p) =>{
        const response = await MostrarSucursales(p);
        set ({dataSucursales: response || []});
        set ({sucursalesItemSelect: response?.[0] || null});
        return response;
    },
    mostrarSucursalesAsignadas: async(p)=>{
        const response = await MostrarSucursalAsignadasXUsuario(p);
        set ({dataSucursalesAsignadas: response || []});
        set ({sucursalesAsignadasItemSelect: response?.[0]});
        return response;
    }

}));

