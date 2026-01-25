import Swal from "sweetalert2";
import { supabase } from "../index";
const tabla = "ventas";
export async function InsertarVentas(p) {
  const { error, data } = await supabase
    .from(tabla)
    .insert(p)
    .select()
    .maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...ventas",
      text: error.message,
    });
    return;
  }
  return data;
}

export async function EliminarVentasIncompletas(p){
    const {error} = await supabase.from(tabla).delete().eq("venta_estado", "Nueva").eq("usuario_id", p.usuario_id);
    if(error){
        /* Swal.fire({ 
            icon: "error",
            title: "Oops...",
            text: error.message,
        }); */
        return;
    }
}

export async function MostrarVentasXSucursal(p){
    const {data, error} = await supabase
        .from(tabla)
        .select()
        .eq("sucursal_id", p.sucursal_id)
        .eq("venta_estado", "Nueva")
        .maybeSingle();
    if(error){
        console.error("Error mostrando productos:", error);
        Swal.fire({
            icon: "error",  
            title: "Oops...",
            text: error.message,
        });
        return null;
    }
    return data;
}


/* export async function MostrarProductos(p){
    const {data, error} = await supabase.rpc("mostrarproductos", {_empresa_id: p.empresa_id})
    if(error){
        console.error("Error mostrando productos:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return null;
    }
    return data;
}

export async function BuscarProductos(p){
    console.log("Buscando con:", p);
    const {data, error} = await supabase.rpc("buscarproductos", {_empresa_id: p.empresa_id, buscador: p.buscador});
    if(error){
        console.error("Error buscando productos:", error);
        return null;
    }
    return data;
}




export async function EditarProductos(p){
    const {error} = await supabase.rpc("editarproductos", p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    } 
}

 */