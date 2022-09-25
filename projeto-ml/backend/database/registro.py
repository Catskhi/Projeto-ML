import sqlite3

def connect_to_database(path):
    db = sqlite3.connect(path)
    return db

def registraUsuario(user, senha, nome, idade, data_de_nascimento, criado_em, path):
    db = connect_to_database(path)
    cursor = db.cursor()
    query = "INSERT INTO usuário (user, senha, nome, idade, data_de_nascimento, criado_em) VALUES (?, ?, ?, ?, ?, ?)"
    cursor.execute(query, (user, senha, nome, idade, data_de_nascimento, criado_em))
    db.commit()

def verificaUsuarioRepetido(usuario, path):
    db = connect_to_database(path)
    cursor = db.cursor()
    query = cursor.execute("SELECT user FROM usuário WHERE user = '" + usuario + "'")
    result = query.fetchall()
    if result:
        return True
    else:
        return False

# verificaUsuarioRepetido('HenrikNailo', './database.db')