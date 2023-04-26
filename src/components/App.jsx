import React, {Component} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "./Searchbar/Searchbar";
import {ImageGallery} from "./ImageGallery/ImageGallery";
import { toast } from 'react-toastify';
import {Button} from "./Button/Button"
import { Loader } from "./Loader/Loader";
import axios from "axios";
import PropTypes from 'prop-types';

const apiKey = '34240691-69b0febad4566a0b07df5e473';

export class App extends Component {
 
 state = {
  searchImages: '',
  images:[],
  loading: false,
  loadMoreImages:false,
  page: 1,
  error: null,
 };

handleFormSubmit = searchImages => {
  this.setState({searchImages, page:1, images:[]})
}
 
handleLoadMoreImages=() => {
  this.setState(prevState => ({
      page: prevState.page + 1,
  }));
};

async componentDidUpdate(prevProps, prevState) {
const prevSearch = prevState.searchImages;
const nextSearch = this.state.searchImages;
const prevPage = prevState.page;
const nextPage = this.state.page;


if (prevSearch !== nextSearch || prevPage !== nextPage ) {
  this.setState({loading: true});

  
 try {
  const response = await axios.get(`https://pixabay.com/api/?q=${nextSearch}&page=${nextPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`);
 
  this.setState(prevState => ({
      images: [...prevState.images, ...response.data.hits]
  }));

  this.setState({loadMoreImages: true})
  
  if (response.data.total === 0) {
      toast.warn('We did not find the images you requested');
      this.setState({loadMoreImages: false})
              }
      
  if (response.data.hits.length < 12 && response.data.hits.length > 0) {
      toast.info('we have found all the pictures according to your request');
      this.setState({loadMoreImages: false})
              }           

 } catch (error) {
  toast.error('Error')
this.setState({error:error.message});
 } finally {
  this.setState({loading: false});
 
  }
 }
}
  render() {

    const{images, loading, loadMoreImages} = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit}/>
        <ToastContainer autoClose={3000}/>
        {loading&& <Loader/>}
        <ImageGallery images={images}/>
        {loadMoreImages && <Button onClick={this.handleLoadMoreImages}/>}
      </div>
    );
  }
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired
}