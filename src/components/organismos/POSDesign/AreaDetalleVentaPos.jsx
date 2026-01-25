import styled from "styled-components";
import {blur_in} from "../../../styles/keyframes";
import {v} from "../../../styles/variables";
import { Icono } from "../../atomos/Icono";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
import {Btn1, Lottieanimation, useCartVentasStore} from "../../../index"
import animacionvacio from "../../../assets/vacioanimacion.json"
import { Icon } from "@iconify/react";

export function AreaDetalleVentaPos() {
    const {items, addCantidadItem, restarCantidadItem, removeItem} = useCartVentasStore();
    
  return (
    <AreaDetalleVenta className={items?.length>0?"":"animacion"}>
    {
            items?.length>0?(
            items?.map((item, index) =>{
            
            return (
            <Itemventa key={index}>
                <article className="contentcantidad">
                    <Btn1 
                        icono={<Icon icon="mdi:add-bold" width="10px" height="10px" />}
                        funcion={() => addCantidadItem(item)}
                        width="10px"
                        height="10px"                    
                    />                    
                    <span className="cantidad">{item._cantidad}</span>
                    <Btn1 
                        icono={<Icon icon="subway:subtraction-1" width="10px" height="10px" />}
                        funcion={() => restarCantidadItem(item)}
                        width="10px"
                        height="10px"                    
                    />
                </article>
                <article className="contentdescripcion">
                    <span className="descripcion">{item._descripcion}</span>
                    <span className="importe">{FormatearNumeroDinero(item._precio_venta)}</span>                   
                </article>
                <article className="contentbotones">


                </article>
                <article className="contenttotal">
                    <span className="precio">{FormatearNumeroDinero(item._total)}</span>
                    <span className="delete" onClick={() => removeItem(item)}>
                        <Icono><v.iconeliminarTabla /></Icono>
                    </span> 
                </article>
            </Itemventa>
            ) 
        })
            ):(<Lottieanimation animacion ={animacionvacio} ancho="200" alto="200"/>)
        
         
    }
        
    </AreaDetalleVenta>
  );
}

const AreaDetalleVenta = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
    flex-direction: column;
    gap: 10px;
    &.animacion{
        height: 100%;
        justify-content: center;

    }

`;


const Itemventa = styled.section`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px dashed ${({ theme }) => theme.color2};
    animation: ${blur_in} 0.5s linear both;
    
    .contentcantidad{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        min-width: 50px;
        margin-bottom: 10px;
        .cantidad{
            font-size: 18px;
            font-weight: 600;
        }

    }
    
    .contentdescripcion{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        .descripcion{
            font-weight: 600;
            font-size: 16px;
        }
    }
    
    .contentbotones{
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        height: 100%;

    }

    .contenttotal{
        display: flex;
        flex-direction: column;
        align-items: end;
        min-width: 80px;
        justify-content: flex-end;
        .precio{
            font-size: 18px;
            font-weight: 700;
            color: ${({ theme }) => theme.text};
        }
        .delete{
            cursor: pointer;
            color: ${v.rojo};
            &:hover{
                opacity: 0.7;
            }
        }        
    }
`; 
