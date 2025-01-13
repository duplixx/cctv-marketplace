import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Play, Pause, RotateCcw, Users, Map, Activity } from 'lucide-react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';

const VideoAnalytics = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analytics, setAnalytics] = useState({
    peopleCount: 0,
    heatmap: null as string | null,
    behaviors: [] as string[]
  });
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAuthenticated) {
        toast.error('Please login to upload a video');
        loginWithRedirect({
          appState: { returnTo: window.location.pathname }
        });
        return;
    }
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      const videoUrl = URL.createObjectURL(e.target.files[0]);
      if (videoRef.current) {
        videoRef.current.src = videoUrl;
      }
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleAnalyze = async () => {
    if (!videoFile) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/analyze-video`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setAnalytics({
        peopleCount: response.data.people_count,
        heatmap: response.data.heatmap,
        behaviors: response.data.behaviors
      });
    } catch (error) {
      console.error('Error analyzing video:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-white">
      {isProcessing && <LoadingSpinner />}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Analytics Suite</h1>
          <p className="text-xl text-gray-600">
            Upload your video for AI-powered analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Video Upload and Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4">Upload Video</label>
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
              <video
                ref={videoRef}
                className="w-full h-full"
                controls={false}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayPause}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="p-3 rounded-full bg-gray-600 text-white hover:bg-gray-700"
              >
                <RotateCcw className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.div>

          {/* Analytics Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={!videoFile || isProcessing}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Analyze Video'}
            </motion.button>

            <div className="grid grid-cols-1 gap-6">
              {/* People Counting */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold">People Counting</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {analytics.peopleCount} people detected
                </p>
              </motion.div>

              {/* Heat Map */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Map className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold">Heat Map</h3>
                </div>
                {analytics.heatmap ? (
                  <img
                    src={analytics.heatmap}
                    alt="Movement heat map"
                    className="w-full rounded-lg"
                  />
                ) : (
                  <p className="text-gray-600">Upload and analyze a video to generate heat map</p>
                )}
              </motion.div>

              {/* Behavior Analysis */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Activity className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold">Behavior Analysis</h3>
                </div>
                {analytics.behaviors.length > 0 ? (
                  <ul className="space-y-2">
                    {analytics.behaviors.map((behavior, index) => (
                      <li key={index} className="flex items-center">
                        <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
                        {behavior}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">Upload and analyze a video to detect behaviors</p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalytics;