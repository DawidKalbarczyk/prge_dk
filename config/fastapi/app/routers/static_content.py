from fastapi import APIRouter

router = APIRouter()

@router.get("/endpoint")
async def endpoint():
    return [
        {"Imie": "Adrian"},
        {"Imie": "Bassam"},
        {"Imie": "Mateusz"},
    ]
