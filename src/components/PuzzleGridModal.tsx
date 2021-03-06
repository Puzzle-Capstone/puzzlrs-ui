import { MouseEvent, useContext, useState} from 'react'
import { IoClose } from "react-icons/io5";
import { PuzzleContext } from "../Context";
import { IPuzzleProps } from '../interfaces'
import '../css/PuzzleGridModal.css';

const PuzzleGridModal = ({ closeModal, id, pieceCount, image, category, missingPieces, price, quality }: IPuzzleProps) => {
  const { requestPuzzle, refreshData, user } = useContext(PuzzleContext);
  const [requestError, setRequestError] = useState('');

  const handleRequestPuzzle = (event: MouseEvent) => {
    if (user.username) {
      requestPuzzle(id)
      refreshData(user.id)
      closeModal?.(event)
    } else {
      setRequestError('You are not logged in! Request failed')
    }
  }

  return (
    <section className='puzzle-details'>
      <div className='individual-puzzle-details'>
        <div className='puzzle-image-pieces'>
          <img className='puzzle-detail-image' src={image} alt={category + 'puzzle'} />
          <h4>{pieceCount} pieces</h4>
          <button className='request-button' onClick={event => handleRequestPuzzle(event)}>Request Puzzle</button>
          <p className='request-error-message'>{requestError}</p>
        </div>
        <div className='puzzle-details-modal'>
          <div className='paragraphs'>
            <p className='bold'>Quality: </p>
            <p>{quality}</p>
          </div>
          <div className='paragraphs'>
            <p className='bold'>Category: </p>
            <p>{category}</p>
          </div>
          <div className='paragraphs'>
            <p className='bold'>Original Price Point: </p>
            <p>{price}</p>
          </div>
          <div className='paragraphs'>
            <p className='bold'>Missing Pieces: </p>
            <p>{missingPieces}</p>
          </div>
        </div>
      </div>
      <IoClose className='x-icon' size={70} onClick={event => closeModal?.(event)} />
    </section>
  )
}

export default PuzzleGridModal;