import styled from "styled-components";
import { v } from "../../../styles/variables";
import { Btn1, useCartVentasStore } from "../../../index";
import {Device} from "../../../styles/breakpoints";
import { Icon } from "@iconify/react";
import {FormatearNumeroDinero} from "../../../utils/Conversiones";

export function TotalPos() {
  const {total, resetState} = useCartVentasStore();
  return (
    <Container>
        <section className="imagen">
            <img src="https://img.icons8.com/ios-filled/50/000000/cash--v1.png" alt="Total Icon" />
        </section>
        <section className="contentTotal">
            <section className="contentTituloTotal">
                <Btn1 
                    titulo="Cobrar" 
                    icono={<Icon icon="mdi:cash-multiple" style={{fontSize: '20px'}} />}
                    bgcolor="#10b981"
                    color="#ffffff"
                />
                <Btn1 
                    titulo="Opciones" 
                    icono={<Icon icon="mdi:dots-horizontal-circle" style={{fontSize: '20px'}} />}
                    bgcolor="#6366f1"
                    color="#ffffff"
                />
            </section>
            <span>{FormatearNumeroDinero(total)}</span>
            <button onClick={resetState}>Reset</button>
        </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 40px;
  border-radius: 15px;
  background-color: ${v.colorPrincipal};
  color: ${v.colorSecundario};
  .imagen{
    z-index: 1;
    width: 55px;
    bottom: 30px;
    position: relative;
    @media ${Device.desktop}{
      bottom: initial;
    }
    img{
      width: 100%;
    }
  }
  .contentTotal{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .contentTituloTotal{
      display: flex;
      align-items: center;
      margin-top: 30px;
      gap: 10px;
      @media ${Device.desktop}{
        display: none;
      }
    }
  }
`;
