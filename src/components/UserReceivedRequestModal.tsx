import { useContext, MouseEvent } from "react";
import { IoClose } from "react-icons/io5";
import { PuzzleContext } from "../Context";
import { IPuzzleProps } from '../interfaces'
import '../css/UserReceivedRequestModal.css';

const UserReceivedRequestModal = ({ closeModal, id, pieceCount, image, category, missingPieces, price, quality, requestID }: IPuzzleProps) => {

  const { updatePuzzleStatus } = useContext(PuzzleContext);

  const handleAcceptRequest = (event: MouseEvent) => {
    updatePuzzleStatus('accepted', requestID)
    closeModal?.(event)
  }
  const handleDenyRequest = (event: MouseEvent) => {
    updatePuzzleStatus('declined', requestID)
    closeModal?.(event)
  }

  return (
    <section className='puzzle-details'>
      <div className='individual-puzzle-details'>
        <div className='puzzle-image-pieces'>
          <img className='puzzle-detail-image' src={image} alt={category + 'puzzle'} />
          <h4>{pieceCount} pieces</h4>
          <div className='request-buttons'>
            <button className='request-button' onClick={event => handleAcceptRequest(event)}>Accept</button>
            <button className='request-button' onClick={event => handleDenyRequest(event)}>Deny</button>
          </div>
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
      <div className='button-icon-flex'>
        <IoClose className='x-icon' size={70} onClick={event => closeModal?.(event)} />
      </div>
    </section>
  )
}

export default UserReceivedRequestModal;