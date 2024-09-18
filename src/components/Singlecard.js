import './Singlecard.css'

const Singlecard = ({card, handleChoice, flipped, disabled}) => {

  const handleClick = () => {
    !disabled && handleChoice(card)
  }

  return ( 
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img 
          className="back" 
          src="/img/cover.jpeg" 
          onClick={handleClick}
          alt="card back" 
        />
      </div>
    </div>
  )
}
 
export default Singlecard;