# 📚 ExamSage – AI-Powered PYQ Weightage Analyzer

## Overview

ExamSage is an AI-powered web application that analyzes a syllabus and Previous Year Question Papers (PYQs) to identify chapter-wise exam trends. The system automatically maps questions to syllabus topics and generates insights such as chapter weightage, frequently asked topics, and question distribution.

The goal is to help students focus on high-priority topics and prepare more effectively for exams.

---

## Features

* 📄 Upload syllabus PDF or TXT file
* 📚 Upload multiple Previous Year Question Papers
* 🤖 Automatic question-to-chapter matching
* 📊 Chapter-wise weightage analysis
* 📈 Frequency of questions from each chapter
* 📝 Topic-wise question distribution
* 📂 Support for both digital and scanned PDFs (OCR integration)
* 📱 Responsive and modern user interface

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* Recharts

### Backend

* Python
* Flask
* Flask-CORS

### AI & Data Processing

* pdfplumber
* EasyOCR
* pdf2image
* Scikit-learn (TF-IDF + Cosine Similarity)
* Regular Expressions (Regex)

---

## Project Structure

```
ExamSage/
│
├── backend/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── app.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## How It Works

1. Upload the syllabus.
2. Upload one or more PYQ PDFs.
3. The backend extracts text from the documents.
4. OCR is used automatically for scanned PDFs.
5. Questions are matched to syllabus chapters using NLP techniques.
6. Analytics are generated.
7. Results are displayed as charts and tables.

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd ExamSage
```

### Backend

```bash
cd backend

python -m venv venv

source venv/Scripts/activate

pip install -r requirements.txt

python app.py
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Future Improvements

* GPT-powered semantic question matching
* Subject-wise analytics
* Difficulty level prediction
* Marks distribution analysis
* Export reports as PDF
* User authentication
* Cloud deployment

---

