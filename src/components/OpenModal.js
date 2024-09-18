import './OpenModal.css'
import ReactDOM from 'react-dom'


const OpenModal = ( {handleClose} ) => {
  return ( 
    <div className="modal-backdrop">
      <div className="modal">
        <h1>Herzlich willkommen bei Magic Match! <br />
        Bienvenue sur le site "Magic Match"!</h1>
        <p>Click on a card to turn and see its content! Your goal is to match all the similar phases in French and German. </p>
        <button onClick={handleClose}>Start Game</button>
      </div>
    </div>
   );
}
 
export default OpenModal;