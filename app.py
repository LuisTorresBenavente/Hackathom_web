from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import os

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'hackaton.csmouoomzfkk.us-east-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = '123456789'
app.config['MYSQL_DB'] = 'hackaton'

mysql = MySQL(app)

def ejecutar_query(query, params=None, uno=False):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(query, params or ())
    resultado = cursor.fetchone() if uno else cursor.fetchall()
    cursor.close()
    return resultado

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/equipos')
def equipos():
    return render_template("equipos.html")

@app.route('/api/equipos', methods=['POST'])
def crear_equipo():
    try:
        datos = request.get_json()
        if not datos:
            return jsonify({'ok': False, 'error': 'No hay datos'}), 400
        
        cursor = mysql.connection.cursor()
        sql = """INSERT INTO equipos 
                 (codigo, tipo, marcas, modelo, so, almacenamiento, ram, estado, mantenimiento, fecha_registro) 
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        
        valores = (
            datos.get('codigo'),
            datos.get('tipo'),
            datos.get('marcas'),
            datos.get('modelo'),
            datos.get('so'),
            datos.get('almacenamiento'),
            datos.get('ram'),
            datos.get('estado'),
            datos.get('mantenimiento'),
            datos.get('fecha_registro')
        )
        
        cursor.execute(sql, valores)
        mysql.connection.commit()
        cursor.close()
        
        return jsonify({'ok': True, 'mensaje': 'Equipo registrado exitosamente'}), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'ok': False, 'error': str(e)}), 500

if __name__ == '__main__':
    puerto = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=puerto, debug=False)