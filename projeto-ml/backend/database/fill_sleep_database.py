import csv
from multiprocessing.dummy import Array
import string
import sqlite3

def reset_sleep_data():
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    cursor.execute('DELETE FROM dados_de_sono')
    db.commit()

def read_csv_and_fill(file_path : string) -> Array:
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    with open(file_path) as file:
        reader  = csv.reader(file)
        for row in reader:
            if row[0] in 'Enough':
                continue
            cursor.execute("""INSERT INTO dados_de_sono(suficiente, horas, celular_por_perto, usou_celular, cansaço, café_da_manhã) 
            values(?, ?, ?, ?, ?, ?)""",
            (row[0], row[1], row[2], row[3], row[4], row[5])
            )
        cursor.close()
        db.commit()

def fill():
    reset_sleep_data()
    csv_array = read_csv_and_fill('./SleepStudyData.csv')