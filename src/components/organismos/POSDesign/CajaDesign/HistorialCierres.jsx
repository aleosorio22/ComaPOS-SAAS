import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Device } from "../../../../styles/breakpoints";
import { useState } from "react";

export function HistorialCierres({ onCerrar }) {
  const [cierres] = useState([
    {
      id: 1,
      fecha: "17/01/2026",
      hora: "9:33 PM",
      monto: "6,934.00",
      usuario: "Alejandro Osorio",
      ventas: 45,
      efectivo: "5,234.00",
      transferencia: "1,700.00"
    },
    {
      id: 2,
      fecha: "16/01/2026",
      hora: "10:15 PM",
      monto: "5,420.50",
      usuario: "María García",
      ventas: 38,
      efectivo: "3,920.50",
      transferencia: "1,500.00"
    },
    {
      id: 3,
      fecha: "15/01/2026",
      hora: "9:45 PM",
      monto: "7,150.00",
      usuario: "Alejandro Osorio",
      ventas: 52,
      efectivo: "5,650.00",
      transferencia: "1,500.00"
    }
  ]);

  return (
    <Container>
      <article className="header">
        <div className="titulo-section">
          <Icon icon="mdi:history" className="icon-header" />
          <h2>Historial de cierres</h2>
        </div>
        <button className="btn-cerrar" onClick={onCerrar}>
          <Icon icon="mdi:close" />
        </button>
      </article>
      
      <article className="filtros">
        <div className="filtro-item">
          <label>Desde</label>
          <input type="date" className="input-fecha" />
        </div>
        <div className="filtro-item">
          <label>Hasta</label>
          <input type="date" className="input-fecha" />
        </div>
        <button className="btn-filtrar">
          <Icon icon="mdi:filter" />
          Filtrar
        </button>
      </article>
      
      <article className="lista-cierres">
        {cierres.map((cierre) => (
          <div key={cierre.id} className="cierre-item">
            <div className="cierre-header">
              <div className="fecha-info">
                <Icon icon="mdi:calendar-clock" />
                <span>{cierre.fecha} - {cierre.hora}</span>
              </div>
              <div className="monto-cierre">Q {cierre.monto}</div>
            </div>
            
            <div className="cierre-detalles">
              <div className="detalle">
                <Icon icon="mdi:account" />
                <span>{cierre.usuario}</span>
              </div>
              <div className="detalle">
                <Icon icon="mdi:cart-outline" />
                <span>{cierre.ventas} ventas</span>
              </div>
            </div>
            
            <div className="cierre-metodos">
              <div className="metodo">
                <Icon icon="mdi:cash" />
                <span>Efectivo: Q {cierre.efectivo}</span>
              </div>
              <div className="metodo">
                <Icon icon="mdi:bank-transfer" />
                <span>Transferencia: Q {cierre.transferencia}</span>
              </div>
            </div>
            
            <div className="cierre-acciones">
              <button className="btn-ver-detalle">
                <Icon icon="mdi:eye-outline" />
                Ver detalle
              </button>
              <button className="btn-imprimir">
                <Icon icon="mdi:printer-outline" />
                Imprimir
              </button>
            </div>
          </div>
        ))}
      </article>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgcards};
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 1000px;
  margin: 0 auto;
  max-height: 80vh;
  overflow: hidden;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid ${({ theme }) => theme.bg2};
    
    .titulo-section {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .icon-header {
        font-size: 2em;
        color: ${({ theme }) => theme.color1};
      }
      
      h2 {
        margin: 0;
        font-size: 1.5em;
        font-weight: 600;
        color: ${({ theme }) => theme.text};
      }
    }
    
    .btn-cerrar {
      background-color: transparent;
      border: none;
      color: ${({ theme }) => theme.colorSubtitle};
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      
      svg {
        font-size: 1.8em;
      }
      
      &:hover {
        background-color: ${({ theme }) => theme.bg2};
        color: ${({ theme }) => theme.text};
      }
    }
  }
  
  .filtros {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: end;
    
    .filtro-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      min-width: 150px;
      
      label {
        font-size: 0.9em;
        font-weight: 600;
        color: ${({ theme }) => theme.colorSubtitle};
      }
      
      .input-fecha {
        padding: 10px 15px;
        border-radius: 10px;
        border: 2px solid ${({ theme }) => theme.bg2};
        background-color: ${({ theme }) => theme.bgtotal};
        color: ${({ theme }) => theme.text};
        font-size: 0.9em;
        transition: all 0.3s ease;
        
        &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.color1};
        }
      }
    }
    
    .btn-filtrar {
      background-color: ${({ theme }) => theme.color1};
      border: none;
      color: white;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 0.95em;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      
      &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
      }
      
      svg {
        font-size: 1.2em;
      }
    }
  }
  
  .lista-cierres {
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-y: auto;
    padding-right: 10px;
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.bg2};
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.color1};
      border-radius: 10px;
      
      &:hover {
        background-color: ${({ theme }) => theme.colorSubtitle};
      }
    }
    
    .cierre-item {
      background-color: ${({ theme }) => theme.bg2};
      border-radius: 15px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      
      &:hover {
        border-color: ${({ theme }) => theme.color1};
        transform: translateX(5px);
      }
      
      .cierre-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding-bottom: 12px;
        border-bottom: 1px solid ${({ theme }) => theme.bg3};
        
        .fecha-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${({ theme }) => theme.text};
          font-size: 0.95em;
          font-weight: 600;
          
          svg {
            font-size: 1.3em;
            color: ${({ theme }) => theme.color1};
          }
        }
        
        .monto-cierre {
          font-size: 1.3em;
          font-weight: 700;
          color: ${({ theme }) => theme.color1};
        }
      }
      
      .cierre-detalles {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        
        .detalle {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${({ theme }) => theme.colorSubtitle};
          font-size: 0.9em;
          
          svg {
            font-size: 1.2em;
          }
        }
      }
      
      .cierre-metodos {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        
        .metodo {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${({ theme }) => theme.text};
          font-size: 0.9em;
          background-color: ${({ theme }) => theme.bg3};
          padding: 8px 12px;
          border-radius: 8px;
          
          svg {
            font-size: 1.2em;
            color: ${({ theme }) => theme.color1};
          }
        }
      }
      
      .cierre-acciones {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        padding-top: 8px;
        
        button {
          flex: 1;
          min-width: 140px;
          padding: 10px 15px;
          border-radius: 10px;
          font-size: 0.9em;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          
          svg {
            font-size: 1.2em;
          }
        }
        
        .btn-ver-detalle {
          background-color: transparent;
          border: 2px solid ${({ theme }) => theme.color1};
          color: ${({ theme }) => theme.color1};
          
          &:hover {
            background-color: ${({ theme }) => theme.color1};
            color: white;
          }
        }
        
        .btn-imprimir {
          background-color: ${({ theme }) => theme.color1};
          border: 2px solid ${({ theme }) => theme.color1};
          color: white;
          
          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
  }
`;
