import sqlite3

def executeRegister(query, values, database_path):
    db = sqlite3.connect(database_path)
    cursor = db.cursor()
    result = cursor.execute(query, values)
    db.commit()


def executeQuery(query, path):
    db = db = sqlite3.connect(path)
    cursor = db.cursor()
    result = cursor.execute(query)
    return result.fetchall()
