import { data } from "react-router-dom";
import { create } from "zustand";
import { 
    BuscarMarca,
    MostrarMarca,
    EliminarMarca,
    InsertarMarca,
    EditarMarca
} from "../index";

export const useMarcaStore = create((set, get)=>({
    buscador: "",
    setBuscador: (p) =>{
        set({buscador: p});
    },
    dataMarca: null,
    marcaItemSelect: [],
    parametros: {},
    mostrarMarca: async (p) =>{
        const response = await MostrarMarca(p)
        set({parametros: p}) 
        set ({dataMarca: response})
        set({marcaItemSelect: response[0]})
        return response;
    },
    selectMarca: (p)=>{
        set({marcaItemSelect: p});
    },
    insertarMarca: async(p)=>{
        await InsertarMarca(p);
        const {mostrarMarca} = get();
        const {parametros} = get(); 
        set(mostrarMarca(parametros))
    },
    eliminarMarca: async(p) =>{
        await EliminarMarca(p);
        const {mostrarMarca} = get();
        const {parametros} = get(); 
        set(mostrarMarca(parametros))

    },
    editarMarca: async(p) =>{
        await EditarMarca(p);
        const {mostrarMarca} = get();
        const {parametros} = get(); 
        set(mostrarMarca(parametros))
    },
    buscarMarca: async(p) =>{
        // Si no hay descripción de búsqueda, mostrar todas las categorías
        if(!p.descripcion || p.descripcion.trim() === "") {
            const {mostrarMarca} = get();
            return mostrarMarca({empresa_id: p.empresa_id});
        }
        const response = await BuscarMarca(p);
        set ({dataMarca: response})
        return response;
    }
})) 