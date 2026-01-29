import Swal from "sweetalert2";
import { supabase } from "../index";  
const tabla = "clientes_proveedores";

export async function InsertarClientesProveedores(p) {
  const { data, error } = await supabase.rpc("insertar_clientes_proveedores", p );
    if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops... Insertar clientes o proveedores",
      text: error.message,
    });
    return null;
  }
    return data;
}

export async function MostrarClientesProveedores(p){
    const {data, error} = await supabase
    .from(tabla)
    .select()
    .eq("empresa_id", p.empresa_id)
    .eq("cp_tipo", p.cp_tipo)
    .order('cp_nombres', { ascending: true });
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops... Mostrar clientes o proveedores",
            text: error.message,
        });
        return null;
    }
    return data;
}

export async function BuscarClientesProveedores(p){
    const {data, error} = await supabase
    .from(tabla)
    .select()
    .eq("empresa_id", p.empresa_id)
    .eq("cp_tipo", p.cp_tipo)
    .ilike("cp_nombres", `%${p.buscador}%`)
    .order('cp_nombres', { ascending: true });
    if(error){
        console.error("Error buscando clientes o proveedores:", error);
        return null;
    }
    return data;

}

export async function EliminarClientesProveedores(p){
    const {error} = await supabase.from(tabla).delete().eq("cp_id", p.cp_id);
    if(error){
        Swal.fire({ 
            icon: "error",
            title: "Oops... Eliminar clientes o proveedores",
            text: error.message,
        });
        return;
    }
}


export async function EditarClientesProveedores(p){
    const {error} = await supabase.rpc("editar_clientes_proveedores", p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops... Editar clientes o proveedores",
            text: error.message,
        });
        return;
    } 
}

