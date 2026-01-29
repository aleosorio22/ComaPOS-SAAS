import styled from "styled-components";
import { Title, Btn1, Buscador, RegistrarClientesProveedores, useClientesProveedoresStore, TablaClientesProveedores } from "../../index";
import {v} from "../../styles/variables";
import { useState } from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import { useLocation } from "react-router-dom";

export function ClientesProveedoresTemplate() {
  const {setTipo, dataCP, setBuscador, buscador} = useClientesProveedoresStore();
  const [accion, setAccion] = useState("");
  const [dataSelect, setdataSelect] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const location = useLocation();

  const [openRegistro, setOpenRegistro] = useState(false);
  function nuevoRegistro(){
    const tipo = location.pathname ==="/configuracion/clientes" ? "Cliente" : "Proveedor";
    setTipo(tipo);
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
    setIsExploding(false);
  }

  return (
    <Container>
      {
        openRegistro && 
        (<RegistrarClientesProveedores setIsExploding={setIsExploding}
          onClose={()=>setOpenRegistro(!openRegistro)} 
          dataSelect={dataSelect} 
          accion={accion}/>)
      }
      <section className="area1">
        <Title>{location.pathname.includes("clientes") ? "Clientes" : "Proveedores"}</Title>
        <Btn1 funcion={nuevoRegistro} bgcolor={v.colorPrincipal} titulo="Agregar" icono={<v.iconoagregar />} color={v.colorTerciario} />
      </section>
      <section className = "area2">
        <Buscador setBuscador={setBuscador} buscador={buscador}/>
      </section>
      <section className="main">
        {
          isExploding && <ConfettiExplosion force={0.4} duration={2000} particleCount={30} width={400}/>
        }
        <TablaClientesProveedores setdataSelect={setdataSelect} setAccion={setAccion} setOpenRegistro={setOpenRegistro} data={dataCP} />
      </section>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 30px);
  padding: 15px;
  display: grid;
  padding: 50px;
  grid-template: 
  "area1" 60px
  "area2" 60px
  "main" auto;
  .area1{
    grid-area: area1;
    /* background-color: rgba(255, 0, 0, 0.2); */
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
    padding-bottom: 15px;
  }
  .area2{
    grid-area: area2;
    /* background-color: rgba(0, 0, 255, 0.2); */
    display: flex;
    justify-content: end;
    align-items: center;
    padding-bottom: 20px;
  }
  .main{
    grid-area: main;
    /* background-color: rgba(0, 255, 0, 0.2); */
  }
`;
