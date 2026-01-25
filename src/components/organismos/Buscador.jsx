import styled from "styled-components";
import {v} from "../../styles/variables";

export function Buscador({setBuscador, buscador}) {

    function buscar (e){
        setBuscador(e.target.value);
    }

  return (
    <Container>
      <section className="content"> 
        <v.iconobuscar size={24} color={v.colorPrincipal}/>
        <input type="text" placeholder="Buscar..." value={buscador} onChange={buscar}/>
      </section>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 8px;
  height: 48px;
  align-items: center;
  display: flex;
  background: ${(props) => props.theme.bgtotal};
  border: 1px solid ${(props) => props.theme.color2};
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  &:focus-within {
    border-color: ${v.colorPrincipal};
    box-shadow: 0 0 0 3px ${v.colorPrincipal}20;
  }
  
  &:hover {
    border-color: ${v.colorPrincipal}80;
  }
  
  .content{
    padding: 0 1rem;
    gap: 0.75rem;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    
    .icono{
      font-size: 18px;
      flex-shrink: 0;
    }
  }
  
  input{
    font-size: 0.875rem;
    width: 100%;
    outline: none;
    background: transparent;
    border: 0;
    color: ${(props) => props.theme.text};
    
    &::placeholder {
      color: ${(props) => props.theme.text};
      opacity: 0.5;
    }
  }
`;
