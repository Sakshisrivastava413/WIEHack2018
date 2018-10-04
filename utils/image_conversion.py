import base64
import sys

def create_image_from_base64(base_str, file_name):
  imgdata = base64.b64decode(str(base_str))
  with open(file_name, 'wb') as f:
    f.write(imgdata)