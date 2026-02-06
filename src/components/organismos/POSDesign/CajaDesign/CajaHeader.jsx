import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Btn1 } from "../../../moleculas/Btn1";
import { Device } from "../../../../styles/breakpoints";

export function CajaHeader() {
  return (
    <Container>
      <article className="titulo">
        <Icon icon="fa7-solid:cash-register" className="icono" />
        <h1>Apertura y cierre</h1>
      </article>
      <article className="acciones">
        <a href="#" className="ayuda">
          <Icon icon="fa7-solid:video" />
          <span>¿Cómo realizarlo?</span>
        </a>
        <Btn1 
          titulo="Cerrar caja" 
          bgcolor="#EF5350" 
          color="#fff"
          icono={<Icon icon="fa7-solid:circle-minus" />}
        />
      </article>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  @media ${Device.tablet}{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .titulo {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .icono {
      font-size: 2em;
      color: ${({ theme }) => theme.text};
    }
    
    h1 {
      margin: 0;
      font-size: 1.5em;
      font-weight: 600;
      color: ${({ theme }) => theme.text};
      
      @media ${Device.tablet}{
        font-size: 1.8em;
      }
    }
  }
  
  .acciones {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
    
    .ayuda {
      display: flex;
      align-items: center;
      gap: 5px;
      color: ${({ theme }) => theme.color1};
      text-decoration: none;
      font-size: 0.9em;
      transition: opacity 0.3s;
      
      &:hover {
        opacity: 0.8;
      }
      
      svg {
        font-size: 1.2em;
      }
    }
  }
`;
