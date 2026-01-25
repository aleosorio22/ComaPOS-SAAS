import Swal from "sweetalert2";
import { supabase } from "../index";  
const tabla = "marcas";

export async function InsertarMarca(p){
    const {error} = await supabase.rpc("insertarmarcas", p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    } 
}

export async function MostrarMarca(p){
    const {data} = await supabase
        .from(tabla)
        .select()
        .eq("empresa_id", p.empresa_id)
        .order('marca_id', { ascending: false });
    return data;
}

export async function BuscarMarca(p){
    console.log("Buscando con:", p);
    const {data, error} = await supabase
        .from(tabla)
        .select()
        .eq("empresa_id", p.empresa_id)
        .ilike("marca_nombre", "%"+p.descripcion+"%");
    
    if(error){
        console.error("Error buscando marcas:", error);
        return null;
    }
    return data;
}

export async function EliminarMarca(p){
    const {error} = await supabase.from(tabla).delete().eq("marca_id", p.marca_id);
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    }
}

export async function EditarMarca(p){
    const {error} = await supabase.rpc("editarmarcas", p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    } 
}