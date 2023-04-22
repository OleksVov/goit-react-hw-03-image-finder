import React, {Component} from "react";
import { toast } from 'react-toastify';
import css from './Searchbar.module.css'


class Searchbar extends Component{
    state = {
        searchImages: '',
    }

handleImagesChange = event => {
    this.setState({searchImages: event.currentTarget.value})
}

handleSubmit = event => {
    event.preventDefault();
    if(this.state.searchImages.trim() === '') {
        toast.info('Enter search term', {
            theme:'colored',
        });
        return;
    }
this.props.onSubmit(this.state.searchImages);
    this.setState({searchImages: ''});
}

    render() {
        const{searchImages} = this.state

        return (
            <header className={css.searchbar}>
  <form  onSubmit={this.handleSubmit} className={css.form}>
    <button type="submit" className={css.button}>
      <span className={css.buttonLabel}>Search</span>
    </button>

    <input
      className={css.input}
      type="text"
      name="searchImages"
      value={searchImages}
      onChange={this.handleImagesChange}
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
        )
    }
}

export default Searchbar