import React from 'react';



function TestPage() {
    
  const images = require.context('.././src/img', true);
  const imageList = images.keys().map(image => images(image));

  console.log(imageList);
  return (
    <div>
      {imageList.map((image, index) => (
        <img key={index} src={image} alt={`image-${index}`} />
        
      ))}
    </div>
  );
}

export default TestPage;