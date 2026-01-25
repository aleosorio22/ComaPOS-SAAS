import { supabase } from "../index";
const tabla = "tipos_documentos";

export async function MostrarTipoDocumentos (p) {
    const {data} = await supabase
    .from(tabla)
    .select()
    .eq("empresa_id", p.empresa_id);
    return data;
}

