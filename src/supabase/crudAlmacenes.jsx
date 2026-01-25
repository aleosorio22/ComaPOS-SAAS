import Swal from "sweetalert2";
import { supabase } from "../index";  
const tabla = "almacenes";

export async function InsertarStockAlmacen(p){
    const {error} = await supabase.from(tabla).insert(p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    } 
}

export async function MostrarStockAlmaceneXSucursal(p){
    const {data} = await supabase.from(tabla).select().eq("sucursal_id", p.sucursal_id).eq("producto_id", p.producto_id).maybeSingle();
    return data;
}

export async function MostrarAlmaceneXSucursal(p){
    const {data} = await supabase
        .from(tabla)
        .select()
        .eq("sucursal_id", p.sucursal_id)
        .maybeSingle();
    return data;
}

export async function EliminarAlmacen(p){
    const {error} = await supabase.from(tabla).delete().eq("almacen_id", p.almacen_id);
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    } 
}