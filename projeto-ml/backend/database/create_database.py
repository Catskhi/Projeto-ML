import sqlite3

# Tenha certeza de que o script esteja sendo executado dentro da pasta database
def create_database():
	db = sqlite3.connect('./database.db')

	cursor = db.cursor()

	cursor.execute("""
	CREATE TABLE "usuário" (
	"id"	INTEGER NOT NULL UNIQUE,
	"user"	TEXT NOT NULL UNIQUE,
	"senha"	TEXT NOT NULL,
	"nome"	INTEGER NOT NULL,
	"idade"	INTEGER NOT NULL,
	"data_de_nascimento"	TEXT NOT NULL,
	"criado_em"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
	);
	""")

	cursor.execute("""
	CREATE TABLE "dados_de_sono" (
	"suficiente"	TEXT NOT NULL,
	"horas"	INTEGER NOT NULL,
	"celular_por_perto"	TEXT NOT NULL,
	"usou_celular"	TEXT NOT NULL,
	"cansaço"	INTEGER NOT NULL,
	"café_da_manhã"	TEXT NOT NULL
	);
	""")

	cursor.execute("""
	CREATE TABLE "sono_usuario" (
	"id"	INTEGER NOT NULL UNIQUE,
	"usuário"	INTEGER NOT NULL,
	"dia"	INTEGER NOT NULL UNIQUE,
	"suficiente"	TEXT NOT NULL,
	"horas"	INTEGER NOT NULL,
	"celular_por_perto"	TEXT NOT NULL,
	"usou_celular"	TEXT NOT NULL,
	"cansaço"	INTEGER NOT NULL,
	"café_da_manha"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
	);
	""")