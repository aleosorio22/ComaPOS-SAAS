import { create } from "zustand";
import {InsertarEmpresa, MostrarEmpresaXusuarioId} from "../index"

export const useEmpresaStore = create((set) => ({ 
    dataempresa: null,
    mostrarempresa: async(p)=>{
        const response = await MostrarEmpresaXusuarioId(p)
        set ({dataempresa: response});
        return response;
    },
    insertarempresa: async (p) =>{
        const response = await InsertarEmpresa(p);
    }
}));
