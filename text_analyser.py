# first, we import the relevant modules from the NLTK library
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import json

sid = SentimentIntensityAnalyzer()

def analyse_text(message_text):
p# assing in the message_text outputs a dictionary with negative, neutral, positive, and compound scores for the input text
  scores = sid.polarity_scores(message_text)


# print(analyse_text('hi how are you'));