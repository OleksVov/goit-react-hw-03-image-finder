import React, {Component} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import css from './ImageGallery.module.css'

const apiKey = '34240691-69b0febad4566a0b07df5e473';

export default class ImageGallery extends Component{
    state= {
        images:[],
        loading: false,
        loadMoreImages:false,
        page: 1,
        error: null,
    }

    handleLoadMoreImages=() => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };

 async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchImages;
    const nextSearch = this.props.searchImages;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch || prevPage !== nextPage ) {
        this.setState({loading: true});

        if (prevSearch !== nextSearch) {
    this.setState({page:1, images:[]})
}
       try {
        const response = await axios.get(`https://pixabay.com/api/?q=${nextSearch}&page=${nextPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`);
       

        this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits]
        }));

        this.setState({loadMoreImages: true})
        if (response.data.total === 0) {
            toast.info('We did not find the images you requested');
            this.setState({loadMoreImages: false})
                    }
            
                    if (response.data.hits.length < 12 && response.data.hits.length > 0) {
                        toast.info('we have found all the pictures according to your request');
                        this.setState({loadMoreImages: false})
                    }

       } catch (error) {
        toast.error('Error')
this.setState({error});
       } finally {
        this.setState({loading: false});
        
       }
    }
}




    render() {
        const {loading, loadMoreImages} = this.state
        return (
           <>
           {loading && <Loader/>}
            <ul className={css.imageGallery}>
                {this.state.images.map(image => (
                    <ImageGalleryItem
                    key={image.id}
                    webformatURL={image.webformatURL}
                    tag={image.tag}/>
                ))}
</ul>
{loadMoreImages && <Button onClick={this.handleLoadMoreImages}/>}
           </>
        )
    }
}