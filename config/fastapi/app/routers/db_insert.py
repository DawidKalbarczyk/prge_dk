from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import create_engine, text
router_insert = APIRouter()

from app.settings import db_name, db_user, db_password

def connect_to_db(db_name: str, db_user: str, db_password: str):
    return create_engine(
        f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}"

    )

class UserData(BaseModel):
    name: str
    posts: int
    location: str

def scrappedGeom(data):
    import requests
    from bs4 import BeautifulSoup

    naglowek = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                      "AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/120.0 Safari/537.36 "
                      "(+https://twojastrona.pl/contact)"
    }
    url: str = f"https://pl.wikipedia.org/wiki/{data}"
    response = requests.get(url, headers=naglowek)
    response_html = BeautifulSoup(response.text, "html.parser")

    latitude = response_html.select('.latitude')
    longitude = response_html.select('.longitude')

    if len(latitude) > 1 and len(longitude) > 1:
        latitude = float(latitude[1].text.replace(",", "."))
        longitude = float(longitude[1].text.replace(",", "."))
        return (latitude, longitude)
    else:
        print("Błąd w markerze!")
        return (0,0)


@router_insert.post("/insert_user")
async def insert_user(user: UserData):
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        coords = scrappedGeom(data=user.location)
        latitude = float(coords[0])
        longitude = float(coords[1])

        params = {
            "name": user.name,
            "posts": user.posts,
            "location": user.location,
            "longitude": longitude,
            "latitude": latitude,
        }


        sql_query = text("""
                        insert into users (name, posts, geom, location) \
                        VALUES (:name, :posts, ST_SetSRID(ST_MakePoint(:longitude, :latitude),4326), :location); \
                        """)
        with db_connection.connect() as conn:
            result = conn.execute(sql_query, params)
            conn.commit()
            print(result)
    except Exception as e:
        print(e)
        raise e
    return {"status":1}
