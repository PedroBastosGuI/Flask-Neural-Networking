import os
from flask import Flask, render_template

import tensorflow as tf
from tkinter import Image
from flask import Flask, render_template, request

from segmentation import Segmentation
from reverseProxy import proxyRequest
from normalization import Normalization

from PIL import Image
import numpy as np

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = 'http://localhost:3000/'

app = Flask(__name__)

# Ignore static folder in development mode.
if MODE == "development":
    app = Flask(__name__, static_folder=None)

@app.route('/')
@app.route('/<path:path>')
def index(path=''):
    if MODE == 'development':
        return proxyRequest(DEV_SERVER_URL, path)
    else: 
        return render_template("index.html")   


#criando endpoint para receber imagem que

@app.route('/teste_API', methods=['POST'])
def classify():
    if(request.files['image']):
        file = request.files['image']

        imgResponse = Image.open(file.stream)
        imgArray = np.array(imgResponse)

        segmentation_value = Segmentation(imgArray)
        normalization_value = Normalization(segmentation_value)

        network = tf.keras.models.load_model('/content/treinamento')

        result = network.predict(normalization_value)
        
        print(result)



