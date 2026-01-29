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
export async function EditarMonedaEmpresa(p){
    const {error} = await supabase
        .from(tabla)
        .update(p)
        .eq("empresa_id", p.empresa_id);
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops... Editar moneda empresa",
            text: error.message,
        });
        return null;
    } 
}

export async function EditarEmpresa(p, fileold, filenew){
    const {error} = await supabase
        .from(tabla)
        .update(p)
        .eq("empresa_id", p.empresa_id);
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops... Editar logo empresa",
            text: error.message,
        });
        return null;
    } 
    if(filenew != "-" && filenew.size !=undefined){
        let publicUrl;
        if(fileold != "-"){
            await EditarIconoStorage(p.empresa_id, filenew);
            // Obtener la nueva URL pública después de actualizar
            const ruta = "empresa/"+p.empresa_id;
            const {data: urlimagen} = await supabase.storage.from("imagenes").getPublicUrl(ruta);
            publicUrl = urlimagen.publicUrl;
        }else{
            const dataImagen = await SubirImagen(p.empresa_id, filenew);
            publicUrl = dataImagen.publicUrl;
        }
        // Actualizar la URL en la base de datos
        const plogoeditar = {
            logo: publicUrl,
            empresa_id: p.empresa_id
        }
        await EditarLogoEmpresa(plogoeditar);
    }
}

export async function EditarIconoStorage(empresa_id, file){
    const ruta = "empresa/"+empresa_id
    await supabase.storage.from("imagenes").update(ruta, file,{
        cacheControl: "0",
        upsert: true,
    });
}

async function SubirImagen(empresa_id, file){
    const ruta = "empresa/"+empresa_id
    const {data, error} = await supabase.storage.from("imagenes").upload(ruta, file,{
        cacheControl: "0",
        upsert: true,
    });
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops... Subir imagen",
            text: error.message,
        });
        return;
    }
    if(data){
        const {data: urlimagen} = await supabase.storage.from("imagenes").getPublicUrl(ruta);
        return urlimagen;
    }
}

export async function EditarLogoEmpresa(p){
    const {error} = await supabase
        .from(tabla)
        .update({logo: p.logo})
        .eq("empresa_id", p.empresa_id);
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops... Editar logo empresa",
            text: error.message,
        });
        return null;
    }
}