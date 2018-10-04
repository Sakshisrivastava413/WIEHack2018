import cv2
import numpy as np
import json
import base64
from keras.models import load_model

emotion_labels = get_labels('fer2013')

emotion_offsets = (20, 40)

face_cascade = cv2.CascadeClassifier('./models/haarcascade_frontalface_default.xml')
emotion_classifier = load_model(emotion_model_path)

emotion_target_size = emotion_classifier.input_shape[1:3]
