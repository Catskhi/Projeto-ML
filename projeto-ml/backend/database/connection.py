import sqlite3
import fill_sleep_database

db = sqlite3.connect('database.db')

cursor = db.cursor()

result = cursor.execute("SELECT * FROM usuário")
print(result.fetchall())