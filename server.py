import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions"  # проверь в доке DeepSeek


def call_deepseek(card_name: str, question: str) -> str:
    if not DEEPSEEK_API_KEY:
        return (
            "AI сейчас недоступен (нет API-ключа DeepSeek).\n"
            "Но ты всё равно можешь использовать карту как повод прислушаться к себе."
        )

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
    }

    system_prompt = (
        "Ты мягкий интуитивный проводник по символике карт. "
        "Отвечай спокойно, без категоричных предсказаний. "
        "Опирайся на название карты и вопрос человека, "
        "предлагай варианты для размышления, а не приговор."
    )

    user_prompt = (
        f"Название карты: {card_name}\n"
        f"Вопрос пользователя: {question}\n\n"
        "Дай развёрнутое, но мягкое пояснение, как эту карту можно прочитать в контексте вопроса. "
        "Обращайся на 'ты'."
    )

    payload = {
        "model": "deepseek-chat",  # уточни актуальное имя модели в документации DeepSeek
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.8
    }

    try:
        resp = requests.post(DEEPSEEK_API_URL, headers=headers, json=payload, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        content = (
            data.get("choices", [{}])[0]
            .get("message", {})
            .get("content", "")
        )
        return content.strip() or "AI не смог сформулировать ответ."
    except Exception as e:
        print("DeepSeek error:", e)
        return "Возникла ошибка при обращении к AI. Попробуй ещё раз чуть позже."


@app.route("/api/deepseek", methods=["POST"])
def deepseek_endpoint():
    data = request.get_json(force=True)
    card_name = data.get("card_name", "").strip()
    question = data.get("question", "").strip()

    if not card_name or not question:
        return jsonify({"error": "card_name and question are required"}), 400

    ai_answer = call_deepseek(card_name, question)
    return jsonify({"ai_answer": ai_answer})


if __name__ == "__main__":
    app.run(debug=True)
