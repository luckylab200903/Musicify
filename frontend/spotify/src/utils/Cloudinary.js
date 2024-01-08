import { Cloudinary as CoreCloudinary, Util } from "cloudinary-core";

export const url = (publicId, options) => {
  try {
    const scOptions = Util.withSnakeCaseKeys(options);
    const cl = CoreCloudinary.new();
    return cl.url(publicId, scOptions);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const openUploadWidget=(options,callback)=>{
    return window.cloudinary.openUploadWidget(options,callback)
}


// const audioElement = new Audio('');

// // Fetch metadata from Cloudinary
// async function fetchCloudinaryMetadata(publicId) {
//   const response = await fetch(
//     `https://api.cloudinary.com/v1_1/your_cloud_name/resources/${dtekkvnmz}`
//   );
//   const data = await response.json();
//   return data;
// }

// // Get duration using Web Audio API
// function getDuration() {
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//   const source = audioContext.createMediaElementSource(audioElement);

//   source.connect(audioContext.destination);

//   return new Promise((resolve) => {
//     audioElement.addEventListener('loadedmetadata', () => {
//       resolve(audioElement.duration);
//     });
//   });
// }

// // Example usage
// async function getCurrentSongDuration() {
//   const publicId = 'your_cloudinary_audio_public_id';
//   const metadata = await fetchCloudinaryMetadata(publicId);
//   const duration = await getDuration();
//   console.log('Cloudinary Metadata:', metadata);
//   console.log('Current Song Duration:', duration);
// }

// // Call the function when needed
// getCurrentSongDuration();
