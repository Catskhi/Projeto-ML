import sqlite3

db = sqlite3.connect('database.db')

cursor = db.cursor()

result = cursor.execute("SELECT * FROM 'usuário'")
result.fetchone()
