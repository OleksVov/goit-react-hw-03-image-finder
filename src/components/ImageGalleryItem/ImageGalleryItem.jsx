import React, {Component} from "react";
import css from './ImageGalleryItem.module.css'
import Modal from "components/Modal/Modal";


export class ImageGalleryItem extends Component {
   
   state = {
    showModal: false,
   }
    toggleModal = () => {
        this.setState(state => ({
            showModal: !state.showModal
        }))
    }
   
   render() {

    const {webformatURL,largeImageURL, tag} = this.props;
    const {showModal} = this.state;
    return (
        <>
          <li 
          className={css.imageGalleryItem}
          >
    <img className={css.image} src={webformatURL} alt={tag} onClick={this.toggleModal} />
  </li>

  {showModal && (<Modal onCloseModal={this.toggleModal}>
    <img src={largeImageURL} alt={tag} />
  </Modal>)}
  
  </>
      )
   }
    
}