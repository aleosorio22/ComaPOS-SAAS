import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Device } from "../../../../styles/breakpoints";

export function ResumenVentas() {
  const formasPago = [
    { label: "Efectivo Quetzal", monto: "Q1,032.00", icon: "mdi:cash" },
    { label: "Pago por transferencia", monto: "Q0.00", icon: "mdi:bank-transfer" },
    { label: "Pago por Yape", monto: "Q0.00", icon: "mdi:cellphone" },
    { label: "Pago por Plin", monto: "Q0.00", icon: "mdi:credit-card-outline" }
  ];

  return (
    <Container>
      <article className="header">
        <div className="total-info">
          <h3 className="monto-total">Q1,745.60</h3>
          <span className="label">Total de ventas</span>
        </div>
        <Icon icon="mdi:cart-outline" className="icon-header" />
      </article>
      
      <article className="detalles">
        {formasPago.map((forma, index) => (
          <div key={index} className="forma-pago">
            <div className="forma-info">
              <Icon icon={forma.icon} />
              <span className="label">{forma.label}</span>
            </div>
            <span className="monto">{forma.monto}</span>
          </div>
        ))}
      </article>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgcards};
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-left: 4px solid ${({ theme }) => theme.color1};
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 2px solid ${({ theme }) => theme.bg2};
    
    .total-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      
      .monto-total {
        margin: 0;
        font-size: 1.8em;
        font-weight: 700;
        color: ${({ theme }) => theme.text};
      }
      
      .label {
        font-size: 0.9em;
        font-weight: 600;
        color: ${({ theme }) => theme.color1};
        letter-spacing: 0.3px;
      }
    }
    
    .icon-header {
      font-size: 3em;
      color: ${({ theme }) => theme.color1};
      opacity: 0.2;
    }
  }
  
  .detalles {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .forma-pago {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background-color: ${({ theme }) => theme.bg2};
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: ${({ theme }) => theme.bg3};
        transform: translateX(5px);
      }
      
      .forma-info {
        display: flex;
        align-items: center;
        gap: 10px;
        
        svg {
          font-size: 1.3em;
          color: ${({ theme }) => theme.colorSubtitle};
        }
        
        .label {
          font-size: 0.9em;
          color: ${({ theme }) => theme.text};
        }
      }
      
      .monto {
        font-weight: 600;
        color: ${({ theme }) => theme.text};
        font-size: 0.95em;
      }
    }
  }
`;
