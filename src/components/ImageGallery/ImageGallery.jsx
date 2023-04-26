import React from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css'
import PropTypes from 'prop-types';


export const ImageGallery =({images}) => {
    
        return (
          
            <ul className={css.imageGallery}>
                {images.map(({id, webformatURL, largeImageURL, tags }) => (
                    <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tag={tags}/>
                ))}
</ul>
        )
    }
    ImageGallery.propTypes = {
        images: PropTypes.array.isRequired
      };