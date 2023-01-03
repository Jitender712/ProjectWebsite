import React,{ useState } from "react";
import { Client_URL } from "./components/Constants/Constant";

export const LandingPage = () => {
    const [picture, setPicture] = useState({});
  
    const uploadPicture = (e) => {
      setPicture({
        /* contains the preview, if you want to show the picture to the user
             you can access it with this.state.currentPicture
         */
        picturePreview: URL.createObjectURL(e.target.files[0]),
        /* this contains the file we want to send */
        pictureAsFile: e.target.files[0],
      });
    };
  
    const setImageAction = async (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append("file", picture.pictureAsFile);
  
      console.log(picture.pictureAsFile);
  
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
  
      const data = await fetch(`${Client_URL}//v1/client/Settings/uploadImage`, {
        method: "put",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
      const uploadedImage = await data.json();
      if (uploadedImage) {
        console.log("Successfully uploaded image");
      } else {
        console.log("Error Found");
      }
    };
  
    return (
      <div className="content landing">
        <form onSubmit={setImageAction}>
          <input type="file" name="image" onChange={uploadPicture} />
          <br />
          <br />
          <button type="submit" name="upload">
            Upload
          </button>
        </form>
      </div>
    );
  };