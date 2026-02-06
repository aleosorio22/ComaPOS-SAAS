import pdfMake from "pdfmake/build/pdfmake";
import pdffonts from "pdfmake/build/vfs_fonts";
import printJS from "print-js";
pdfMake.vfs = pdffonts.pdfMake.vfs;

//pdfMake.vfs = pdffonts.pdfMake.vfs;

const createPdf = async (props, output="print")=>{
    return new Promise((resolve, reject)=>{
        try{
            const {
                pageSize = {
                    width: 226.77,
                    height: 841.88,
                },
                pageMargins = [5.66, 5.66, 5.66, 5.66],
                info = {

                },
                styles = {

                },
                content
            } = props;
            const docDefinition = {
                pageSize, // tamaño de página personalizado
                pageMargins, // márgenes personalizados
                info, // información del documento,
                styles, // estilos personalizados
                content // contenido del PDF
            }
            if(output === "b64"){
                const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition)
                pdfMakeCreatePdf.getBase64((data)=>{
                    resolve({
                        success: true,
                        content: data,
                        message: "Archivo generado exitosamente."
                    })
                })
                return;
            }else if (output === "print"){
                //Enviar a imprimir directamente
                const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition)
                pdfMakeCreatePdf.getBase64((data)=>{
                    printJS({
                        printable: data,
                        type: "pdf",
                        base64: true,                        
                    })
                    resolve({
                        success: true,
                        content: null,
                        message: "PDF enviado a imprimir."
                    });
                });
                return;
            }
            reject({
                success: false,
                content: null,
                message: 'No se especificó un formato de salida válido.',
            })
        }catch (error){
            reject({
                success: false,
                content: null,
                message: error?.message ?? 'No se pudo generar proceso.',
            })
        }
    })
};

export default createPdf;