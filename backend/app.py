import os
import tempfile
from dotenv import load_dotenv

load_dotenv()   # 🔥 LOAD ENV FIRST

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from contact_form import contact_form
from our_projects import (
    add_project,
    get_all_projects,
    get_project_by_id,
    update_project,
    delete_project,
)

# ─────────────────────────────────────────
# FLASK APP
# ─────────────────────────────────────────

app = Flask(__name__, static_folder="mnpiepl-frontend", static_url_path="")
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "*").split(",")]
CORS(app, resources={r"/api/*": {"origins": allowed_origins}})

# ─────────────────────────────────────────
# FRONTEND
# ─────────────────────────────────────────

@app.route("/")
def serve_index():
    if not os.path.exists(os.path.join(app.static_folder, "index.html")):
        return jsonify({
            "status": "warning",
            "message": f"Static folder '{app.static_folder}' or index.html not found. Build frontend first."
        }), 404
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def serve_static(path):
    file_path = os.path.join(app.static_folder, path)

    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)

    # Fallback to index.html for SPA routing
    if os.path.exists(os.path.join(app.static_folder, "index.html")):
        return send_from_directory(app.static_folder, "index.html")
    
    return jsonify({"status": "not_found", "message": f"Resource not found: {path}"}), 404


# ─────────────────────────────────────────
# FIREBASE PUBLIC CONFIG
# ─────────────────────────────────────────

@app.route("/api/firebase-config")
def firebase_config():
    config = {
        "apiKey": os.getenv("FIREBASE_API_KEY"),
        "authDomain": os.getenv("FIREBASE_AUTH_DOMAIN"),
        "projectId": os.getenv("FIREBASE_PROJECT_ID"),
        "storageBucket": os.getenv("FIREBASE_STORAGE_BUCKET"),
        "messagingSenderId": os.getenv("FIREBASE_MESSAGING_SENDER_ID"),
        "appId": os.getenv("FIREBASE_APP_ID"),
        "databaseURL": os.getenv("FIREBASE_DATABASE_URL"),
    }
    return jsonify({"success": True, "config": config})


# ─────────────────────────────────────────
# CONTACT FORM
# ─────────────────────────────────────────

@app.route("/api/contact", methods=["POST"])
def handle_contact():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Missing request JSON"}), 400
    
    data["ip_address"] = request.remote_addr

    result = contact_form(data)
    return jsonify(result), 200 if result["success"] else 400


# ─────────────────────────────────────────
# HEALTH
# ─────────────────────────────────────────

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "message": "Backend running"})


# ─────────────────────────────────────────

if __name__ == "__main__":
    debug = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    app.run(host="0.0.0.0", port=5000, debug=debug)
