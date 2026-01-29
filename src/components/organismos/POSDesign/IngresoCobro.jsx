import styled from "styled-components";
import { useCartVentasStore } from "../../../store/CartVentasStore";
import { Icon } from "@iconify/react";
import { Btn1, FormatearNumeroDinero, InputText, useClientesProveedoresStore, useDetalleVentasStore, useEmpresaStore, useSucursalesStore, useUsuariosStore, useVentasStore } from "../../../index";
import { useEffect, useState, forwardRef, useImperativeHandle, useMemo } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PanelBuscador } from "./PanelBuscador";

// Hook de debounce para optimizar búsquedas
function useDebounce(value, delay = 800) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export const IngresoCobro = forwardRef((props, ref) => {
    
    const {tipoCobro, total, items, setStateCheckout, resetState } = useCartVentasStore();

    //valores a calcular
    const [stateBuscadorClientes, setStateBuscadorClientes] = useState(false);
    const [precioVenta, setPrecioVenta] = useState(total);
    const [valorTarjeta, setValorTarjeta] = useState(tipoCobro==="Tarjeta"?total:0);
    const [valorEfectivo, setValorEfectivo] = useState(tipoCobro==="Efectivo"?total:0);
    const [valorCredito, setValorCredito] = useState(tipoCobro==="Crédito"?total:0);

    //valores a mostrar
    const [cambio, setCambio] = useState(0);
    const [restante, setRestante] = useState(0);
    
    //datos de la store
    const {dataUsuarios} = useUsuariosStore();
    const {sucursalesAsignadasItemSelect} = useSucursalesStore();
    const {dataempresa} = useEmpresaStore();
    const {ventaid, insertarVentas, resetearVentas} = useVentasStore();
    const {insertarDetalleVentas} = useDetalleVentasStore();
    const {buscarCP, setBuscador, buscador, selectCP, cpItemSelect} = useClientesProveedoresStore();
    
    // Aplicar debounce: espera 800ms después de que el usuario deje de escribir
    const debouncedBuscador = useDebounce(buscador, 800);
    
    const {data: dataBuscadorCliente, isLoading: isLoadingBuscadorCliente} = useQuery({
        queryKey:["Buscar cliente para venta", [dataempresa?.empresa_id, "Cliente", debouncedBuscador]],
        queryFn: () => buscarCP({empresa_id: dataempresa?.empresa_id, cp_tipo: "Cliente", buscador: debouncedBuscador}),
        enabled: !!dataempresa?.empresa_id && stateBuscadorClientes,
        refetchOnWindowFocus: false,
    });

    // Procesar datos para agregar documento con lógica de fallback
    const dataBuscadorClienteProcesada = useMemo(() => {
        if(!dataBuscadorCliente) return [];
        return dataBuscadorCliente.map(cliente => ({
            ...cliente,
            documento_display: 
                (cliente.cp_id_fiscal && cliente.cp_id_fiscal !== "-") ? cliente.cp_id_fiscal :
                (cliente.cp_id_nacional && cliente.cp_id_nacional !== "-") ? cliente.cp_id_nacional :
                (cliente.cp_telefono && cliente.cp_telefono !== "-") ? cliente.cp_telefono :
                "sin documento"
        }));
    }, [dataBuscadorCliente]);

    //funcion para calcular vuelto y restante
    const calcularVueltoYRestante = () => {
        const totalPagado = valorTarjeta + valorEfectivo + valorCredito;
        if(totalPagado >= precioVenta){
            setCambio(totalPagado - precioVenta);
            setRestante(0);
        }else{
            setCambio(0);
            setRestante(precioVenta - totalPagado);
        }
    }

    //manejadores de cambio
    const handleValorEfectivoChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setValorEfectivo(value);
    }
    const handleValorTarjetaChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setValorTarjeta(value);
    }
    const handleValorCreditoChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setValorCredito(value);
    }

    //exponiendo la mutation a traves de ref
    useImperativeHandle(ref, ()=>({
        mutateAsync: async () => {
            // Validar ANTES de ejecutar la mutación
            if(restante !== 0){
                toast.warning("Falta completar el pago, el restante tiene que ser 0");
                return;
            }
            return mutation.mutateAsync();
        }
    }))

    //funcion para confirmar la venta
    const mutation = useMutation({
        mutationKey: 'confirmar venta',
        mutationFn: confirmarVentas,
        onSuccess: ()=>{
            setStateCheckout({tipoCobro: ""});
            resetState();
            resetearVentas();
            toast.success("🎉 Venta realizada con éxito!");
        }
    });
    
    async function confirmarVentas(){
        const pVentas ={
            cliente_id: selectCP?.cp_id || null,
            usuario_id: dataUsuarios?.usuario_id,
            sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id,
            empresa_id: dataempresa?.empresa_id,
            venta_estado: "Confirmada",
            venta_cambio: cambio,
            venta_efectivo: parseFloat(valorEfectivo),
            venta_credito: parseFloat(valorCredito),
            venta_tarjeta: parseFloat(valorTarjeta),
            venta_monto_total: total,
            venta_tipo_pago: tipoCobro
        };
        if(ventaid === 0){
            const result = await insertarVentas(pVentas);
            if(result?.venta_id > 0){
                // Procesar items uno por uno
                for(const item of items){
                    item._venta_id = result.venta_id;
                    await insertarDetalleVentas(item);
                }
            }
        }
    }

    //useEffect para actualizar valores al cambiar inputs
    useEffect(()=>{
        calcularVueltoYRestante();
    }, [precioVenta, valorTarjeta, valorEfectivo, valorCredito]);
  return (
    <Container>
        {
            mutation.isPending?(<pan>guardando...</pan>):(
                <>
                    {
                        mutation.isError&&<span>Error al confirmar la venta. {mutation.error.message}</span>
                    }
                    <section className="area1">
                      <span className="tipocobro">Tipo de cobro: {tipoCobro}</span>
                      <Icon icon="mdi:cash-register"/>
                      <span>Cliente:</span>
                      <EditButton onClick={()=>setStateBuscadorClientes(!stateBuscadorClientes)}>

                        <Icon icon="mdi:pencil" className="icono"/>
                      </EditButton>
                      <span className="cliente">{cpItemSelect?.cp_nombres || "Consumidor Final"}</span>
                    </section>
                      <Linea />
                    <section className="area2">
                      {
                          tipoCobro != "Efectivo" && tipoCobro != "Mixto" ? null :(
                              <InputText textalign="center">
                                  <input 
                                      onChange={handleValorEfectivoChange}                 
                                      defaultValue={tipoCobro==="Mixto"?"":total}
                                      className="form__field"
                                      type="number"   
                                  />
                                  <label className="form__label">Monto en efectivo:</label>
                              </InputText>
                          ) 
                      }
                      {
                          tipoCobro != "Tarjeta" && tipoCobro != "Mixto" ? null :(
                              <InputText textalign="center">
                                  <input 
                                      onChange={handleValorTarjetaChange}
                                      defaultValue={tipoCobro==="Mixto"?"":total}
                                      disabled={tipoCobro === "Mixto"?false:true}
                                      className="form__field"
                                      type="number"   
                                  />
                                  <label className="form__label">Monto con tarjeta:</label>
                              </InputText>
                          ) 
                      }
                      {
                          tipoCobro != "Crédito" && tipoCobro != "Mixto" ? null :(
                              <InputText textalign="center">
                                  <input 
                                      onChange={handleValorCreditoChange}
                                      defaultValue={tipoCobro==="Mixto"?"":total}
                                      disabled={tipoCobro === "Mixto"?false:true}
                                      className="form__field"
                                      type="number"   
                                  />
                                  <label className="form__label">Monto al crédito:</label>
                              </InputText>
                          ) 
                      }
                    </section>
                      <Linea />
                    <section className="area3">
                      <article >
                          <span className="total">Total:</span>
                          <span className="cambio">Cambio:</span>
                          <span className="restante">Restante:</span>
                      </article>
                      <article>
                          <span className="total">{FormatearNumeroDinero(total)}</span>
                          <span>{cambio}</span>
                          <span>{restante}</span>
                      </article>
                    </section>
                    <Linea/>  
                      <section className="area4">
                          <Btn1
                              funcion = {()=>mutation.mutateAsync()}
                              border="2px"
                              titulo="Cobrar (Enter)"
                              bgcolor="#0aca21"
                              color="#ffffff"
                              width="100%"
                          />
                      </section>  
                      {
                        stateBuscadorClientes && (
                            <PanelBuscador 
                                data={dataBuscadorClienteProcesada} 
                                selector={selectCP} 
                                setBuscador={setBuscador} 
                                displayField="cp_nombres" 
                                displayField2="documento_display"
                                setStateBuscador={()=> setStateBuscadorClientes(!stateBuscadorClientes)}
                            />
                        )
                      }
                </>
            )
        }

    </Container>
  );
})

