import os
from flask import Flask, render_template
from reverseProxy import proxyRequest
from flask import Flask, render_template, request

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

@app.route('/classify', methods=['POST'])

def classify():
    if(request.files['image']):
        file = request.files['image']

        result = classifyImage(file)
        print('Model Classification:' + result)

        return result
