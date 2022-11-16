import React from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,

} from "mdb-react-ui-kit";
class AddImage extends React.Component {


  
  state = {
    imageToCrop: null,
    imageToCropUrl: "",
    hasCropped: false,
    pixelCrop: null,
    crop: { x: 0, y: 0 },
    zoom: 1,
  };

  render() {
    const { crop, zoom, imageToCrop, imageToCropUrl } = this.state;

    const { saveImage, removeImage, aspectRatio} = this.props;

     
    function test(){
      console.log("Testing")
    }
    return (
      <div>
       
          <div id="crop-option" hidden={imageToCrop == null}>
            <div className="mb-4 div-dark">
              <h4 className="text-primary h6">Crop Image</h4>
              <div className="cropper mb-3 div-dark">
                <Cropper
                  image={imageToCropUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspectRatio}
                  onCropChange={(crop) => this.setState({ crop })}
                  onCropComplete={(croppedArea, croppedAreaPixels) => {
                    this.setState({
                      pixelCrop: croppedAreaPixels,
                    });
                  }}
                  onZoomChange={(zoom) => this.setState({ zoom })}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }} className="d-flex flex-row align-items-center mb-4">
                <button
                  type="button"
                  className="btn btn-success hover-focus ms-2"
                  onClick={async () => {
                    const { pixelCrop } = this.state;
                    const [croppedImage, croppedImageUrl] = await getCroppedImg(
                      imageToCropUrl,
                      pixelCrop
                    );

                    saveImage(croppedImageUrl, croppedImage);
                    this.setState({
                      imageToCrop: null,
                      imageToCropUrl: "",
                      hasCropped: false,
                      pixelCrop: null,
                      crop: { x: 0, y: 0 },
                      zoom: 1,
                    });
                  }}
                >
                  Done
                </button>
 
              {/* <button
                type="button"
                className="btn btn-danger hover-focus ms-2"
                onClick={() => {
                  removeImage();
                  this.setState({
                    imageToCrop: null,
                    imageToCropUrl: "",
                    hasCropped: false,
                    pixelCrop: null,
                    crop: { x: 0, y: 0 },
                    zoom: 1,
                  });
                }}
              >
                Remove
              </button> */}
            </div>
            </div>

          </div>
       
          <div className="div-dark"  id="select-option" hidden={imageToCrop != null}>
            <h4 className="text-primary h6">Select an image to upload</h4>
            <MDBInput
              className="form-control"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              name="product-title-image"
              onChange={(event) => {
                console.log(event.target.files[0].name)
                const fileName = event.target.files[0].name;
                const imageToCrop = event.target.files[0];
                const imageToCropUrl = URL.createObjectURL(
                  event.target.files[0]
                );
                this.setState({ imageToCrop, imageToCropUrl, fileName });
              }}
              // value={fileName}
              required
            />
          </div>
          
      </div>

      
    );
  }
}

export default AddImage;
