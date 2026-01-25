import Swal from "sweetalert2";
import { supabase } from "../index";
const tabla = "sucursales";

export async function MostrarSucursales (p) {
    
    const {data} = await supabase
        .from(tabla)
        .select("*")
        .eq("empresa_id", p.empresa_id);
    if(error){
        console.error("❌ Error mostrando sucursales:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return null;
    }
    return data;
}

export async function MostrarSucursalAsignadasXUsuario(p){
    const {data, error} = await supabase.rpc("mostrarsucursalesasignadas", {
        _usuario_id: p.usuario_id
    })
    return data;
}

//.iq("empresa_id")
