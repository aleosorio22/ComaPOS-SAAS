import styled from "styled-components";
import {v} from "../../../styles/variables";
import { 
    Btn1, 
    InputText2, 
    ListaDesplegable, Reloj, 
    useCartVentasStore,
    useProductosStore, 
    useSucursalesStore
} from "../../../index";
import { Device } from "../../../styles/breakpoints";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

export function HeaderPos() {
    const [stateBarcode, setStateBarcode] = useState(true);
    const [stateTeclado, setStateTeclado] = useState(false);
    const [stateListaProductos, setStateListaProductos] = useState(false);
    const {setBuscador, dataProductos, selectProductos, buscador} = useProductosStore();
    const {sucursalesAsignadasItemSelect} = useSucursalesStore();
    const {addItem} = useCartVentasStore();
    const buscadorRef = useRef(null);

    function focusclick(){
        buscadorRef.current.focus();
        buscadorRef.current.value.trim()===""?setStateListaProductos(false):setStateListaProductos(true);
    }
     function buscar(e){
        const texto = e.target.value;
        setBuscador(texto);
        
        // Si escribes algo y estás en modo Barcode, cambiar a modo Teclado
        if(texto.trim() !== "" && stateBarcode){
            setStateBarcode(false);
            setStateTeclado(true);
        }
        
        // Mostrar lista solo si hay texto y no estás en modo Barcode
        if(texto.trim() === ""){
            setStateListaProductos(false);
        }else{
            setStateListaProductos(true);
        }
    }

    async function funcion_insertarventas(){

        const productosItemSelect = useProductosStore.getState().productosItemSelect;

        const pDetalleVentas ={
            _venta_id: 1,
            _cantidad: 1,
            _precio_venta: productosItemSelect.precio_venta,
            _total: 1* productosItemSelect.precio_venta,
            _descripcion: productosItemSelect.producto_nombre,
            _producto_id: productosItemSelect.producto_id,
            _precio_compra: productosItemSelect.precio_compra,
            _sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id   
        }
        addItem(pDetalleVentas);
        setBuscador("");
        buscadorRef.current.focus();
    }

    useEffect(()=>{
        buscadorRef.current.focus();
        //eliminarVentasIncompletas({usuario_id: dataUsuarios?.usuario_id});
    }, []);

  return (
    <Header>
        <ContentSucursal>
            <strong>SUCURSAL: &nbsp;</strong> {sucursalesAsignadasItemSelect?.sucursal}
        </ContentSucursal>
        <section className="contentprincipal">
            <ContentUSer className="area1">
                <div className="contentimg">
                    <img src="https://i.pravatar.cc/300" alt="userphoto" />
                </div>
                <div className="textos">
                    <span className="usuario">Usuario</span>
                    <span className="rol">Rol</span>
                </div>
            </ContentUSer>
            <article className="contentlogo area2">
                <img src={v.logo}/>
                <span>ComaPOS</span>
            </article>
            <article className="contentfecha area3">
                <Reloj/>
            </article>
        </section>
        <section className="contentbuscador">
            <article className="area1">
                <InputText2>
                    <input 
                        value={buscador}
                        ref={buscadorRef}
                        onChange={buscar}
                        className="form__field" 
                        type="search" 
                        placeholder="Buscar..."
                    />
                    <ListaDesplegable 
                    data={dataProductos} 
                    state={stateListaProductos}
                    setState={() => setStateListaProductos(!stateListaProductos)}
                    funcion={selectProductos}
                    funcioncrud={funcion_insertarventas}
                    campoMostrar="producto_nombre"
                    top="55px"
                    scroll="auto"
                />
                </InputText2>
                
            </article>
            <article className="area2"> 
                <Btn1 funcion={()=>{
                    setStateBarcode(true)
                    setStateTeclado(false)
                    setStateListaProductos(false)
                    focusclick();
                }}
                    bgcolor={stateBarcode?"#5849fe":({theme})=>theme.bgtotal}
                     color={stateBarcode?"#fff":({theme})=>theme.text} border="2px" 
                    titulo="Barcode" 
                    icono={<Icon icon="material-symbols:barcode-reader" width="24" height="24" />}
                />
                <Btn1 funcion={()=>{
                    setStateBarcode(false)
                    setStateTeclado(true)
                    focusclick();
                }}
                    bgcolor={stateTeclado?"#5849fe":({theme})=>theme.bgtotal}
                    color={stateTeclado?"#fff":({theme})=>theme.text}
                    border="2px"titulo="Teclado" 
                    icono={<Icon icon="material-symbols:keyboard" width="24" height="24" />}

                />
            </article>
        </section>
    </Header>
  );
}

const Header = styled.div`
    grid-area: header;
    /* background-color: rgba(45,45,45,0.5); */
    display: flex;
    height: 100%;
    flex-direction: column;
    gap: 20px;
     @media ${Device.desktop} {
        border-bottom: 2px solid ${({ theme }) => theme.color2};
    }
    .contentprincipal{
        width: 100%;
        display: grid;
        grid-template:
            "area1 area2"
            "area3 area3";
        .area1{
            grid-area: area1;
        }
        .area2{
            grid-area: area2;
            display: flex;
            gap: 10px;
        }
        .area3{
            grid-area: area3;
        }
        @media ${Device.desktop}{
            display: flex;
            justify-content: space-between;
        }
        .contentlogo{
            display: flex;
            align-items: center;
            font-weight: 700;
            img{
                width: 30px;
                object-fit: contain;
            }
        }
    }
    .contentbuscador{
        display: grid;
        grid-template:
            "area2 area2"
            "area1 area1";
        gap: 10px;
        height: 100%;
        align-items: center;
        .area1{
            grid-area: area1;
        }
        .area2{
            grid-area: area2;
            display: flex;
            gap: 10px;
        }
        @media ${Device.desktop}{
            display: flex;
            gap: 10px;
            .area1{
                width: 40vw;
            }
        }
    }
`

const ContentSucursal = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    border-bottom: 2px solid ${({ theme }) => theme.color2};
    /* background-color: ${({theme})=>theme.color2}; */
    
`

const ContentUSer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    grid-area: area1;
    .contentimg{
        display: flex;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius : 50%;
        overflow: hidden;
        img{
            width: 100%;
            object-fit: cover;    
        }
    }
    .textos{
        display: flex;
        flex-direction: column;
        .usuario{
            font-weight: 700;
        }
    }
    
    
`