from fastapi import APIRouter
from sqlalchemy import create_engine, text
router_insert = APIRouter()

def connect_to_db():
    return create_engine(
        f"postgresql://postgres:postgres@localhost:5432/postgres",
    )
@router_insert.get("/insert_user")
async def insert_user():
    try:
        db_connection = connect_to_db()

        sql_query = text(""" insert into users(name, posts, location)
        values ('Jan', 3,'Gdańsk');
        """)
        with db_connection.connect() as conn:
            result = conn.execute(sql_query)
            print(result)
    except Exception as e:
        print(e)
        raise e
    return {"statu":1}
