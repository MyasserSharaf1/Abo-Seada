import React from 'react';
import React360Viewer from 'react-360-view';

const ThreeSixtyViewer = ({ imagePath }) => {
  return (
    <div className="viewer-container">
      <React360Viewer
        amount={36}
        imagePath={imagePath}
        fileName="image{index}.webp"
        spinReverse={false}
        autoplay={true}
        speed={100}
      />
    </div>
  );
};

export default ThreeSixtyViewer;
