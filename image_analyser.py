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

def analyse_image(image_path):

  print(image_path)

  image = cv2.imread(image_path)

  gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

  faces = face_cascade.detectMultiScale(
    gray_image,
    scaleFactor=1.3,
    minNeighbors=5,
    minSize=(30, 30),
    flags=cv2.CASCADE_SCALE_IMAGE
  )
