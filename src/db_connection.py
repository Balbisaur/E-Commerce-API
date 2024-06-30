import mysql.connector

host = 'localhost'
user = 'root'
password = 'Amwbz2Fehrp6'
database = 'ecomm_db'

def db_connection():
    try:
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

        if connection.is_connected():
            print('Connected to MySQL database')

        return connection  

    except mysql.connector.Error as e:
        print(f'Error connecting to MySQL: {e}')
        return None  

    finally:
        if 'connection' in locals() and connection.is_connected():
            connection.close()
            print('MySQL connection closed')


conn = db_connection()
if conn:
 
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM your_table')
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    conn.close()  
