import { data } from "react-router-dom";
import { create } from "zustand";
import { EliminarCategorias, InsertarCategorias, MostrarCategorias, EditarCategorias, BuscarCategorias } from "../index";

export const useCategoriaStore = create((set, get)=>({
    buscador: "",
    setBuscador: (p) =>{
        set({buscador: p});
    },
    dataCategorias: [],
    categoriaItemSelect: [],
    parametros: {},
    mostrarCategorias: async (p) =>{
        const response = await MostrarCategorias(p)
        set({parametros: p}) 
        set ({dataCategorias: response || []})
        set({categoriaItemSelect: response?.[0] || null})
        return response;
    },
    selectCategoria: (p)=>{
        set({categoriaItemSelect: p});
    },
    insertarCategorias: async(p, file)=>{
        await InsertarCategorias(p, file);
        const {mostrarCategorias} = get();
        const {parametros} = get(); 
        set(mostrarCategorias(parametros))
    },
    eliminarCategorias: async(p) =>{
        await EliminarCategorias(p);
        const {mostrarCategorias} = get();
        const {parametros} = get(); 
        set(mostrarCategorias(parametros))

    },
    editarCategorias: async(p, fileold, filenew) =>{
        await EditarCategorias(p, fileold, filenew);
        const {mostrarCategorias} = get();
        const {parametros} = get(); 
        set(mostrarCategorias(parametros))
    },
    buscarCategorias: async(p) =>{
        // Si no hay descripción de búsqueda, mostrar todas las categorías
        if(!p.descripcion || p.descripcion.trim() === "") {
            const {mostrarCategorias} = get();
            return mostrarCategorias({empresa_id: p.empresa_id});
        }
        const response = await BuscarCategorias(p);
        set ({dataCategorias: response})
        return response;
    }
})) 