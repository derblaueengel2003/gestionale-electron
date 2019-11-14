// import React, { Component } from 'react';
// import { storage } from '../../firebase/firebase';

// export default class Files extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: null,
//       url: '',
//       progress: 0
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleUpload = this.handleUpload.bind(this);
//   }

//   handleChange = e => {
//     if (e.target.files[0]) {
//       const image = e.target.files[0];
//       this.setState(() => ({ image }));
//     }
//   };

//   handleUpload = () => {
//     const { image } = this.state;
//     const uploadTask = storage.ref(`images/${image.name}`).put(image);
//     uploadTask.on(
//       'state_changed',
//       snapshot => {
//         //progress functions ....
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         this.setState({ progress });
//       },
//       error => {
//         // error function...
//         console.log(error);
//       },
//       () => {
//         //complete function
//         storage
//           .ref('images')
//           .child(image.name)
//           .getDownloadURL()
//           .then(url => {
//             console.log(url);
//             this.setState({ url });
//           });
//       }
//     );
//   };

//   render() {
//     return (
//       <div className='content-container'>
//         <progress value={this.state.progress} max='100' />
//         <div className='row'>
//           <input type='file' multiple onChange={this.handleChange} />
//           <button onClick={this.handleUpload}>Upload File</button>
//         </div>
//         <div>
//           {this.state.url && (
//             <img
//               src={this.state.url}
//               alt='Uploaded images'
//               height='100'
//               width='150'
//             />
//           )}
//         </div>
//       </div>
//     );
//   }
// }
import React from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

export default class Files extends React.Component {
  state = {
    filenames: [],
    downloadURLs: [],
    isUploading: false,
    uploadProgress: 0
  };

  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });

  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });

  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
  };

  render() {
    return (
      <div>
        <FileUploader
          accept='image/*'
          name='image-uploader-multiple'
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          multiple
        />

        <p>Progress: {this.state.uploadProgress}</p>

        <p>Filenames: {this.state.filenames.join(', ')}</p>

        <div>
          {this.state.downloadURLs.map((downloadURL, i) => {
            return <img key={i} src={downloadURL} />;
          })}
        </div>
      </div>
    );
  }
}
