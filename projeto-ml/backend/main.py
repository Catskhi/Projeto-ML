from fastapi import FastAPI
" Para se utilizar a API, devemos abilitar o CORS nela "
" Abaixo a importação do CORS "
from fastapi.middleware.cors import CORSMiddleware


" 'Banco de dados' temporário "
vendas = {
    1: {'item': 'lata', 'preço_unitario': 3, 'quantidade': 5},
    2: {'item': 'garrafa 2L', 'preço_unitario': 5, 'quantidade': 8}
}

" Declaração do APP "
app = FastAPI()

" Define a variável origins para o CORS "
origins = [
    "http://localhost",
    "http://localhost:8000"
    "http://localhost:8080",
]

" Habilitando o CORS "
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def home():
    return 'A minha API está no ar'

@app.get('/vendas/{id_venda}')
def pegar_venda(id_venda : int):
    return vendas[id_venda]