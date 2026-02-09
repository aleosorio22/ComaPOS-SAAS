import {supabase} from './supabase.config';
const tabla = "cajas";
export async function MostrarCajaXSucursal(p){
    const {data} = await supabase
        .from(tabla)
        .select()
        .eq("sucursal_id", p.sucursal_id)
        .eq("empresa_id", p.empresa_id)
        .maybeSingle();
    return data;
}
