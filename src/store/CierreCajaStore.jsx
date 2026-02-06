import {create} from "zustand";

export const useCierreCajaStore = create((set)=>({
    stateCierreCaja: false,
    setStateCierreCaja: (state) => set({stateCierreCaja: !state}),
    tipoRegistro: "",
    setTipoRegistro: (p) => set({tipoRegistro: p}),

}))