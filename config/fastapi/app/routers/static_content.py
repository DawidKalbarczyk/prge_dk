from fastapi import APIRouter

router = APIRouter()

@router.get("/endpoint")
async def endpoint():
    return {"id": 1, "firstName": "Emily"}
