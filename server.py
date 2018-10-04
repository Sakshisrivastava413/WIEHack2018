from flask import request, Flask
import json
from utils.image_conversion import create_image_from_base64

app = Flask(__name__)

print('Server ready to receive requests')

# print(json.dumps(str(analyse_image('realtime.png'))))


# print(analyse_text('hi how are you'));

# app.run(debug=True)