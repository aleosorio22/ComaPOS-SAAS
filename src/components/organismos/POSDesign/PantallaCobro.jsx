import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IngresoCobro, useCartVentasStore } from "../../../index";

export function PantallaCobro() {
  const [stateVerTicket, setStateVerTicket] = useState(false);
  const {setStateCheckout} = useCartVentasStore();
  const ingresoCobroRef = useRef();
  useEffect(() => {
    const handleKeyDown = (event) =>{
      if (event.key === 'Enter') {
        event.preventDefault(); // Evitar la acción predeterminada
        if(ingresoCobroRef.current){
          ingresoCobroRef.current.mutateAsync();
        }
      }
    };
    
    //anadir el document event listener
    document.addEventListener('keydown', handleKeyDown);
    
    //limpiar el event listener al desmontar
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <Container>
      <section className="contentingresocobro">
        <article className="contentverticket" onClick={()=>setStateVerTicket(!stateVerTicket)}>
          <span>{stateVerTicket ? "ocultar":"mostrar"} ticket</span>
          {
            stateVerTicket?(<Icon icon="mdi:ticket" className="icono"/>):(<Icon icon="mdi:ticket-outline" className="icono" />)
          }
        </article>
        <IngresoCobro ref={ingresoCobroRef}/>
        <article className="contentverticket" onClick={setStateCheckout}>
          <Icon icon="icon-park-solid:back"/>
          <span>Volver</span>
        </article>
      </section>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 100;
  background-color: ${({ theme }) => theme.bgtotal};
  .contentingresocobro{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: calc(100%-10rem);
    .contentverticket{
      align-self: flex-end;
      cursor: pointer;
      display: flex;
      gap: 10px;
      align-items: center;
      span{
        font-weight: 700;
        font-size: 18px;
      }
      .icono{
        font-size: 30px;
      }
    }
  }
`;
