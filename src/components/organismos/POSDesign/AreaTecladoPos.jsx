import styled from "styled-components";
import { Btn1, TotalPos, useCartVentasStore } from "../../../index";
import { Device } from "../../../styles/breakpoints";

export function AreaTecladoPos() {
  const {setStateCheckout} = useCartVentasStore();
  return (
    <Container>
      <section className="areatipopago">
        <article className="box">
            <Btn1 
              funcion={() => setStateCheckout({tipoCobro: "Efectivo"})}
              bgcolor="#7aad52"
              titulo="Efectivo" 
              border="0" h
              eight="70px" 
              width="100%"/>
            <Btn1 
            funcion={() => setStateCheckout({tipoCobro: "Crédito"})}
            titulo="Crédito"  
            border="0" 
            width="100%"/>
        </article>
        <article className="box">
            <Btn1 
              funcion={() => setStateCheckout({tipoCobro: "Tarjeta"})}
              titulo="Tarjeta" 
              border="0" 
              height="70px" 
              width="100%"/>
            <Btn1 
              funcion={() => setStateCheckout({tipoCobro: "Mixto"})}
              titulo="Mixto" 
              border="0" 
              width="100%"/>
        </article>
      </section>
      <section className="totales">
        <div className="subtotal">
            <span>Subtotal: <strong>Q20.00</strong></span>
            <span>Descuento: <strong>Q0.00</strong></span>
            <span>Impuesto: <strong>Q1.60</strong></span>
        </div>
      </section>
      <TotalPos/>
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${(props) => props.theme.color2};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
  width: calc(100% - 5px);
  border-radius: 15px;
  @media ${Device.desktop}{
    position: relative;
    width: auto;
    bottom: initial;
  } 
  .areatipopago{
    display: none;
    @media ${Device.desktop}{
      display: initial;
    }
    .box{
      display: flex;
      gap: 20px;
      margin: 10px;
    }
  }
  .totales{
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    .subtotal{
      display: none;
      flex-direction: column;
      justify-content: end;
      text-align: end;
      gap:10px;
      font-weight: 500;
      @media ${Device.desktop}{
        display: flex;
      }
    }
  }
`;
