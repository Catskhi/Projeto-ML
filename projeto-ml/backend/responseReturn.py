from flask import jsonify

def responseReturn(data):
    ''' Retorna a variavel data em convertida para json e com a adição dos headers. '''
    response = jsonify(data)
    return response
