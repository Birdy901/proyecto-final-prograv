from config import config
from src import init_app

from src.models.database import db

configuration = 'development'
app = init_app(configuration)

with app.app_context():

    conn = db.engine.connect()

    # Comprobar si la conexión a la base de datos se ha establecido correctamente
    try:
        from sqlalchemy import text
        query = text('SELECT 1')

        result = conn.execute(query)

        if result.scalar() == 1:
            print("Conexión a la base de datos establecida correctamente.")
        else:
            print("Error al conectar a la base de datos: no se pudo ejecutar la consulta.")
    except Exception as e:
        print("Error al conectar a la base de datos:", str(e))
    finally:
        conn.close()

if __name__ == '__main__':
    app.run()