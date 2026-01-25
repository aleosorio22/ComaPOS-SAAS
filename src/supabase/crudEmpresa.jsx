import Swal from "sweetalert2";
import { supabase } from "../index"
const tabla = "empresas";
export async function InsertarEmpresa(p){
    const {data, error} = await supabase
        .from(tabla)
        .insert(p)
        .select()
        .maybeSingle();
    if(error){
        /* Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        }); */
        return null;
    } 
    return data;
}

export async function MostrarEmpresaXusuarioId(p){
    const{data, error} = await supabase.rpc("mostraempresaxuserid", p).maybeSingle();
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
