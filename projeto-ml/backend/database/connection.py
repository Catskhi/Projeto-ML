import sqlite3
import fill_sleep_database

db = sqlite3.connect('./database.db')

cursor = db.cursor()

result = cursor.execute("SELECT data FROM sono_usuario WHERE usuário = 'HenrikNailo'")
print(result.fetchall())