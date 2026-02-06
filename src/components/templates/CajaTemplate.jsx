import styled from "styled-components";
import { Device } from "../../styles/breakpoints";
import { blur_in } from "../../styles/keyframes";
import { CajaHeader } from "../organismos/POSDesign/CajaDesign/CajaHeader";
import { InfoCaja } from "../organismos/POSDesign/CajaDesign/InfoCaja";
import { ResumenVentas } from "../organismos/POSDesign/CajaDesign/ResumenVentas";
import { ResumenCreditos } from "../organismos/POSDesign/CajaDesign/ResumenCreditos";

export function CajaTemplate() {
  return (
    <Container>
      <CajaHeader />
      <Main>
        <InfoCaja />
        <ContentResumen>
          <ResumenVentas />
          <ResumenCreditos />
        </ContentResumen>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 60px);
  padding: 20px;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${blur_in} 0.5s linear both;
  overflow: auto;
  
  @media ${Device.tablet}{
    padding: 30px;
    padding-top: 80px;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media ${Device.tablet}{
    gap: 30px;
  }
`;

const ContentResumen = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  @media ${Device.tablet}{
    grid-template-columns: 1fr 1fr;
  }
`;
