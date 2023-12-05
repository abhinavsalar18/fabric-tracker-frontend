import { CLOUDINARY_URL, CLOUD_NAME, UPLOAD_PRESET } from "./constants";

const uploadImageOnCloudinary = async (image) => {
    const apiUrl = CLOUDINARY_URL;
        if (image.type === 'image/jpeg' || image.type === 'image/png') {
          const data = new FormData();
          data.append('file', image);
          data.append('upload_preset', UPLOAD_PRESET);
          data.append('cloud_name', CLOUD_NAME);
          
          try{
            const result = await fetch(apiUrl, {method: 'POST', body: data} );
            const jsonData = await result.json();
            console.log("imageUrl: ", jsonData.url);
           return jsonData?.url;
          }
          catch (err) {
            console.log(err.message);
            return null;
          }
      }
  }

  export default uploadImageOnCloudinary;