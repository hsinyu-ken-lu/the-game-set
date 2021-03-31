import React, { useContext } from 'react';
import './Card.css'
import { store } from './Store.js';

function Card(props) {

    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const getFill = () => {
        let result = "";
        if(props.shading === "fill"){
            result = props.color;
        }else if(props.shading === "pattern-checkers"){
            result = "url(#" + props.color + ")";
        }else{
            result = "transparent"
        }
        return result;
    }

    const generateCard = () => {
        var elements = [];
        for(let i =0; i < props.number; i++){
            if(props.shape === "rectangle"){
                elements.push(
                    <div key={i}>
                        <svg className="svg-container">
                            <polygon points="10,10 40,10 40,90 10,90" className="rectangle" stroke={props.color} fill={getFill()}/>
                        </svg>
                    </div>
                );
            }else if(props.shape === "triangle"){
                elements.push(
                    <div key={i}>
                        <svg className="svg-container">
                            <polygon points="25,10 40,90 10,90" className="triangle" stroke={props.color} fill={getFill()}/>
                        </svg>
                    </div>
                );
            }else{
                elements.push(
                    <div key={i}>
                        <svg className="svg-container">
                            <polygon points="25,10 40,50 25,90 10,50" className="diamond" stroke={props.color} fill={getFill()}/>
                        </svg>
                    </div>
                );
            }
        }
        return elements;
    }

    const cardOnClick = (data_key) => {
        dispatch({type:"CardClick", data_key:data_key});
    }

    const getClassName = () => {
        if(state.clickedCard.includes(props.data_key)){
            return ["card-container", "card-clicked"].join(" ");
        }else{
            return ["card-container", "card-unclicked"].join(" ");
        }
    }

    return (
        <div className={getClassName()} onClick={()=>cardOnClick(props.data_key)}>
            {generateCard()}
            <svg width="0" height="0">
                <defs>
                    <pattern id={props.color} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <rect fill={props.color} x="0" width="5" height="5" y="0"></rect>
                        <rect fill={props.color}  x="5" width="5" height="5" y="5"></rect>
                    </pattern>
                </defs>
            </svg>
        </div>
    );
}

export default Card;