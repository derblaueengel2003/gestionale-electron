import React, { Component } from 'react';
import { storage } from '../../firebase/firebase';

export default class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        //progress functions ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // error function...
        console.log(error);
      },
      () => {
        //complete function
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            this.setState({ url });
          });
      }
    );
  };

  render() {
    return (
      <div className='content-container'>
        <progress value={this.state.progress} max='100' />
        <div className='row'>
          <input type='file' onChange={this.handleChange} />
          <button onClick={this.handleUpload}>Upload File</button>
        </div>
        <div>
          {this.state.url !== '' && (
            <img
              src={this.state.url}
              alt='Uploaded images'
              height='100'
              width='150'
            />
          )}
        </div>
      </div>
    );
  }
}
