"""
Analyze route handler for the /api/analyze endpoint.
Orchestrates the full analysis pipeline.
"""

import os
import uuid
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime

from utils.file_parser import extract_text
from utils.syllabus_parser import parse_syllabus
from utils.question_parser import parse_questions
from utils.matcher import match_all_questions
from utils.analytics import (
    generate_analytics,
    extract_section_distribution,
    extract_chapter_marks_data,
    extract_chapter_questions_data
)

# Create blueprint
analyze_bp = Blueprint('analyze', __name__, url_prefix='/api')

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def allowed_file(filename):
    """Check if file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_uploaded_file(file):
    """
    Save an uploaded file with a unique name.
    
    Args:
        file: Flask file object
        
    Returns:
        str: Path to saved file or None if failed
    """
    if not file or file.filename == '':
        return None
    
    if not allowed_file(file.filename):
        return None
    
    # Generate unique filename
    file_ext = file.filename.rsplit('.', 1)[1].lower()
    unique_name = f"{uuid.uuid4().hex}.{file_ext}"
    filepath = os.path.join(UPLOAD_FOLDER, unique_name)
    
    try:
        file.save(filepath)
        return filepath
    except Exception as e:
        print(f"Error saving file: {str(e)}")
        return None


def cleanup_files(file_paths):
    """
    Clean up temporary uploaded files.
    
    Args:
        file_paths (list): List of file paths to delete
    """
    for filepath in file_paths:
        try:
            if filepath and os.path.exists(filepath):
                os.remove(filepath)
        except Exception as e:
            print(f"Error deleting file {filepath}: {str(e)}")


@analyze_bp.route('/analyze', methods=['POST'])
def analyze():
    """
    Main analysis endpoint.
    
    Accepts:
    - subjectName (string): Name of the subject
    - syllabusFile (file): Syllabus file (PDF or TXT)
    - pyqFiles (files): List of PYQ files (PDF or TXT)
    
    Returns:
    - JSON with analytics results
    """
    
    try:
        # Validate request
        if 'syllabusFile' not in request.files:
            return jsonify({"error": "Syllabus file is required"}), 400
        
        if 'pyqFiles' not in request.files:
            return jsonify({"error": "At least one PYQ file is required"}), 400
        
        subject_name = request.form.get('subjectName', 'Unknown Subject').strip()
        if not subject_name:
            return jsonify({"error": "Subject name is required"}), 400
        
        # Get files
        syllabus_file = request.files['syllabusFile']
        pyq_files = request.files.getlist('pyqFiles')
        
        # Validate syllabus file
        if syllabus_file.filename == '':
            return jsonify({"error": "Syllabus file is empty"}), 400
        
        if not allowed_file(syllabus_file.filename):
            return jsonify({"error": "Unsupported syllabus file type"}), 400
        
        # Validate PYQ files
        if len(pyq_files) == 0:
            return jsonify({"error": "At least one PYQ file is required"}), 400
        
        valid_pyq_files = [f for f in pyq_files if f.filename != '' and allowed_file(f.filename)]
        if len(valid_pyq_files) == 0:
            return jsonify({"error": "No valid PYQ files provided"}), 400
        
        uploaded_paths = []
        
        try:
            # Save and extract syllabus
            syllabus_path = save_uploaded_file(syllabus_file)
            if not syllabus_path:
                return jsonify({"error": "Failed to save syllabus file"}), 400
            
            uploaded_paths.append(syllabus_path)
            
            syllabus_text = extract_text(syllabus_path)
            if not syllabus_text:
                return jsonify({"error": "Could not extract text from syllabus file"}), 400
            
            # Parse syllabus
            syllabus_data = parse_syllabus(syllabus_text)
            if not syllabus_data:
                return jsonify({"error": "Could not parse syllabus structure"}), 400
            
            # Process PYQ files
            all_matched_questions = []
            
            for pyq_file in valid_pyq_files:
                # Save PYQ file
                pyq_path = save_uploaded_file(pyq_file)
                if not pyq_path:
                    continue
                
                uploaded_paths.append(pyq_path)
                
                # Extract text
                pyq_text = extract_text(pyq_path)
                if not pyq_text:
                    continue
                
                # Parse questions
                questions = parse_questions(pyq_text, pyq_file.filename)
                if not questions:
                    continue
                
                # Match questions to chapters
                matched_questions = match_all_questions(questions, syllabus_data)
                all_matched_questions.extend(matched_questions)
            
            if not all_matched_questions:
                return jsonify({"error": "No questions could be extracted from PYQ files"}), 400
            
            # Generate analytics
            analytics = generate_analytics(subject_name, syllabus_data, all_matched_questions)
            
            # Extract additional data for frontend
            section_distribution = extract_section_distribution(analytics.get("chapters", []))
            
            # Build response
            response = {
                "success": True,
                "timestamp": datetime.now().isoformat(),
                "data": analytics,
                "sectionDistribution": section_distribution,
                "totalQuestionsProcessed": len(all_matched_questions),
                "totalChaptersInSyllabus": len(syllabus_data)
            }
            
            return jsonify(response), 200
        
        finally:
            # Clean up uploaded files
            cleanup_files(uploaded_paths)
    
    except Exception as e:
        print(f"Error in /analyze route: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500


@analyze_bp.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({"status": "ok"}), 200
