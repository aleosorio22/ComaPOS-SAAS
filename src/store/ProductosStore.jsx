import { data } from "react-router-dom";
import { create } from "zustand";
import { 
    BuscarProductos,
    MostrarProductos,
    EliminarProductos,
    InsertarProductos,
    EditarProductos,
    Generarcodigo
} from "../index";

export const useProductosStore = create((set, get)=>({
    refetchs : null,
    buscador: "",
    setBuscador: (p) =>{
        set({buscador: p});
    },
    dataProductos: null,
    productosItemSelect: [],
    parametros: {},
    mostrarProductos: async (p) =>{
        const response = await MostrarProductos(p)
        set({parametros: p}) 
        set ({dataProductos: response})
        set({productosItemSelect: response[0]})
        // Solo actualizar refetchs si viene en los parámetros
        if(p.refetchs) {
            set({refetchs:p.refetchs})
        }
        return response;
    },
    selectProductos: (p)=>{
        set({productosItemSelect: p});
    },
    insertarProductos: async(p)=>{
        const response = await InsertarProductos(p);
        const {mostrarProductos} = get();
        const {parametros} = get(); 
        set(mostrarProductos(parametros))
        return response;
    },
    eliminarProductos: async(p) =>{
        await EliminarProductos(p);
        const {mostrarProductos} = get();
        const {parametros} = get(); 
        set(mostrarProductos(parametros))

    },
    editarProductos: async(p) =>{
        await EditarProductos(p);
        const {mostrarProductos} = get();
        const {parametros} = get(); 
        set(mostrarProductos(parametros))
    },
    buscarProductos: async(p) =>{
        // Si no hay buscador, mostrar todos los productos
        if(!p.buscador || p.buscador.trim() === "") {
            const {mostrarProductos} = get();
            return mostrarProductos({empresa_id: p.empresa_id});
        }
        const response = await BuscarProductos(p);
        set ({dataProductos: response})
        return response;
    },
    codigogenerado: 0,
    generarCodigo: () =>{ 
        const response = Generarcodigo({producto_id:1})
        set ({codigogenerado: response})
    }
})) 