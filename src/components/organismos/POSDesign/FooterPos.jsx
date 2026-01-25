import styled from "styled-components";
import { Device } from "../../../styles/breakpoints";
import { Btn1 } from "../../moleculas/Btn1";
import { Icon } from "@iconify/react";
import { useCartVentasStore } from "../../../index";

export function FooterPos() {
  const {resetState} = useCartVentasStore();
  return (
    <Footer>
        <article className="content">
            <Btn1 
              titulo="Limpiar venta"
              icono={<Icon icon="carbon:shopping-cart-clear" width="32" height="32" />}
              funcion={resetState}
              bgcolor="#ef4444"
              color="#ffffff"
            />
        </article>
    </Footer>
  );
}

const Footer = styled.section`
    grid-area: footer;
    /* background-color: rgba(57,231,26,0.5); */
    display: none;
    @media ${Device.desktop}{
        display: flex;
    }
    .content {
      display: flex;
      align-items: center;
      gap: 8px;
    }
`
