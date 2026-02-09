import styled from "styled-components";
import { useState } from "react";
import { CajaHeader } from "./CajaHeader";
import { CajaCerradaView } from "./CajaCerradaView";
import { ModalAperturaCaja } from "./ModalAperturaCaja";
import { HistorialCierres } from "./HistorialCierres";
import { InfoCaja } from "./InfoCaja";
import { ResumenVentas } from "./ResumenVentas";
import { ResumenCreditos } from "./ResumenCreditos";
import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore, useSucursalesStore, useCajaStore, useCierreCajaStore } from "../../../../index";

export function AperturarCaja() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  
  const { dataempresa } = useEmpresaStore();
  const { sucursalesAsignadasItemSelect } = useSucursalesStore();
  const { dataCaja } = useCajaStore();
  const { mostrarCierresXCaja } = useCierreCajaStore();

  const { data: cierreActual, isLoading } = useQuery({
    queryKey: ["mostrar cierres de caja", { 
      empresa_id: dataempresa?.empresa_id, 
      sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id, 
      caja_id: dataCaja?.caja_id 
    }],
    queryFn: () => mostrarCierresXCaja({
      empresa_id: dataempresa?.empresa_id,
      sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id,
      caja_id: dataCaja?.caja_id
    }),
    enabled: !!(dataempresa?.empresa_id && sucursalesAsignadasItemSelect?.sucursal_id && dataCaja?.caja_id)
  });

  const cajaAbierta = cierreActual && cierreActual.length > 0 && !cierreActual[0]?.fecha_cierre;

  const handleAperturar = (monto) => {
    setMostrarModal(false);
  };

  const handleAbrirModal = () => {
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  const handleVerHistorial = () => {
    setMostrarHistorial(true);
  };

  const handleCerrarHistorial = () => {
    setMostrarHistorial(false);
  };

  if (isLoading) {
    return (
      <Container>
        <p>Cargando...</p>
      </Container>
    );
  }

  return (
    <Container>
      <section className="header-section">
        <CajaHeader />
      </section>
      
      <section className="content-section">
        {!cajaAbierta ? (
          <CajaCerradaView 
            onAperturar={handleAbrirModal}
            onVerHistorial={handleVerHistorial}
          />
        ) : (
          <Main>
            <InfoCaja />
            <ContentResumen>
              <ResumenVentas />
              <ResumenCreditos />
            </ContentResumen>
          </Main>
        )}
      </section>
      
      {mostrarModal && (
        <ModalAperturaCaja 
          onCerrar={handleCerrarModal}
          onAperturar={handleAperturar}
        />
      )}
      
      {mostrarHistorial && (
        <div className="overlay-historial" onClick={handleCerrarHistorial}>
          <div className="historial-container" onClick={(e) => e.stopPropagation()}>
            <HistorialCierres onCerrar={handleCerrarHistorial} />
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({theme}) => theme.bgtotal};
  padding: 20px;
  
  .header-section {
    margin-bottom: 30px;
  }
  
  .content-section {
    width: 100%;
  }
  
  .overlay-historial {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9998;
    padding: 20px;
    backdrop-filter: blur(4px);
    
    .historial-container {
      width: 100%;
      max-width: 1000px;
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentResumen = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
