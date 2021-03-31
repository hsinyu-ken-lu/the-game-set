import React, {createContext, useReducer} from 'react';

const initialState = {
    level:"medium",
    messege:"New Game",
    shape:["rectangle","triangle","diamond"],
    color:["orange","green","red"],
    number:[1,2,3],
    shading:["fill","transparent","pattern-checkers"],
    deck:[],
    initialIndex:12,
    currentDeck:[],
    currentIndex:0,
    clickedCard:[],
    clickedCardLength:0
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
        let level = action.level;
        let hasSet = false;
        switch(action.type) {

            case 'GenerateDeck':
                let card_deck = [];
                let shadingArr = level === "easy" ? ["fill"] : state.shading;
                for(let shape in state.shape){
                    for(let color in state.color){
                        for(let number in state.number){
                            for(let shading in shadingArr){
                                let card = {};
                                card.shape = state.shape[shape];
                                card.color = state.color[color];
                                card.number = state.number[number];
                                card.shading = shadingArr[shading];
                                card_deck.push(card);
                            }
                        }
                    }
                }
                return {
                    ...state, deck:card_deck, level:level
                };

            case 'Reset':
                let new_deck = state.deck;
                let new_current_deck = [];
                while(hasSet === false){
                    // shuffle_card
                    for (let i = new_deck.length - 1; i > 0; i--) {  
                        let j = Math.floor(Math.random() * (i + 1)); 
                        let temp = new_deck[i]; 
                        new_deck[i] = new_deck[j]; 
                        new_deck[j] = temp; 
                    }

                    // create_new_current_deck();
                    for(let i = 0; i < state.initialIndex; i++){
                        new_current_deck.push(new_deck[i]);
                    }

                    if(state.level === "hard"){
                        hasSet = true;
                    }else{
                        //for easy and medium, make sure it has a set at beginning
                        for(let i = 0;i < new_current_deck.length; i++){
                            for(let j = i+1; j < new_current_deck.length; j++){
                                for(let k = j+1; k < new_current_deck.length; k++){
                                    let firCard = new_current_deck[i];
                                    let secCard = new_current_deck[j];
                                    let thirCard = new_current_deck[k];
                                    if(checkSet(firCard, secCard, thirCard)){
                                        hasSet = true
                                    }
                                }
                            }
                        }
                    }
                }
        
                return {
                    ...state, deck:new_deck, currentDeck:[...new_current_deck], currentIndex:state.initialIndex, messege:"New Game", clickedCard:[], clickedCardLength:0
                };

            case 'Draw':
                let add_deck = [];
                console.log(state.currentDeck.length+", "+state.deck.length+", "+state.currentIndex)
                if(state.currentIndex < state.deck.length){
                    for(let i = state.currentIndex; i < state.currentIndex+3; i++){
                        add_deck.push(state.deck[i]);
                    }
                }else{
                    return {
                        ...state, messege:"No more Cards"
                    };
                }
                return {
                    ...state, currentDeck:[...state.currentDeck, ...add_deck], currentIndex:state.currentIndex+3, messege:"Draw 3 cards"
                };

            case 'CardClick':
                let newClickedCard = [...state.clickedCard];
                let newClickedCardLength = state.clickedCardLength;
                //If clicked, then cancel
                if(state.clickedCard.includes(action.data_key)){
                    var index = state.clickedCard.indexOf(action.data_key);
                    if (index > -1) {
                        state.clickedCard.splice(index, 1);
                    }
                    newClickedCardLength = newClickedCardLength - 1;
                    return {
                        ...state, clickedCard:state.clickedCard, clickedCardLength:newClickedCardLength
                    };
                }else{
                    if(newClickedCard.length < 3){
                        newClickedCard.push(action.data_key);
                        newClickedCardLength = newClickedCardLength + 1
                    }
                }
                return {
                    ...state, clickedCard:newClickedCard, clickedCardLength:newClickedCardLength
                };

            case 'Check':
                console.log(state.level)
                if(state.clickedCard.length === 3){
                    let firCard = state.currentDeck[state.clickedCard[0]];
                    let secCard = state.currentDeck[state.clickedCard[1]];
                    let thirCard = state.currentDeck[state.clickedCard[2]];

                    let isSet = checkSet(firCard, secCard, thirCard);
                    let newCurrentDeck = [...state.currentDeck];
                    let sortDeck = [state.clickedCard[0], state.clickedCard[1], state.clickedCard[2]];

                    let newMessge = "";
                    let newCurrentIndex = state.currentIndex
                    //Compare Set
                    if(isSet){
                        let numberSort = function (a,b) {
                            return a - b;
                        };
                        sortDeck.sort(numberSort);
                        for(let i = sortDeck.length - 1; i >= 0; i--){
                            newCurrentDeck.splice(sortDeck[i], 1);
                        }
                        newMessge = "SET is removed";
                        if(newCurrentDeck.length < state.initialIndex && state.currentIndex < state.deck.length){
                            for(let i = state.currentIndex; i < state.currentIndex+3; i++){
                                newCurrentDeck.push(state.deck[i]);
                            }
                            newCurrentIndex = state.currentIndex+3
                        }
                        if(newCurrentDeck.length === 0){
                            newMessge = "Congradulations, it's all set";
                        }
                    }else{
                        newMessge = "Not a SET";
                    }
                    return {
                        ...state, clickedCard:[], currentDeck:newCurrentDeck, messege:newMessge, currentIndex:newCurrentIndex, clickedCardLength:0
                    };
                }
                return {
                    ...state
                };

            case 'MediumCheck':
                let newDeck = state.currentDeck;
                let newIndex = state.currentIndex;
                while(state.level === "medium" && newIndex !== state.deck.length){
                    for(let i = 0;i < newDeck.length; i++){
                        for(let j = i+1; j < newDeck.length; j++){
                            for(let k = j+1; k < newDeck.length; k++){
                                let firCard = newDeck[i];
                                let secCard = newDeck[j];
                                let thirCard = newDeck[k];
                                if(checkSet(firCard, secCard, thirCard)){
                                    return{
                                        ...state, currentDeck:[...newDeck], currentIndex:newIndex
                                    }
                                }
                            }
                        }
                    }
                    //draw    
                    for(let i = newIndex; i < newIndex+3; i++){
                        newDeck.push(state.deck[i]);
                    }
                    newIndex = newIndex + 3 
                }

                return {
                    ...state, currentDeck:[...newDeck], currentIndex:newIndex
                };
            
            case 'End':
                hasSet = false;
                for(let i = 0;i < state.currentDeck.length; i++){
                    for(let j = i+1; j < state.currentDeck.length; j++){
                        for(let k = j+1; k < state.currentDeck.length; k++){
                            let firCard = state.currentDeck[i];
                            let secCard = state.currentDeck[j];
                            let thirCard = state.currentDeck[k];
                            if(checkSet(firCard, secCard, thirCard)){
                                hasSet = true
                            }
                        }
                    }
                }
                if(hasSet === false && state.currentIndex === state.deck.length){
                    return {
                        ...state, messege:"No more Set, please reset the game",
                    };
                }
                return {
                    ...state
                };
            default:
                throw new Error();
            };
        }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const checkSet = (firCard, secCard, thirCard) => {
    return ((firCard.color === secCard.color && firCard.color === thirCard.color && secCard.color === thirCard.color)
    || (firCard.color !== secCard.color && firCard.color !== thirCard.color && secCard.color !== thirCard.color))
    &&
    ((firCard.shape === secCard.shape && firCard.shape === thirCard.shape && secCard.shape === thirCard.shape)
    || (firCard.shape !== secCard.shape && firCard.shape !== thirCard.shape && secCard.shape !== thirCard.shape))
    && 
    ((firCard.number === secCard.number && firCard.number === thirCard.number && secCard.number === thirCard.number)
    || (firCard.number !== secCard.number && firCard.number !== thirCard.number && secCard.number !== thirCard.number))
    && 
    ((firCard.shading === secCard.shading && firCard.shading === thirCard.shading && secCard.shading === thirCard.shading)
    || (firCard.shading !== secCard.shading && firCard.shading !== thirCard.shading && secCard.shading !== thirCard.shading))
}


export { store, StateProvider }