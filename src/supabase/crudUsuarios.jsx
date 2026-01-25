import Swal from "sweetalert2";
import { supabase } from "../index";
const tabla = "usuarios";

export async function MostrarUsuarios (p) {
    const {data} = await supabase.from(tabla).select().eq("auth_id", p.auth_id).maybeSingle();
    return data;
}

export async function InsertarAdmin(p){
    const {data, error} = await supabase.from(tabla).insert(p).select().maybeSingle();
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return null;
    } 
    return data;
}

export async function ObtenerIdAuthSupabase() {
    const {data:{session}} = await supabase.auth.getSession();
    if(session != null){
        const {user} = session
        const authId = user.id 
        return authId;
    }
}