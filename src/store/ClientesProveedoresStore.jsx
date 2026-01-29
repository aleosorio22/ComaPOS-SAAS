import { data } from "react-router-dom";
import { create } from "zustand";
import { BuscarClientesProveedores, EditarClientesProveedores, EliminarClientesProveedores, InsertarClientesProveedores, MostrarClientesProveedores } from "../index";

export const useClientesProveedoresStore = create((set, get)=>({
    tipo:"",
    setTipo:(p)=>{
        set({tipo: p});
    },
    buscador: "",
    setBuscador: (p) =>{
        set({buscador: p});
    },
    dataCP: [],
    cpItemSelect: [],
    parametros: {},
    mostrarCP: async (p) =>{
        const response = await MostrarClientesProveedores(p)
        set({parametros: p}) 
        set ({dataCP: response || []})
        set({cpItemSelect: response?.[0] || null})
        return response;
    },
    selectCP: (p)=>{
        set({cpItemSelect: p});
    },
    insertarCP: async(p, file)=>{
        await InsertarClientesProveedores(p, file);
        const {mostrarCP} = get();
        const {parametros} = get(); 
        set(mostrarCP(parametros))
    },
    eliminarCP: async(p) =>{
        await EliminarClientesProveedores(p);
        const {mostrarCP} = get();
        const {parametros} = get(); 
        set(mostrarCP(parametros))

    },
    editarCP: async(p, fileold, filenew) =>{
        await EditarClientesProveedores(p, fileold, filenew);
        const {mostrarCP} = get();
        const {parametros} = get(); 
        set(mostrarCP(parametros))
    },
    buscarCP: async(p) =>{
        // Si no hay descripción, mostrar todos los clientes o proveedores
        if(!p.buscador || p.buscador.trim() === "") {
            const {mostrarCP} = get();
            return mostrarCP({empresa_id: p.empresa_id, cp_tipo: p.cp_tipo});
        }
        const response = await BuscarClientesProveedores(p);
        set ({dataCP: response})
        return response;
    }
})) 