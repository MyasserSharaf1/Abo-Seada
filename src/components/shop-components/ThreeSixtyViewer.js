// src/ThreeSixtyViewer.js
import React from 'react';
import React360Viewer from 'react-360-view'; // Default import
//import ThreeSixty from 'react-360-view';
const ThreeSixtyViewer = ({ imagePath }) => {
  return (
    <div className="viewer-container">
      <React360Viewer
        amount={36} // Number of images (frames) in your sequence
        imagePath={imagePath} // Path to your images
        fileName="image{index}.jpg" // Image filename format
        spinReverse={false} // Reverse spin direction
        autoplay={true} // Auto start the spin
        speed={100} // Rotation speed
      />
    </div>
  );
};

export default ThreeSixtyViewer;
