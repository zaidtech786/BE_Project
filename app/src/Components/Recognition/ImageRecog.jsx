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
        const faceDetection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withAgeAndGender();

        if (faceDetection) {
          const gender = faceDetection.gender;
          const age = Math.round(faceDetection.age);

          // console.log('Detected gender:', gender);
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
    runFaceAnalysis();
  }, []);

  useEffect(() => {
    console.log("Ages:", ages, "Sex:", sex);
  }, [ages, sex]);





  // const captureImage = () => {
  //   const imageSrc = webcamRef.current?.getScreenshot();
  //   if (imageSrc) {
  //     setImageSrc(imageSrc);
  //   }
  // };

  // useEffect(() => {
  //   const loadModels = async () => {
  //     await faceapi.nets.tinyFaceDetector.loadFromUri('/models/weights');
  //     await faceapi.nets.faceLandmark68Net.loadFromUri('/models/weights');
  //     await faceapi.nets.faceRecognitionNet.loadFromUri('/models/weights');
  //     await faceapi.nets.ageGenderNet.load('/models/weights');
  //   };

  //   const detectFaceAndDraw = async () => {
  //     const video = webcamRef.current?.video;
  //     if (!video) return;

  //     const displaySize = { width: video.videoWidth, height: video.videoHeight };
  //     const canvas = canvasRef.current;
  //     if (!canvas) return;

  //     faceapi.matchDimensions(canvas, displaySize);

  //     const faceDetection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
  //       .withFaceLandmarks()
  //       .withAgeAndGender();

  //     if (faceDetection) {
  //       const gender = faceDetection.gender;
  //       const age = Math.round(faceDetection.age);

  //       console.log('Detected gender:', gender);
  //       setSex(gender)
  //       setAges(age)
  //       console.log('Detected age:', age);

  //       const resizedDetections = faceapi.resizeResults(faceDetection, displaySize);
  //       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections.landmarks);
  //     }

  //     requestAnimationFrame(detectFaceAndDraw);
  //   };

  //   const runFaceAnalysis = async () => {
  //     await loadModels();

  //     const video = webcamRef.current?.video;
  //     if (!video) return;

  //     await new Promise((resolve) => {
  //       video.addEventListener('loadedmetadata', resolve);
  //     });

  //     detectFaceAndDraw();
  //   };

  //   runFaceAnalysis();

  //   return () => {
  //     clearTimeout(captureTimerRef.current); // Cleanup timer
  //   };
  // }, []);

  // useEffect(() => {
  //   if (seconds === 0 && webcamRef.current) {
  //     captureImage(); // Capture image when countdown reaches 0
  //   }
  // }, [seconds]);

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

  // useEffect(() => {
  //   // Exit the effect if the countdown reaches 0
  //   if (seconds === 0) {
  //     return;
  //   }

  //   // Interval to decrease the countdown by 1 second every second
  //   const intervalId = setInterval(() => {
  //     setSeconds((prevSeconds) => prevSeconds - 1);
  //   }, 1000);

  //   // Cleanup the interval when the component is unmounted or countdown reaches 0
  //   return () => clearInterval(intervalId);
  // }, [seconds]); // Re-run the effect when 'seconds' changes


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
