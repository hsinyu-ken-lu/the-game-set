import './Game.css';
import Card from './Card.js'
import React, { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { store } from './Store.js';
import backImage from './images/back.png';
import resetImage from './images/reload.png';
import drawImage from './images/plus.png';

function Game(props) {

    const globalState = useContext(store);
    const { state, dispatch } = globalState;
    const { level } = useParams();

    useEffect(() => {
        dispatch({type:"GenerateDeck", level:level});
        dispatch({type:"Reset"});
    },[dispatch, level]); 

    useEffect(() => {
        let timerId;
        //Set a timer to delay the check function after users click three cards
        if (state.clickedCardLength === 3) {
            timerId = setTimeout(() => {
                dispatch({type:"Check"});
                dispatch({type:"MediumCheck"});
                dispatch({type:"End"});
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

    const getMessege = () => {
        return (
            <div className="messege-zone">
                <h3>{state.messege}</h3>
            </div>
        );
    }

    return (
        <div className="game-page-container">
            <div className="contoller-zone">
                <div className="controller-button" onClick = {() => props.history.push('/')}>
                    <img src={backImage} title="Back"/>
                </div>
                <div className="controller-button" onClick = {() => reset()}>
                    <img src={resetImage} title="Reset"/>
                </div>
                <div className="controller-button" onClick = {() => drawCards()}>
                    <img src={drawImage} title="Draw three cards"/>
                </div>
            </div>
            {getMessege()}
            <div className="card-zone">
                {generateCards()}
            </div>
        </div>
    );
}

export default Game;