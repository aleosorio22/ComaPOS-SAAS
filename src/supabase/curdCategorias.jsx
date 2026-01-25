import Swal from "sweetalert2";
import { supabase } from "../index";  
const tabla = "categorias";

export async function InsertarCategorias(p, file){
    const {error, data} = await supabase.rpc("insertarcategorias", p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    } 
    const img = file.size;
    if(img!=undefined){
        const nuevo_id = data;
        const urlImagen = await subirImagen(nuevo_id, file);
        const piconoaeditar = {
            categoria_icono: urlImagen.publicUrl,
            categoria_id: nuevo_id

        }
        await EditarIconoCategorias(piconoaeditar)
    }
    const nuevo_id = data;
}

async function subirImagen(idcategoria, file){
    const ruta = "categorias/"+ idcategoria
    const {data, error} = await supabase.storage
        .from("imagenes")
        .upload(ruta, file,{
            cacheControl: '0',
            upsert: true,
        });
        if(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
            return;
        } 
        if(data){
            const {data: urlimagen} = await supabase.storage.from("imagenes").getPublicUrl(ruta);
            return urlimagen
        }
}

async function EditarIconoCategorias(p){
    const {error} = await supabase.from("categorias").update(p).eq("categoria_id", p.categoria_id)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    } 
}

export async function MostrarCategorias(p){
    const {data, error} = await supabase
        .from(tabla)
        .select()
        .eq("empresa_id", p.empresa_id)
        .order('categoria_id', { ascending: false });
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    } 
    return data;
}

export async function BuscarCategorias(p){
    const {data} = await supabase.from(tabla).select().eq("empresa_id", p.empresa_id).ilike("categoria_nombre", "%"+p.descripcion+"%");
    return data;
}

export async function EliminarCategorias(p){
    const {error} = await supabase.from(tabla).delete().eq("categoria_id", p.categoria_id);
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    } 
    if(p.categoria_icono != "-"){
        const ruta = "categorias/"+p.categoria_id;
        await supabase.storage.from("imagenes").remove([ruta]);
    }
}

export async function EditarCategorias(p, fileold, filenew){
    const {error} = await supabase.rpc("editarcategorias", p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
        return;
    } 
    if (filenew != "-" && filenew.size != undefined){
        if(fileold != "-"){
            await EditarIconoStorage(p._categoria_id, filenew)
        }
        else{
            const dataImagen = await subirImagen(p._categoria_id, filenew);
            const piconoaeditar = {
            categoria_icono: dataImagen.publicUrl,
            categoria_id: p._categoria_id
            }
            await EditarIconoCategorias(piconoaeditar);
        }
    }
}

export async function EditarIconoStorage(categoria_id, file){
    const ruta = "categorias/" + categoria_id;
    await supabase.storage.from("imagenes").update(ruta, file, {
        cacheControl: "0",
        upsert: true
    });

}