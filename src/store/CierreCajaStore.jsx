import {create} from "zustand";
import { MostrarCierreCajaAperturada, AperturarCierreCaja, InsertarIngresoSalidaCaja } from "../index";

export const useCierreCajaStore = create((set)=>({
    stateCierreCaja: false,
    setStateCierreCaja: (state) => set({stateCierreCaja: !state}),
    tipoRegistro: "",
    setTipoRegistro: (p) => set({tipoRegistro: p}),
    dataCierreCaja: null,
    mostrarCierreCaja: async(p) => {
        const response = await MostrarCierreCajaAperturada(p);
        set({dataCierreCaja: response});
        return response;
    },
    aperturarCaja: async (p) => {
        const response = await AperturarCierreCaja(p);
        set({dataCierreCaja: response});
        return response;
    },
    insertarIngresoSalida: async (p) => {
        await InsertarIngresoSalidaCaja(p);
    }

}))