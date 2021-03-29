import React, {createContext, useReducer} from 'react';

const initialState = {
    level:"medium",
    messege:"Welcome to SET",
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
                // shuffle_card
                let new_deck = state.deck;
                for (let i = new_deck.length - 1; i > 0; i--) {  
                    let j = Math.floor(Math.random() * (i + 1)); 
                    let temp = new_deck[i]; 
                    new_deck[i] = new_deck[j]; 
                    new_deck[j] = temp; 
                }

                // create_new_current_deck();
                let new_current_deck = [];
                for(let i = 0; i < state.initialIndex; i++){
                    new_current_deck.push(new_deck[i]);
                }
        
                return {
                    ...state, deck:new_deck, currentDeck:[...new_current_deck], currentIndex:state.initialIndex, messege:"Welcome to SET", clickedCard:[], clickedCardLength:0
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
                    ...state, currentDeck:[...state.currentDeck, ...add_deck], currentIndex:state.currentIndex+3
                };

            case 'CARDCLICK':
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

                    let isSet = 
                        ((firCard.color === secCard.color && firCard.color === thirCard.color && secCard.color === thirCard.color)
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
                }else if(state.clickedCard.includes(action.data_key)){
                
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

export { store, StateProvider }