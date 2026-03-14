from fastapi import APIRouter
from app.services.llm_service import ask_ai

router = APIRouter()

@router.post("/ai/chatbot")
async def chatbot(data: dict):

    question = data.get("question")

    if not question:
        return {"answer": "Please ask a question."}

    answer = await ask_ai(question)

    return {"answer": answer}