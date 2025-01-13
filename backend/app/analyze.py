from fastapi import UploadFile, File
import cv2
import numpy as np
import tempfile
import os
from typing import List
import base64

async def analyze_video(video: UploadFile = File(...)):
    # Save uploaded video to temporary file
    with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as temp_file:
        content = await video.read()
        temp_file.write(content)
        temp_file.flush()
        
        # Process the video
        results = process_video(temp_file.name)
        
        # Clean up
        os.unlink(temp_file.name)
        
        return results

def process_video(video_path: str):
    # Initialize video capture
    cap = cv2.VideoCapture(video_path)
    
    # Initialize background subtractor
    backSub = cv2.createBackgroundSubtractorMOG2()
    
    # Initialize variables
    people_count = 0
    heatmap = np.zeros((int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)), 
                       int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))), 
                       dtype=np.float32)
    behaviors: List[str] = []
    frame_count = 0
    
    # Process video frames
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        # Apply background subtraction
        fgMask = backSub.apply(frame)
        
        # Update heatmap
        heatmap += (fgMask > 0).astype(np.float32) * 0.1
        
        # People detection using HOG descriptor
        if frame_count % 30 == 0:  
            hog = cv2.HOGDescriptor()
            hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
            boxes, weights = hog.detectMultiScale(frame)
            current_count = len(boxes)
            people_count = max(people_count, current_count)
            
            # Behavior analysis based on movement patterns
            if current_count > 0:
                if current_count > 5:
                    behaviors.append("High activity detected")
                elif np.mean(weights) > 0.8:
                    behaviors.append("Sustained presence detected")
        
        frame_count += 1
    
    # Normalize and colorize heatmap
    heatmap_normalized = cv2.normalize(heatmap, None, 0, 255, cv2.NORM_MINMAX)
    heatmap_colored = cv2.applyColorMap(heatmap_normalized.astype(np.uint8), cv2.COLORMAP_JET)
    
    # Save heatmap to temporary file and convert to base64
    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as temp_file:
        cv2.imwrite(temp_file.name, heatmap_colored)
        with open(temp_file.name, 'rb') as image_file:
            heatmap_base64 = base64.b64encode(image_file.read()).decode('utf-8')
        os.unlink(temp_file.name)
    
    # Clean up
    cap.release()
    
    # Remove duplicate behaviors
    behaviors = list(set(behaviors))
    
    return {
        "people_count": people_count,
        "heatmap": f"data:image/png;base64,{heatmap_base64}",
        "behaviors": behaviors
    }
