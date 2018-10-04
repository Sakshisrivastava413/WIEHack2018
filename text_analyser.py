# first, we import the relevant modules from the NLTK library
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import json

sid = SentimentIntensityAnalyzer()

def analyse_text(message_text):
  scores = sid.polarity_scores(message_text)
  return json.dumps(scores)

# print(analyse_text('hi how are you'));