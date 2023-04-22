import React, {Component} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";

export class App extends Component {
 state = {
  searchImages: '',
 }
 
handleFormSubmit = searchImages => {
  this.setState({searchImages});
}


  render() {
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
        <ImageGallery searchImages={this.state.searchImages}/>
        <Button/>
      </div>
    );
  }
};
