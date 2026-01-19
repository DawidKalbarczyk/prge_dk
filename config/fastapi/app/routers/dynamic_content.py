from fastapi import APIRouter
from sqlalchemy import create_engine, text
router_get_users = APIRouter()

from app.settings import db_name, db_user, db_password

def connect_to_db(db_name: str, db_user: str, db_password: str):
    return create_engine(
        f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}"
    )

@router_get_users.get("/get_users")
async def get_users():
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        sql_query= text("""select *from users;""")

        with db_connection.connect() as conn:
            result = conn.execute(sql_query)
            users=[dict(row._mapping) for row in result]

        return {"data": users}
    except Exception as e:
        print(f"Błąd podczas get_users: {e}")

        return {"error": str(e)}







    return {"id": 1, "firstName": "Emily"}
