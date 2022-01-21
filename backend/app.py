import os
from tkinter import Image
from flask import Flask, render_template
from reverseProxy import proxyReverse
from flask import Flask, render_template, request
from segmentation import Segmentation
from PIL import Image
import numpy as np

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = 'http://localhost:3000/'

app = Flask(__name__)

# Ignore static folder in development mode.
if MODE == "  development":
    app = Flask(__name__, static_folder=None)

@app.route('/')
@app.route('/<path:path>')
def index(path=''):
    if MODE == 'development':
        return proxyRequest(DEV_SERVER_URL, path)
    else: 
        return render_template("index.html")   


#criando endpoint para receber imagem que

@app.route('/classify', methods=['POST'])

def classify():
    if(request.files['image']):
        file = request.files['image']

        result = classifyImage(file)
        
        imgResponse = Image.open(file.stream)

        imgArray = np.array(imgResponse)

        Segmentation(imgArray)
        
        print(file)
        ## gerar tabelaaaaa




#recebe imagem 

# retornar uma lista de imagem para

#Foreach para cada item da lista 

#envia para extrator 

#retornar uma vector de caracteristicas

#|executar inferencia

#return classe 
##############



