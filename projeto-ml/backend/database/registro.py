import sqlite3
from database.queries import executeRegister
def connect_to_database(path):
    db = sqlite3.connect(path)
    return db

def registraUsuario(user, senha, nome, idade, data_de_nascimento, criado_em, path):
    db = connect_to_database(path)
    cursor = db.cursor()
    query = "INSERT INTO usuário (user, senha, nome, idade, data_de_nascimento, criado_em) VALUES (?, ?, ?, ?, ?, ?)"
    cursor.execute(query, (user, senha, nome, idade, data_de_nascimento, criado_em))
    db.commit()
"""
    vai retornar true se o usuário já existe
"""
def verificaUsuarioRepetido(usuario, path):
    db = connect_to_database(path)
    cursor = db.cursor()
    query = cursor.execute("SELECT user FROM usuário WHERE user = '" + usuario + "'")
    result = query.fetchall()
    if result:
        return True
    else:
        return False

def registraSono(usuario, date, suficiente, horas, celularPorPerto, usouCelular, cansado, cafe, path):
    query = "INSERT INTO sono_usuario (usuário, data, suficiente, horas, celular_por_perto, usou_celular, cansaço, café_da_manha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    executeRegister(query, (usuario, date, suficiente, horas, celularPorPerto, usouCelular, cansado, cafe), path)
    return {
        'Status': 'Query executada.'
    }

# verificaUsuarioRepetido('HenrikNailo', './database.db')