const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 2px 15px 0px #e2e2e2;
    gap: 12px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    color: #000000;
    min-height: 100%;
    align-items: center;
    font-size: 22px;
    input{
        color: #000 !important;
        font-weight: 700;
    }
    &:before,
    &:after {
      content: "";
      position: absolute;
      left: 5px;
      height: 6px;
      width: 380px;
    }
    &:before {
      top: -5px;
      background: radial-gradient(
          circle,
          transparent,
          transparent 50%,
          #fbfbfb 50%,
          #fbfbfb 100%
        ) -7px -8px / 16px 16px repeat-x;
    }
    &:after {
      bottom: -5px;
      background: radial-gradient(
          circle,
          transparent,
          transparent 50%,
          #fbfbfb 50%,
          #fbfbfb 100%
        ) -7px -2px / 16px 16px repeat-x;
    }
    .area1{
        display: flex;
        flex-direction: column;
        align-items: center;
        .tipocobro{
            position: absolute;
            right: 6px;
            top: 6px;
            padding: 5px;
            background-color:rgba(233,6,184,0.2);
            color: #e61eb1;
            border-radius: 5px;
            font-size: 15px;
            font-weight: 650;

        }
        .cliente{
            font-weight: 700;
        }
    }
    .area2{
        input{
            font-size: 40px;
        }
    }
    .area3{
        display: flex;
        justify-content: space-between;
        width: 100%;
        article{
            display: flex;
            flex-direction: column;   
        }
        .total{
            font-weight: 700;
        }
    }
`;

const Linea= styled.span`
    width: 100%;
    border-bottom: 1px dashed #d4d4d4;
`

const EditButton = styled.button`
    background-color: ${({ theme }) => theme.color2};
    color: ${({ theme }) => theme.text};
    border: none;
    border-radius: 50%;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    .icono{
        font-size:20px;
    }

`