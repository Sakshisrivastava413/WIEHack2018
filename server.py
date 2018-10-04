from flask import request, Flask
import json
from utils.image_conversion import create_image_from_base64
from image_analyser import analyse_image


app = Flask(__name__)

@app.route('/analyse_image', methods=['GET', 'POST'])
def analyse_image_route():
  data = request.get_json(force=True)
  if data is None:
    return "No data"
  create_image_from_base64(data['image'], './images/uploaded_img.png')
  res = analyse_image('./images/uploaded_img.png')
  return res

@app.route('/analyse_text', methods=['GET', 'POST'])
def analyse_text_route():
  data = request.get_json(force=True)
  


print('Server ready to receive requests')

# print(json.dumps(str(analyse_image('realtime.png'))))


# print(analyse_text('hi how are you'));

# app.run(debug=True)