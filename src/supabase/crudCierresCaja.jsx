import Swal from 'sweetalert2';
import {supabase} from './supabase.config';
const tabla = "cierrescaja";

export async function MostrarCierreCajaAperturada(p){
    const {data} = await supabase
        .from(tabla)
        .select()
        .eq("empresa_id", p.empresa_id)
        .eq("sucursal_id", p.sucursal_id)
        .eq("caja_id", p.caja_id)
        .eq("estado", 0)
        .maybeSingle();
    return data;
}
export async function InsertarIngresoSalidaCaja(p) {
    const { error } = await supabase.from(tabla2).insert(p);
    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...Ingreso de dinero " + error.message,
            text: error.message,
        });
        return;
    }
}

export async function AperturarCierreCaja(p) {
  // 1️⃣ Validar que no exista caja abierta
  const { data: abierta, error: errorValidacion } = await supabase
    .from(tabla)
    .select("cierre_caja_id")
    .eq("empresa_id", p.empresa_id)
    .eq("sucursal_id", p.sucursal_id)
    .eq("caja_id", p.caja_id)
    .eq("estado", 1)
    .maybeSingle();

  if (errorValidacion) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorValidacion.message,
    });
    return;
  }

  if (abierta) {
    Swal.fire({
      icon: "warning",
      title: "Caja ya abierta",
      text: "Esta caja ya se encuentra abierta",
    });
    return;
  }

  // 2️⃣ Insertar (payload ya viene listo)
  const { data, error } = await supabase
    .from(tabla)
    .insert(p)
    .select()
    .maybeSingle();

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error al aperturar caja",
      text: error.message,
    });
    return;
  }

  return data;
}