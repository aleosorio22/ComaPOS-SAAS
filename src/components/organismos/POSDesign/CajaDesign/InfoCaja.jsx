import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Device } from "../../../../styles/breakpoints";

export function InfoCaja() {
  return (
    <Container>
      <ContentInfo>
        <article className="header-caja">
          <h2>Caja 02</h2>
        </article>
        <article className="total-caja">
          <span className="label">TOTAL EN CAJA</span>
          <h3 className="monto">Q3,082.50</h3>
        </article>
    
        <article className="detalles">
          <div className="detalle-item">
            <Icon icon="mdi:cash-check" className="icon-apertura" />
            <span>Apertura: Q 1,359.50</span>
          </div>
          <div className="detalle-item">
            <Icon icon="mdi:calendar-clock" />
            <span>05/02/2026 - 2:59 PM</span>
          </div>
          <div className="detalle-item">
            <Icon icon="mdi:account" />
            <span>Usuario: Alejandro Osorio</span>
          </div>
        </article>
        
        <article className="info-turno">
          <div className="tag">TURNO DÍA</div>
          <div className="tag">PLAN: REGULAR</div>
        </article>
      </ContentInfo>
      
      <ContentGrafico>
        <div className="grafico-placeholder">
          <Icon icon="mdi:chart-line" />
          <span>Gráfico de ventas</span>
        </div>
      </ContentGrafico>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  @media ${Device.tablet}{
    grid-template-columns: 1fr 1fr;
  }
`;

const ContentInfo = styled.div`
  background-color: ${({ theme }) => theme.bgcards};
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  .header-caja {
    display: flex;
    align-items: center;
    gap: 1px;
    
    h2 {
      margin: 0;
      font-size: 1.5em;
      font-weight: 600;
      color: ${({ theme }) => theme.color1};
    }
    
    .badge {
      background-color: ${({ theme }) => theme.bg2};
      color: ${({ theme }) => theme.text};
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85em;
      font-weight: 600;
    }
  }
  
  .total-caja {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-bottom: 2px solid ${({ theme }) => theme.bg2};
    
    .label {
      font-size: 0.9em;
      font-weight: 600;
      color: ${({ theme }) => theme.colorSubtitle};
      letter-spacing: 0.5px;
    }
    
    .monto {
      margin: 0;
      font-size: 2em;
      font-weight: 700;
      color: ${({ theme }) => theme.color1};
    }
  }
  
  .detalles {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .detalle-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${({ theme }) => theme.text};
      font-size: 0.9em;
      
      svg {
        font-size: 1.3em;
        color: ${({ theme }) => theme.colorSubtitle};
      }
      
      .icon-apertura {
        color: #4CAF50;
      }
    }
  }
  
  .info-turno {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .tag {
      background-color: ${({ theme }) => theme.color1};
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.85em;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
  }
`;

const ContentGrafico = styled.div`
  background-color: ${({ theme }) => theme.bgcards};
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  
  .grafico-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    color: ${({ theme }) => theme.colorSubtitle};
    
    svg {
      font-size: 4em;
      opacity: 0.5;
    }
    
    span {
      font-size: 0.9em;
      opacity: 0.7;
    }
  }
`;
