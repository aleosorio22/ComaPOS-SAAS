import { data } from "react-router-dom";
import { create } from "zustand";
import { MostrarUsuarios, ObtenerIdAuthSupabase } from "../index";

export const useUsuariosStore = create ((set) => ({
    
    dataUsuarios: [],
    mostrarUsuarios: async () =>{
        const authId = await ObtenerIdAuthSupabase()
        const response = await MostrarUsuarios({auth_id: authId});
        set ({dataUsuarios: response});
        return response;
    }

}));

