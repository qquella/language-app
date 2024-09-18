import './Modal.css'
import ReactDOM from 'react-dom'


export default function Modal({ shuffleCards, turns }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h1>Gut gemacht! <br />Bravo, bien joué!</h1>
        <p>You have matched all the cards in {turns} turns!! </p>
        <button onClick={shuffleCards}>New Game</button>
      </div>
    </div>
  )
}