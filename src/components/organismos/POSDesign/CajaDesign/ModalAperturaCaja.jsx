import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import { useUsuariosStore, Reloj, Btn1, useEmpresaStore, useSucursalesStore, useCajaStore, useCierreCajaStore } from "../../../../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function ModalAperturaCaja({ onCerrar, onAperturar }) {
  const [montoEfectivo, setMontoEfectivo] = useState(0);
  const queryClient = useQueryClient();
    const {dataUsuarios} = useUsuariosStore();
    const {dataempresa} = useEmpresaStore();
    const {sucursalesAsignadasItemSelect} = useSucursalesStore();
    const {mostrarCajaXSucursal, dataCaja} = useCajaStore();
    const {aperturarCaja} = useCierreCajaStore();

    const insertar = async (p) => {
        const pApertura = {
            usuario_id: dataUsuarios?.usuario_id,
            caja_id: dataCaja?.caja_id,
            saldo_apertura: montoEfectivo,
            sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id,
            empresa_id: dataempresa?.empresa_id,
        }
        await aperturarCaja(pApertura);
    }

    const mutation = useMutation({
        mutationKey: ["aperturar caja"],
        mutationFn: insertar,
        onSuccess: () => {
            toast.success("Caja aperturada con éxito");
            queryClient.invalidateQueries(["mostrar cierres de caja", { empresa_id: dataempresa?.empresa_id, sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id, caja_id: dataCaja?.caja_id}]);
            onAperturar(montoEfectivo);
        },
        onError: (error) => {
            toast.error("Error al aperturar caja: " + error.message);
        }
    })

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleNumeroClick = (numero) => {
    const montoStr = montoEfectivo.toString();
    if (montoEfectivo === 0) {
      setMontoEfectivo(parseFloat(numero) || 0);
    } else {
      setMontoEfectivo(parseFloat(montoStr + numero) || 0);
    }
  };

  const handleBorrar = () => {
    const montoStr = montoEfectivo.toString();
    if (montoStr.length > 1) {
      setMontoEfectivo(parseFloat(montoStr.slice(0, -1)) || 0);
    } else {
      setMontoEfectivo(0);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numValue = parseFloat(value);
    
    if (value === '' || value === '0') {
      setMontoEfectivo(0);
    } else if (!isNaN(numValue)) {
      setMontoEfectivo(numValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAperturar();
    } else if (e.key === "Escape") {
      onCerrar();
    }
  };

  const handleAperturar = async () => {
    if (montoEfectivo >= 0) {
      try {
        await mutation.mutateAsync();
      } catch (error) {
        console.error("Error al aperturar:", error);
      }
    }
  };

  const handleAperturarSinMonto = async () => {
    setMontoEfectivo(0);
    try {
      await mutation.mutateAsync();
    } catch (error) {
      console.error("Error al aperturar:", error);
    }
  };

  return (
    <Overlay onClick={onCerrar}>
      <Container onClick={(e) => e.stopPropagation()}>
        <article className="header">
          <h2>Apertura de caja</h2>
          <button className="btn-cerrar" onClick={onCerrar}>
            <Icon icon="mdi:close" />
          </button>
        </article>
        
        <article className="contenido">
          <p className="instruccion">Ingresa un monto para iniciar tu caja.</p>
          <Reloj />
          
          <div className="display-monto">
            <input
              ref={inputRef}
              type="number"
              value={montoEfectivo}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="input-monto"
              step="0.01"
              min="0"
            />
          </div>
          
          <div className="teclado-numerico">
            <button className="tecla" onClick={() => handleNumeroClick("1")}>1</button>
            <button className="tecla" onClick={() => handleNumeroClick("2")}>2</button>
            <button className="tecla" onClick={() => handleNumeroClick("3")}>3</button>
            <button className="tecla" onClick={() => handleNumeroClick("4")}>4</button>
            <button className="tecla" onClick={() => handleNumeroClick("5")}>5</button>
            <button className="tecla" onClick={() => handleNumeroClick("6")}>6</button>
            <button className="tecla" onClick={() => handleNumeroClick("7")}>7</button>
            <button className="tecla" onClick={() => handleNumeroClick("8")}>8</button>
            <button className="tecla" onClick={() => handleNumeroClick("9")}>9</button>
            <button className="tecla" onClick={() => handleNumeroClick("00")}>00</button>
            <button className="tecla" onClick={() => handleNumeroClick("0")}>0</button>
            <button className="tecla" onClick={() => handleNumeroClick(".")}>.</button>
            <button className="tecla-borrar" onClick={handleBorrar}>
              <Icon icon="mdi:backspace-outline" />
            </button>
            <button className="tecla-ok" onClick={handleAperturar}>OK</button>
          </div>
        </article>
        
        <article className="acciones">
          <button className="btn-sin-monto" onClick={handleAperturarSinMonto}>
            Abrir con Q 0.00
          </button>
          <Btn1
            funcion={handleAperturar}
            titulo="Lo haré luego"
            bgcolor="#2196F3"
            color="#fff"
            width="100%"
          />
        </article>
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgcards};
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px;
    border-bottom: 2px solid ${({ theme }) => theme.bg2};
    
    h2 {
      margin: 0;
      font-size: 1.3em;
      font-weight: 600;
      color: ${({ theme }) => theme.text};
    }
    
    .btn-cerrar {
      background-color: transparent;
      border: none;
      color: ${({ theme }) => theme.colorSubtitle};
      cursor: pointer;
      padding: 5px;
      border-radius: 8px;
      display: flex;
      
      svg {
        font-size: 1.5em;
      }
      
      &:hover {
        background-color: ${({ theme }) => theme.bg2};
      }
    }
  }
  
  .contenido {
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    .instruccion {
      text-align: center;
      color: ${({ theme }) => theme.colorSubtitle};
      font-size: 0.9em;
      margin: 0;
    }
    
    .fecha-actual {
      text-align: center;
      color: ${({ theme }) => theme.color1};
      font-size: 0.95em;
      font-weight: 600;
    }
    
    .display-monto {
      background-color: ${({ theme }) => theme.bg2};
      border-radius: 12px;
      padding: 15px;
      text-align: center;
      
      .input-monto {
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        font-size: 2em;
        font-weight: 700;
        color: ${({ theme }) => theme.text};
        text-align: center;
        
        &::before {
          content: 'Q ';
        }
      }
    }
    
    .teclado-numerico {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      
      .tecla {
        height: 50px;
        border: 1px solid ${({ theme }) => theme.bg2};
        background-color: ${({ theme }) => theme.bgtotal};
        color: ${({ theme }) => theme.text};
        font-size: 1.2em;
        font-weight: 600;
        border-radius: 10px;
        cursor: pointer;
        user-select: none;
        
        &:hover {
          background-color: ${({ theme }) => theme.bg2};
        }
        
        &:active {
          opacity: 0.7;
        }
      }
      
      .tecla-borrar {
        height: 50px;
        border: 1px solid ${({ theme }) => theme.bg2};
        background-color: ${({ theme }) => theme.bg2};
        color: ${({ theme }) => theme.text};
        font-size: 1.2em;
        border-radius: 10px;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
        
        svg {
          font-size: 1.1em;
        }
        
        &:hover {
          background-color: ${({ theme }) => theme.bg3};
        }
        
        &:active {
          opacity: 0.7;
        }
      }
      
      .tecla-ok {
        height: 50px;
        border: 1px solid #2196F3;
        background-color: #2196F3;
        color: white;
        font-size: 1em;
        font-weight: 700;
        border-radius: 10px;
        cursor: pointer;
        user-select: none;
        grid-column: span 2;
        
        &:hover {
          background-color: #1976D2;
        }
        
        &:active {
          opacity: 0.7;
        }
      }
    }
  }
  
  .acciones {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 15px 25px 20px;
    border-top: 2px solid ${({ theme }) => theme.bg2};
    
    .btn-sin-monto {
      background-color: transparent;
      border: 2px solid ${({ theme }) => theme.colorSubtitle};
      color: ${({ theme }) => theme.colorSubtitle};
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 0.95em;
      font-weight: 600;
      cursor: pointer;
      
      &:hover {
        background-color: ${({ theme }) => theme.bg2};
      }
    }
  }
`;
