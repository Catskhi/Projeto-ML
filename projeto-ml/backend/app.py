import time
from database.registro import verificaUsuarioRepetido, registraUsuario
from datetime import datetime
from urllib import request
from flask import Flask, make_response, jsonify, session, request


app = Flask('__name__')
app.secret_key = '123456'
# Faz o app reconhecer UTF-8
app.config['JSON_AS_ASCII'] = False

app.run(debug=True)

DATABASE_PATH = './database/database.db'

data = {
    'nome': 'Carro1',
    'preço': 40000,
    'ano': 2005,
}

@app.route('/')
def get_current_time():
    session['username'] = 'admin'
    return {'username ': session['username'],
            'time ': time.time()
    }

@app.route('/teste', methods=['GET'])
def get_teste():
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/registro', methods=['GET', 'POST'])
def register():
    username = request.args.get('username')
    password = request.args.get('password')
    name = request.args.get('name')
    birth_date = request.args.get('birth_date')
    formated_birth_date = birth_date.replace('-', '')
    creation_date = datetime.today().strftime('%Y-%m-%d')
    age = datetime.today().year - int(formated_birth_date[:4]) - ((datetime.today().month, datetime.today().day) < (int(formated_birth_date[5:6]), int(formated_birth_date[7:8])))

    jaExiste = verificaUsuarioRepetido(username, DATABASE_PATH)
    if not jaExiste:
        session['username'] = username
        data = {
            'username': session['username'],
            'password': password,
            'name': name,
            'age': age,
            'birth_date': birth_date,
            'creation_date': creation_date,
            'ja_existe': jaExiste
        }
        registraUsuario(username, password, name, age, birth_date, creation_date, DATABASE_PATH)
    else:
        data = {
            'ja_existe': jaExiste
        }
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/dash')
def dash():
    if 'username' in session:
        return {
            'username': session['username']
        }
    else:
        return {
            'usuário': 'nenhum!'
        }