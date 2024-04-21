import React, { useRef, useEffect, useState } from 'react';
import clm from 'clmtrackr';

const DetectSize = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [shoulderWidth, setShoulderWidth] = useState(0);
  const [waistCircumference, setWaistCircumference] = useState(0);
  const [hipCircumference, setHipCircumference] = useState(0);

  // Function to convert pixels to inches based on pixel density
  const pixelsToInches = (pixels, pixelDensity) => {
    return pixels / pixelDensity;
  };

  useEffect(() => {
    const initTracker = (video) => {
      const tracker = new clm.tracker();
      tracker.init();
      tracker.start(video);
      return tracker;
    };

    const handleCanPlay = () => {
      const video = videoRef.current;
      video.play().then(() => {
        const tracker = initTracker(video);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const trackingLoop = setInterval(() => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          if (tracker && tracker.getCurrentPosition()) {
            const faceWidth = tracker.getCurrentPosition()[14][0] - tracker.getCurrentPosition()[0][0];
            const faceHeight = tracker.getCurrentPosition()[7][1] - tracker.getCurrentPosition()[33][1];
            setShoulderWidth(faceWidth * 1.5); // Assuming shoulder width is 1.5 times the face width
            setWaistCircumference(faceHeight * 2); // Assuming waist circumference is twice the face height
            setHipCircumference(faceHeight * 2); // Assuming hip circumference is also twice the face height
          }
        }, 100);

        return () => {
          clearInterval(trackingLoop);
          if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
          }
          video.removeEventListener('canplay', handleCanPlay);
          if (tracker) {
            tracker.stop();
          }
        };
      }).catch(error => console.error('Error playing video:', error));
    };

    const video = videoRef.current;
    const canvas = canvasRef.current;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        video.addEventListener('canplay', handleCanPlay);
      })
      .catch(error => console.error('getUserMedia error:', error));
  }, []);

  useEffect(() => {
    // Calculate and log measurements in inches whenever shoulderWidth, waistCircumference, or hipCircumference changes
    const pixelDensity = videoRef.current?.videoWidth / videoRef.current?.offsetWidth;

    console.log("Pixel density:", pixelDensity);
    console.log("Shoulder Width :", pixelsToInches(shoulderWidth, pixelDensity).toFixed(2));
    console.log("Waist Circumference :", pixelsToInches(waistCircumference, pixelDensity).toFixed(2));
    console.log("Hip Circumference :", pixelsToInches(hipCircumference, pixelDensity).toFixed(2));
  }, [shoulderWidth, waistCircumference, hipCircumference]);

  return (
    <div>
      <video ref={videoRef} width="640" height="480"></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
    </div>
  );
};

export default DetectSize;
