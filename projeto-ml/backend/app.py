import time
from flask import Flask, make_response, jsonify

app = Flask('__name__')
# Faz o app reconhecer UTF-8
app.config['JSON_AS_ASCII'] = False

data = {
    'nome': 'Carro1',
    'preço': 40000,
    'ano': 2005,
}

@app.route('/')
def get_current_time():
    return {'time ': time.time()}

@app.route('/teste', methods=['GET'])
def get_teste():
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
app.run(debug=True)