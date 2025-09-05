import os
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Guana Cloud AI Assistant is alive!"

@app.route("/ask", methods=['POST'])
def ask_assistant():
    data = request.get_json()
    if not data or 'question' not in data:
        return jsonify({"error": "Missing 'question' in request."}), 400

    user_question = data['question']

    bot_answer = f"Respuesta inteligente a la pregunta: '{user_question}'"

    return jsonify({"answer": bot_answer})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))