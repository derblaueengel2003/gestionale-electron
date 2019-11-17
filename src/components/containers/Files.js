import React from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

export default class Files extends React.Component {
  state = {
    filenames: '',
    downloadURLs: '',
    filenamesCover: '',
    downloadURLsCover: '',
    filenamesGrundriss: '',
    downloadURLsGrundriss: '',
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
      .ref(this.props.tipo)
      .child(filename)
      .getDownloadURL();

    switch (this.props.tipo) {
      case 'bilder':
        return this.setState(oldState => ({
          filenames: [...oldState.filenames, filename],
          downloadURLs: [...oldState.downloadURLs, downloadURL],
          uploadProgress: 100,
          isUploading: false
        }));
      case 'cover':
        return this.setState(oldState => ({
          filenamesCover: [...oldState.filenamesCover, filename],
          downloadURLsCover: [...oldState.downloadURLsCover, downloadURL],
          uploadProgress: 100,
          isUploading: false
        }));
      case 'grundriss':
        return this.setState(oldState => ({
          filenamesGrundriss: [...oldState.filenamesGrundriss, filename],
          downloadURLsGrundriss: [
            ...oldState.downloadURLsGrundriss,
            downloadURL
          ],
          uploadProgress: 100,
          isUploading: false
        }));
      default:
        return this.state;
    }
  };

  handleRemovePicture = picture => {
    console.log(picture);
    let downloadURLs = this.state.downloadURLs;
    let filenames = this.state.filenames;
    downloadURLs.splice(picture, 1);
    const removedFilename = filenames.splice(picture, 1);
    const [filename] = removedFilename;
    if (downloadURLs === undefined || downloadURLs.length < 1) {
      downloadURLs = '';
    }
    if (filenames === undefined || filenames.length < 1) {
      filenames = '';
    }
    this.setState(() => ({ downloadURLs, filenames }));
    firebase
      .storage()
      .ref(this.props.tipo)
      .child(filename)
      .delete()
      .then(() => {
        console.log('File deleted');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1 className='page-header page-header__title'>
          {this.props.tipo.charAt(0).toUpperCase() + this.props.tipo.slice(1)}
        </h1>
        <label className='button button--secondary-oggetti'>
          Auswählen
          <FileUploader
            hidden
            accept='image/*'
            name='image-uploader-multiple'
            randomizeFilename
            storageRef={firebase.storage().ref(this.props.tipo)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            multiple
          />
        </label>

        <div>
          {this.state.downloadURLs &&
            this.state.downloadURLs.map((downloadURL, i) => {
              return (
                <span key={i}>
                  <img className='foto' src={downloadURL} />
                  <img
                    src='/images/trash.jpg'
                    className='cancella'
                    onClick={() => this.handleRemovePicture(i)}
                  />
                </span>
              );
            })}
        </div>
      </div>
    );
  }
}
