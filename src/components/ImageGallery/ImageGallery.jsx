import React, {Component} from "react";
import axios from "axios";
import css from './ImageGallery.module.css'
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export default class ImageGallery extends Component{
    state= {
        images:[],
        loading: false,
    }

 async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchImages;
    const nextSearch = this.props.searchImages;

    if (prevSearch !== nextSearch) {
        this.setState({loading: true});
        const response = await axios.get(`https://pixabay.com/api/?q=${nextSearch}&page=1&key=34240691-69b0febad4566a0b07df5e473&image_type=photo&orientation=horizontal&per_page=12`);
        this.setState({images:response.data.hits});
        console.log(this.state.images);
        this.setState({loading: false});
    }
}




    render() {
        return (
            <ul className={css.imageGallery}>
                {this.state.images.map(image => (
                    <ImageGalleryItem
                    key={image.id}
                    webformatURL={image.webformatURL}/>
                ))}
</ul>
        )
    }
}