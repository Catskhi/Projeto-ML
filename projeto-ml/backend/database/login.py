import sqlite3

def connect_to_database(path):
    db = sqlite3.connect(path)
    return db


def verificaSenha(usuario, senha, path):
    db = connect_to_database(path)
    cursor = db.cursor()
    query = "SELECT user, senha FROM usuário WHERE user = '"+ str(usuario) + "' AND senha = '" + str(senha) + "'"
    query = cursor.execute(query)
    result = query.fetchall()
    if result:
        return True
    else:
        return False