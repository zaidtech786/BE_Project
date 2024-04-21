import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';
import {  useNavigate } from "react-router-dom";
// import models from "../models/weights"

const FaceAnalysis = () => {
  const navigate = useNavigate()
  const webcamRef = useRef(null);
  const [ages, setAges] = useState(0);
  const [sex, setSex] = useState("null");
  const [seconds, setSeconds] = useState(10);
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null); // Reference for the canvas
  const captureTimerRef = useRef(null); // Reference for the capture timer
  const [status,setStatus] = useState("")
  const [shoulderWidth, setShoulderWidth] = useState(0);
  const [waistCircumference, setWaistCircumference] = useState(0);
  const [hipCircumference, setHipCircumference] = useState(0);
  const videoRef = useRef(null);
  // const canvasRef = useRef(null);
  const pixelsToInches = (pixels, pixelDensity) => {
    return pixels / pixelDensity;
  };
  useEffect(() => {
    const loadModels = async () => {
      // Load face-api.js models
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models/weights');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models/weights');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models/weights');
      await faceapi.nets.ageGenderNet.loadFromUri('/models/weights');
    };



    const initializeCamera = async () => {
      await loadModels();
      const video = webcamRef.current.video;
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      video.srcObject = stream;
    };

    initializeCamera();
  }, []);

  const runFaceAnalysis = async () => {
    const video = webcamRef.current.video;

    const detectFace = async () => {
      // Check if the video has finished loading
      if (video.readyState >= 3) {
        const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512 });
        const faceDetection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withAgeAndGender();

        if (faceDetection) {
          const gender = faceDetection.gender;
          const age = Math.round(faceDetection.age);

          const landmarks = faceDetection.landmarks;

          // Example: Estimate shoulder width based on face landmarks
          if (landmarks && landmarks.getLeftEye && landmarks.getRightEye && landmarks.getMouth) {
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();
          const mouth = landmarks.getMouth();
 
          console.log("shoulder : ", leftEye);
          console.log("Waist:", rightEye);
          // console.log(":", mouth);
          console.log("Age:", age);
          console.log("Gender:", gender);
          const eyeDistance = Math.sqrt(Math.pow(leftEye._x - rightEye._x, 2) + Math.pow(leftEye._y - rightEye._y, 2));
          const eyeMouthDistance = Math.abs(mouth._y - ((leftEye._y + rightEye._y) / 2));

          // Estimate measurements
   
        }
        setSex(gender);
        setAges(age);
      }
      }

      // Request the next animation frame
      requestAnimationFrame(detectFace);
    };

    detectFace();
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



  useEffect(() => {
    runFaceAnalysis();
  }, []);

  useEffect(() => {
    console.log("Ages:", ages, "Sex:", sex);
  }, [ages, sex]);


  useEffect(() => {
    // Countdown logic
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup timer
    }
    else{
      setStatus("Processing")
      setTimeout( () => {
        navigate(`/recommand/${sex}/${ages}`)
      },2000)
    }
  }, [seconds]);

  
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px" }}>
    
          {!status && <h1> {seconds}</h1>}
          {
             status 
             ?
              <h1> {status}...</h1>
            :
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: 'user' }}
            />

          }
       
    </div>
  );
};

export default FaceAnalysis;
