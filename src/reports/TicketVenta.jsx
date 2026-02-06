import { urlToBase64 } from "../utils/Conversiones"
import createPdf from "../utils/CreatePdf"

const TicketVenta =async (output, data)=> {
    const logoempresa = await urlToBase64 (data.logo)

    const productTableBody = [
        [
            { text: "CÓDIGO - DESCRIPCIÓN", colSpan: 4, style: "tProductsHeader" },
            {},
            {},
            {},
        ],
        [
            { text: "CANT.", style: "tProductsHeader" },
            { text: "UM", style: "tProductsHeader", alignment: "center" },
            { text: "PRECIO", style: "tProductsHeader", alignment: "right" },
            { text: "TOTAL", style: "tProductsHeader", alignment: "right" },
        ],
        ...data.productos.flatMap(item =>[
            [
                {
                    text: `"Código:" - ${item._descripcion}`,
                    style: "tProductsBody",
                    colSpan: 4,
                },
                {},
                {},
                {},
            ],
            [
                {text: item._cantidad.toString(), style: "tProductsBody", alignment: "center"},
                {text: "Unidad", style: "tProductsBody", alignment: "center"},
                {text: item._precio_venta.toFixed(2), style: "tProductsBody", alignment: "right"},
                {text: item._total.toFixed(2), style: "tProductsBody", alignment: "right"},
            ]
        ])
        
    ]

    const content = [
        //Data empresa
        {
        
            image: logoempresa,
            fit: [141.73, 56.692],
            alignment: "center",
        },
        //Nombre, direccion, ruc empresa
        {
            text: "ComaTec Software", style: "header"   
        },
        {
            text: "Dirección:", style: "header"  
        },
        {
            text: "RUC Empresa:", style: "header"
        },
        //TIPO Y NUMERO DE DOCUMENTO
        { text: "FACTURA ELECTRÓNICA", style: "header", margin: [0, 10, 0, 2.25] },
        { text: "F001-000001", style: "header", margin: [0, 2.25, 0, 0] },

        //DATOS DE CABECERA FACTURAR
        {
            margin: [0, 10, 0, 0],
            table: {
                widths: ["25%", "35%", "15%", "25%"],
                body: [
                    [
                        {text: "Fecha:", style: "tHeaderLabel"},
                        {text: "30/01/2026:", style: "tHeaderLabel"},
                        {text: "Hora:", style: "tHeaderLabel"},
                        {text: "00:00:00", style: "tHeaderLabel"}
                    ],
                    [
                        { text: "CAJERO:", style: "tHeaderLabel" },
                        { text: "NOMBRE CAJERO", style: "tHeaderValue", colSpan: 3 },
                        {},
                        {},
                    ],
                    [
                        { text: "VENDEDOR:", style: "tHeaderLabel" },
                        { text: "MARK SAM", style: "tHeaderValue", colSpan: 3 },
                        {},
                        {},
                    ],
                    //DATOS DE CLIENTE
                    [
                        {
                            text: "CLIENTE: ",
                            style: "tTotals",
                            alignment: "left",
                            colSpan: 4,
                            margin: [0, 6, 0, 0],
                        },
                        {},
                        {},
                        {},
                    ],
                    [
                        { text: "NOMBRES: ", style: "tClientLabel" },
                        {
                            text: "MADERAS CASTOREO S.A.",
                            style: "tClientValue",
                            colSpan: 3,
                        },
                        {},
                        {},
                    ],
                    [
                        { text: "DOC.ID: ", style: "tClientLabel" },
                        { text: "11155998822", style: "tClientValue", colSpan: 3 },
                        {},
                        {},
                    ],
                    [
                        { text: "DIRECC.: ", style: "tClientLabel" },
                        {
                            text: "Guatemala, Zona 1, Calle Falsa 123",
                            style: "tClientValue",
                            colSpan: 3,
                        },
                        {},
                        {},
                    ],
                ]
            },
            layout: "noBorders",
        },
        //PRODUCTOS
        {
            margin: [0, 10, 0, 0],
            table: {
                widths: ["20%", "20%", "30%", "30%"],
                headRows: 2,
                body: productTableBody,

            },
            layout: {
                hLineWidth: function(i, node){
                    return i == 2 ? 0.5 : 0;
                },
                vLineWidth: function(i, node){
                    return 0;
                },
                hLineColor: function(){
                    return "#a9a9a9";
                }
            },
        },
        //TOTALES
        {
            margin: [0, 10, 0, 0],
            table:{
                widths: ["25%", "35%", "15%", "25%"],
                body: [
                    //TOTAL
                    [
                        {text: "SUBTOTAL: Q", style: "tTotals", colSpan: 2},
                        {},
                        {text: "100", style: "tTotals", colSpan: 2},
                        {},
                    ],
                    [
                        {text: "IVA (12%): Q", style: "tTotals", colSpan: 2},
                        {},
                        {text: "12", style: "tTotals", colSpan: 2},
                        {},
                    ],
                    [
                        {text: "TOTAL A PAGAR: Q", style: "tTotals", colSpan: 2},
                        {},
                        {text: "112", style: "tTotals", colSpan: 2},
                        {},
                    ],
                    //TOTAL EN LETRAS
                    [
                        {
                            text: "IMPORTE EN LETRAS:",
                            style: "tTotals",
                            colSpan: 4,
                            alignment: "left",
                            margin: [0, 4, 0, 0],
                        },
                        {},
                        {},
                        {},
                    ],
                    [
                        {
                            text: "CIENTO DOCE QUETZALES CON 00/100",
                            style: "tProductsBody",
                            colSpan: 4,
                        },
                        {},
                        {},
                        {},
                    ],
                    //FORMAS DE PAGO
                    [
                        {
                            text: "FORMA DE PAGO:",
                            style: "tTotals",
                            alignment: "left",
                            colSpan: 4,
                            margin: [0, 4, 0, 0],
                        },
                        {},
                        {},
                        {},
                    ],
                    [{text: "EFECTIVO", style: "tProductsBody", colSpan: 4}, {}, {}, {}],
                    [
                        {text: "EFECTIVO: Q", style: "tTotals", colSpan: 2},
                        {},
                        {text: "50.00", style: "tTotals", colSpan: 2},
                        {},
                    ],
                    [
                        {text: "VISA: Q", style: "tTotals", colSpan: 2},
                        {},
                        {text: "50.00", style: "tTotals", colSpan: 2},
                        {},
                    ],
                    [
                        {text: "CREDITO: Q", style: "tTotals", colSpan: 2},
                        {},
                        {text: "50.00", style: "tTotals", colSpan: 2},
                        {},
                    ]
                    

                ]
            },
            layout: "noBorders",
        },
        //NOTA DE PIE DE PAGINA
        {
            text: "Estimado cliente, gracias por su compra. Por favor, conserve este ticket como comprobante de la transacción.", style: "text", alignment: "justify", margin: [0, 5]
        },
        //QR CODE O LINK
        {
            stack: [
                {
                    qr: "https://coma-tec.com",
                    fit: 115,
                    alignment: "center",
                    eccLevel: "Q",
                    margin: [0, 10, 0, 3],
                },
                {
                    text: "www.coma-tec.com",
                    style: "link",
                    alignment: "center",}
            ]
        }
    ];
    
    
    // Estilos
    const styles = {
        header: {
            fontSize: 9,
            bold: true,
            alignment: "center",
        },
        tHeaderLabel:{
            fontSize: 8,
            alignment: "right",
        },
        tHeaderValue:{
            fontSize: 8,
            bold: true,
        },
        tProductsHeader:{
            fontSize: 8.5,
            bold: true,
        },
        tProductsBody:{
            fontSize: 8,
        },
        tTotals:{
            fontSize: 9,
            bold: true,
            alignment: "right",
        },
        tClientLabel: {
          fontSize: 8,
          alignment: "right",
        },
        tClientValue: {
          fontSize: 8,
          bold: true,
        },
        text: {
          fontSize: 8,
          alignment: "center",
        },
        link: {
          fontSize: 8,
          bold: true,
          margin: [0, 0, 0, 4],
          alignment: "center",
        },
    }
    const response = await createPdf({content, styles}, output)
    return response;
}

export default TicketVenta;