import './Rules.css';
import backImage from './images/back.png';

function Rules(props) {
  return (
    <div className="rule-container">
      <div className="rule-contoller-zone">
        <div className="rule-controller-button" onClick = {() => props.history.push('/')}>
          <img src={backImage} title="Back"/>
        </div>      
      </div>
      <div className="content-container">
        <h1>Rules</h1>
      <div>
        <h4>
          The object of the game is to identify a 'Set' of three cards from 12 cards laid out on the table. Each card has a variation of the following four features:
        </h4>
        <ol>
          <li>COLOR: Each card is red, green, or orange.</li>
          <li>SYMBOL: Each card contains rectangles, triangles, or diamonds.</li>
          <li>NUMBER: Each card has one, two, or three symbols.</li>
          <li>SHADING: Each card is solid, blank, or square-filled.</li>
        </ol>
        <h4>
          A 'Set' consists of three cards in which each feature is EITHER the same on each card OR is different on each card. That is to say, any feature in the 'Set' of three cards is either common to all three cards or is different on each card.
        </h4>
        <h3>
          Examples of sets:
        </h3>
        <ol>
          <li>
            <h5>color: different on each card, symbol: the same on each card (diamonds), number: the same on each (two), shading: the same on each card (solid)</h5>
            <ul>
              <li>diamand solid orange 2</li>
              <li>diamand solid red 2</li>
              <li>diamand solid green 2</li>
            </ul>
          </li>
          <li>
            <h5>color: different on each card, symbol: different on each card, number: different on each card, shading: different on each card</h5>
            <ul>
              <li>diamond square-filled orange 2</li>
              <li>rectangle solid red 1</li>
              <li>tiangle blank green 3</li>
            </ul>
          </li>
          <li>
            <h5>color: the same on each card (green), symbol: the same on each card (diamond), number: different on each card, shading: different on each card</h5>
            <ul>
              <li>diamond solid green 2</li>
              <li>diamond square-filled green 3</li>
              <li>diamond blank green 1</li>
            </ul>
          </li>
        </ol>
      </div>
      </div>
    </div>
  );
}

export default Rules;