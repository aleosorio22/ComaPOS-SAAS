import Swal from "sweetalert2";
import { supabase } from "../index";
const tabla = "detalle_venta";
export async function InsertarDetalleVentas(p) {
  const { error } = await supabase.rpc("insertardetalleventa", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...ventas",
      text: error.message,
    });
    return;
  }
}

export async function MostrarDetalleVenta(p){
    const {data} = await supabase.rpc("mostrardetalleventa", {_venta_id: p.venta_id})
    return data;
}

export async function EliminarDetalleVentas(p){
    const {error} = await supabase
    .from(tabla)
    .delete()
    .eq("detalle_venta_id", p.detalle_venta_id);
    if(error){
        Swal.fire({ 
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    }
} 


/* 

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