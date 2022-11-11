import React from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";

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

    const { saveImage, removeImage, aspectRatio } = this.props;

    return (
      <div>
        {imageToCrop !== null ? (
          <div>
            <div className="mb-4 div-dark">
              <h4 className="text-warning mb-4">Crop Image</h4>
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
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-success hover-focus"
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
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-danger hover-focus"
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
              </button>
            </div>
          </div>
        ) : (
          <div className="div-dark">
            <h4 className="text-warning mb-4">Select an image to upload</h4>
            <input
              className="form-control"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              name="product-title-image"
              onChange={(event) => {
                const imageToCrop = event.target.files[0];
                const imageToCropUrl = URL.createObjectURL(
                  event.target.files[0]
                );
                this.setState({ imageToCrop, imageToCropUrl });
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AddImage;
