

from flask import Flask, jsonify
from flask_cors import CORS
from routes.analyze_routes import analyze_bp
import os

app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max file size
app.config['UPLOAD_FOLDER'] = 'uploads'

# Enable CORS for all routes
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.register_blueprint(analyze_bp)

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


@app.route('/', methods=['GET'])
def index():
    """Home route."""
    return jsonify({
        "name": "ExamSage Backend",
        "version": "1.0.0",
        "description": "PYQ Weightage Analyzer API",
        "endpoints": {
            "analyze": "POST /api/analyze",
            "health": "GET /api/health"
        }
    }), 200


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    print("Starting ExamSage Backend...")
    print("Server running at http://localhost:5000")
    print("CORS enabled for frontend requests")
    app.run(debug=True, host='0.0.0.0', port=5000)
