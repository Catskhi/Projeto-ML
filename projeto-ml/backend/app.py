import time
import database.queries
from responseReturn import responseReturn
from database.registro import verificaUsuarioRepetido, registraUsuario, registraSono
from database.login import verificaSenha
from datetime import datetime
from urllib import request
from flask import Flask, make_response, jsonify, session, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config["SESSION_TYPE"] = 'filesystem'
app.config.from_object(__name__)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = '123456'
# Faz o app reconhecer UTF-8
app.config['JSON_AS_ASCII'] = False

app.run(debug=True)

DATABASE_PATH = './database/database.db'

@app.route('/')
def get_current_time():
    return {
            'time ': time.time()
    }

@app.route('/teste', methods=['GET'])
def get_teste():
    data = {
        'nome': 'Carro1',
        'preço': 40000,
        'ano': 2005,
    }
    return responseReturn(data)

@app.route('/registro', methods=['GET', 'POST'])
def registro():
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
    return responseReturn(data)

@app.route('/login', methods=['POST'])
def login():
    username = request.args.get('username')
    senha = request.args.get('password')

    jaExiste = verificaUsuarioRepetido(username, DATABASE_PATH)
    senhaCorreta = verificaSenha(username, senha, DATABASE_PATH)
    if request.method == 'POST':
        if jaExiste and senhaCorreta:
            session['username'] = username
            data = {
                'login': True,
                'username': session['username']
            }
        else:
            data = {
                'login': False
            }
    return responseReturn(data)

@app.route('/get-user-sleep-data', methods=['GET'])
def get_user_sleep_data_Today():
    username = request.args.get('username')
    if username:
        today = datetime.today().strftime('%Y-%m-%d')
        query = "SELECT * FROM sono_usuario WHERE usuário = '" + username + "' and data = '" + today + "'"
        result = database.queries.executeQuery(query, DATABASE_PATH)
        if len(result) >= 1:
            return responseReturn(result[0])
        else:
            return {
                'error': 'Sem registros na data de hoje!',
                'hoje': today
            }
    else:
        return {
            'erro': 'precisa do parâmetro username!'
        }

@app.route('/set-user-sleep-data', methods=['GET', 'POST'])
def set_user_sleep_data():
    username = request.args.get('username')
    date = request.args.get('date')
    suficiente = request.args.get('suficiente')
    horas = request.args.get('horas')
    celularPorPerto = request.args.get('celularPorPerto')
    usouCelular = request.args.get('usouCelular')
    cansado = request.args.get('cansado')
    cafe = request.args.get('cafe')
    registraSono(username, date, suficiente, horas, celularPorPerto, usouCelular, cansado, cafe, DATABASE_PATH)
    data = {
        'username': username,
        'data': date,
        'suficiente': suficiente,
        'horas': horas,
        'celular por perto': celularPorPerto,
        'usou celular': usouCelular,
        'cansaço': cansado,
        'café': cafe
    } 
    return responseReturn(data)


@app.route('/get-user-last-days/<string:user>/<int:days>', methods=['GET'])
def get_user_last_days(user, days):
    query = "SELECT * FROM sono_usuario WHERE usuário = '" + user + "' ORDER BY data DESC LIMIT " + str(days)
    result = database.queries.executeQuery(query, DATABASE_PATH)
    return result

@app.route('/get-user-register-size/<string:user>', methods=['GET'])
def get_user_register_size(user):
    query = "SELECT * FROM sono_usuario WHERE usuário = '" + user + "'"
    result = database.queries.executeQuery(query, DATABASE_PATH)
    return result

@app.route('/get-all-general-registers', methods=['GET'])
def get_all_general_registers():
    query = "SELECT * FROM dados_de_sono ORDER BY suficiente DESC"
    result = database.queries.executeQuery(query, DATABASE_PATH)
    return result