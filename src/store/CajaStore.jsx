import {create} from 'zustand';
import { MostrarCajaXSucursal } from '../supabase/crudCaja';

export const useCajaStore = create((set) => ({
    dataCaja: null,
    mostrarCajaXSucursal: async (p) =>{
        const response = await MostrarCajaXSucursal(p);
        set({dataCaja: response});
        return response;
    }
}))