import styled from "styled-components";
import { Device } from "../../styles/breakpoints";
import {v} from "../../styles/variables";
import { AreaDetalleVentaPos, AreaTecladoPos, Btn1, FooterPos, HeaderPos, InputText2, PantallaCobro, PantallaIngresoSalidaDinero, Reloj, useCartVentasStore } from "../../index";
import { blur_in } from "../../styles/keyframes";
import { Toaster } from 'sonner';

export function POSTemplate() {
    const {stateCheckout} = useCartVentasStore();
  return (
    <Container>
        {
            stateCheckout && <PantallaCobro/>
        }
        <HeaderPos/>
        <Main>
            <Toaster richColors position="top-center"/>
            <AreaDetalleVentaPos/>
            <AreaTecladoPos/>
        </Main>
        <FooterPos/>
        <PantallaIngresoSalidaDinero/>
    </Container>
  );
}

const Container = styled.div`
    height: calc(100vh - 60px);
    padding:10px;
    padding-top:50px;
    display: grid;
    gap:10px;
    grid-template:
        "header" 220px
        "main" auto;
    animation: ${blur_in} 0.5s linear both;
    @media ${Device.desktop}{
        grid-template:
            "header header" 140px
            "main main"
            "footer footer"60px;
    }


`;

const Main = styled.div`
    grid-area: main;
    /* background-color: rgba(228,20,20,0.5); */
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    overflow: hidden;
    gap: 10px;
    @media ${Device.desktop}{
        flex-direction: row;
    }
`

