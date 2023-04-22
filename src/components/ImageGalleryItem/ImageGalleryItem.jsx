import React from "react";
import css from './ImageGalleryItem.module.css'


export const ImageGalleryItem = ({tag, webformatURL}) => {
    return (
        <li 
        className={css.imageGalleryItem}
        >
  <img className={css.image} src={webformatURL} alt={tag} />
</li>
    )
}