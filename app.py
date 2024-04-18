from flask import Flask, render_template, send_from_directory, request,jsonify
from nonTissue import nonTissueModel
import base64
from io import BytesIO
from PIL import Image
import cv2 as cv

app = Flask(__name__)

@app.route('/getResult',methods=['POST'])
def handle_post():
    data=request.get_json()
    image_data = base64.b64decode(data['image'])
    image = Image.open(BytesIO(image_data))
    print(image)
    image.save('received_image.png')
    img=cv.imread('received_image.png')
    img=cv.resize(img,(244,244))
    ans=nonTissueModel(img)
    response_data={
        'result': ans
    }
    return jsonify(response_data)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('static/css', path)

if __name__ == '__main__':
    app.run(debug=True)
