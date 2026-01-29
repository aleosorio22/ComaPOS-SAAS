import { Icon } from "@iconify/react";
import styled from "styled-components";
import { Buscador } from "../Buscador";

export function PanelBuscador({setStateBuscador, setBuscador, displayField, displayField2, data, selector}) {
  return (
    <Container>
        <div className="subcontent">
            <Icon className="icono" icon="ep:arrow-left-bold" onClick={setStateBuscador}/>
            <Buscador setBuscador={setBuscador}/>
            {
                data?.map((item, index) =>{
                    return(
                        <Item  key={index} onClick={() => {
                            selector(item) 
                            setStateBuscador();}}>
                            <div className="item-content">
                                <span className="item-name">🌫️ {item[displayField]}</span>
                                {item[displayField2] && (
                                    <span className="item-description">{item[displayField2]}</span>
                                )}
                                <Linea/>
                            </div>
                            
                        </Item>
                    )
                } )
            }
        </div>
    </Container>
  );
}

const Container = styled.div`
    background-color: #fff;
    height: 100%;
    position: absolute;
    width: 100%;
    .subcontent{
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        .icono{
            cursor: pointer;
        }
    }
`;

const Item = styled.div`
    border-radius: 5px;
    padding: 10px;
    display: flex;
    gap: 8px;
    transition: background-color 0.2s ease;
    
    &:hover{
        background-color: #e0e0e0;
        cursor: pointer;
    }
    
    .item-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;
        
        .item-name {
            font-size: 16px;
            font-weight: 500;
            color: #333;
        }
        
        .item-description {
            font-size: 13px;
            color: #888;
            font-weight: 400;
        }
    }
`;

const Linea= styled.span`
    width: 100%;
    border-bottom: 1px dashed #d4d4d4;
`