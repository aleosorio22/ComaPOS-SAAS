import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Btn1 } from "../../../moleculas/Btn1";
import { Device } from "../../../../styles/breakpoints";
import { useTheme } from "styled-components";

export function CajaCerradaView({ onAperturar, onVerHistorial }) {
    const theme = useTheme();
  return (
    <Container>
      <ContentWrapper>
        <article className="ultimo-cierre">
          <h3>ÚLTIMO CIERRE</h3>
          <div className="monto-cierre">
            <span className="moneda">Q</span>
            <span className="cantidad">6,934.00</span>
          </div>
          
          <div className="detalles">
            <div className="detalle-item">
              <Icon icon="mdi:calendar-clock" />
              <span>Cierre realizado: 17/01/2026 - 9:33 PM</span>
            </div>
            <div className="detalle-item">
              <Icon icon="mdi:account" />
              <span>Usuario: Alejandro Osorio</span>
            </div>
          </div>
        </article>        
        <article className="acciones-bottom">
          <div className="info-section">
            <span className="label-info">Más información</span>
            <p className="descripcion">Imprime un informe detallado de tus ventas</p>
            <button className="btn-imprimir">
              <Icon icon="fa7-solid:print" />
              Imprimir paloteo
            </button>
          </div>
        </article>
      </ContentWrapper>
      
      <article className="btn-aperturar">
        <Btn1
          funcion={onAperturar}
          titulo="Apertura tu caja"
          bgcolor="#66BB6A"
          color="#fff"
          icono={<Icon icon="fa7-solid:cash-register" />}
          width="100%"
          height="60px"
        />
      </article>
      
      <article className="historial-section">
        <Btn1
            icono={<Icon icon="fa7-solid:history" />}
            funcion={onVerHistorial}
            titulo="Ver historial de cierres"
            bgcolor={theme.colorPrincipal}
            color= "#fff"
            width="100%"
            height="60px"
        />
      </article>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  @media ${Device.tablet} {
    padding: 40px;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  @media ${Device.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  
  .ultimo-cierre {
    background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
    border: 1px solid #E65100;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    h3 {
      margin: 0;
      font-size: 1em;
      font-weight: 700;
      color: #E65100;
      letter-spacing: 1px;
    }
    
    .monto-cierre {
      display: flex;
      align-items: baseline;
      gap: 5px;
      
      .moneda {
        font-size: 1.5em;
        font-weight: 700;
        color: #D84315;
      }
      
      .cantidad {
        font-size: 2.5em;
        font-weight: 700;
        color: #D84315;
      }
    }
    
    .detalles {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-top: 15px;
      border-top: 2px solid rgba(230, 81, 0, 0.2);
      
      .detalle-item {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #5D4037;
        font-size: 0.9em;
        
        svg {
          font-size: 1.3em;
          color: #E65100;
        }
      }
    }
  }

  .acciones-bottom {
    background-color: ${({ theme }) => theme.bgcards};
    border: 1px solid ${({ theme }) => theme.colorPrincipal};
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    .info-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
      
      .label-info {
        font-size: 0.95em;
        font-weight: 600;
        color: ${({ theme }) => theme.colorPrincipal};
        letter-spacing: 0.3px;
      }
      
      .descripcion {
        margin: 0;
        font-size: 0.9em;
        color: ${({ theme }) => theme.colorSubtitle};
        line-height: 1.5;
      }
      
      .btn-imprimir {
        background-color: transparent;
        border: 2px solid ${({ theme }) => theme.colorPrincipal};
        color: ${({ theme }) => theme.colorPrincipal};
        padding: 12px 20px;
        border-radius: 10px;
        font-size: 0.95em;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
        justify-content: center;
        
        &:hover {
          background-color: ${({ theme }) => theme.color1};
          color: white;
        }
        
        svg {
          font-size: 1.3em;
        }
      }
    }
  }
  
  .btn-aperturar {
    width: 100%;
    max-width: 500px;
    margin: 20px auto 0;
  }
  
  .historial-section {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    
    .btn-historial {
      background-color: transparent;
      border: none;
      color: ${({ theme }) => theme.color1};
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 0.95em;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      text-decoration: underline;
      
      &:hover {
        opacity: 0.8;
        transform: translateY(-2px);
      }
      
      svg {
        font-size: 1.3em;
      }
    }
  }
`;
