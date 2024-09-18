
import { useState, useEffect } from 'react';
import './App.css';
import Singlecard from './components/Singlecard';
import Modal from './components/Modal';
import OpenModal from './components/OpenModal';

const cardImages = [
  { "src": "/img/bye-1.jpeg", matched: false },
  { "src": "/img/bye-2.jpeg", matched: false },
  { "src": "/img/keepCalm-1.png", matched: false },
  { "src": "/img/keepCalm-2.png", matched: false },
  { "src": "/img/thx-1.jpeg", matched: false },
  { "src": "/img/thx-2.jpeg", matched: false },
  { "src": "/img/night-1.jpeg", matched: false },
  { "src": "/img/night-2.jpeg", matched: false },
  { "src": "/img/hru-1.jpeg", matched: false },
  { "src": "/img/hru-2.jpeg", matched: false },
  { "src": "/img/imgood-1.jpeg", matched: false },
  { "src": "/img/imgood-2.jpeg", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [numOfFlipped, setNumOfFlipped] = useState(0)
  const [modal, setModal] = useState(true)

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = cardImages
      .sort(() => Math.random() - .5)
      .map((card) => ({...card, id: Math.random() }))
   
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setNumOfFlipped(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

   // compare 2 selected cards
  useEffect(() => {
    
    if (choiceOne && choiceTwo) { 
      setDisabled(true)
      const srcOneString = choiceOne.src.toString()
      const srcTwoString = choiceTwo.src.toString()

      if(srcOneString.match(/.+(?=-\d\.)/)[0] 
      === srcTwoString.match(/.+(?=-\d\.)/)[0]) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if(card.src === choiceOne.src || card.src === choiceTwo.src) {
              setNumOfFlipped(prevNumOfFlipped => prevNumOfFlipped + 1)
              console.log(numOfFlipped)
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  },[choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start a game automaticlly
  useEffect(() => {
    shuffleCards()
  }, [])

  //close the open modal
  const handleClose = () => {
    setModal(false)
  }

  return (
    <div className="App">
      <h1 className='game-title'>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <Singlecard 
            card={card} 
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      {numOfFlipped < 24 && <p>Turns: {turns}</p>}
      {numOfFlipped >= 24 &&
        <Modal shuffleCards={shuffleCards} turns={turns} />
      }
      {modal && <OpenModal handleClose={handleClose} />}
      
    </div>
  );
}

export default App;
