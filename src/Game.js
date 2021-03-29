import './Game.css';
import Card from './Card.js'
import React, { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { store } from './Store.js';

function Game() {

    const globalState = useContext(store);
    const { state, dispatch } = globalState;
    const { level } = useParams();

    useEffect(() => {
        dispatch({type:"GenerateDeck", level:level});
        dispatch({type:"Reset"});
    },[dispatch, level]); 

    useEffect(() => {
        let timerId;
        if (state.clickedCardLength === 3) {
            timerId = setTimeout(() => {
                dispatch({type:"Check"});
            }, 500);
        }
        return () => clearTimeout(timerId);
    },[state.clickedCardLength, dispatch]); 

    const reset = () => {
        dispatch({type:"Reset"});
    }

    const drawCards = () => {
        dispatch({type:"Draw"});
    }

    const generateCards = () => {
        let elements = [];
        let number = state.currentDeck.length;
        for(let i = 0; i < number; i++){
            let card = state.currentDeck[i];
            elements.push(
                <Card key={i} data_key={i} shape={card.shape} color={card.color} number={card.number} shading={card.shading}/>
            );
        }
        return elements;
    }

    return (
        <div className="landing-page-container">
            <div className="contoller-zone">
                <div className="controller-button" onClick = {() => reset()}>
                    RESET
                </div>
                <div className="controller-button" onClick = {() => drawCards()}>
                    DRAW
                </div>
            </div>
            <div className="messege-zone">
                <h3>{state.messege}</h3>
            </div>
            <div className="card-zone">
                {generateCards()}
            </div>
        </div>
    );
}

export default Game;