import { supabase } from "../index";
const tabla = "roles";

export async function MostrarRolesXnombre (p) {
    const {data} = await supabase
    .from(tabla)
    .select()
    .eq("rol_nombre", p.rol_nombre)
    .maybeSingle();
    return data;
}

