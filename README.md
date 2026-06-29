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
git clone https://github.com/kartikooo2/ExamSage.git
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


cd frontend

npm install

npm run dev


## Future Improvements

* GPT-powered semantic question matching
* Subject-wise analytics
* Difficulty level prediction
* Marks distribution analysis
* Export reports as PDF
* User authentication
* Cloud deployment

---

Contributing to ExamSage


We appreciate every contribution, whether it's fixing bugs, improving documentation, adding features, or enhancing the user experience.

How to Contribute
1. Fork the Repository

Click the Fork button on GitHub to create your own copy of this repository.

2. Clone Your Fork
git clone https://github.com/kartikooo2/ExamSage.git
cd ExamSage
3. Create a New Branch

Create a branch for your feature or bug fix.

git checkout -b feature/your-feature-name


4. Install Dependencies
npm install
5. Run the Project
npm start

or if using Vite:

npm run dev
6. Make Your Changes
Follow the existing project structure.
Write clean and readable code.
Keep commits focused on a single feature or fix.
Test your changes before submitting.
7. Commit Your Changes
git add .
git commit -m "Add: Short description of your changes"


8. Push Your Branch
git push origin feature/your-feature-name
9. Open a Pull Request

Go to your fork on GitHub and click New Pull Request.

Please include:

A clear title.
A brief description of your changes.
Screenshots (if UI changes are involved).
Contribution Guidelines
Keep code clean and modular.
Follow consistent naming conventions.
Avoid unnecessary dependencies.
Update documentation if your changes affect usage.
Ensure your code does not introduce build errors.
Reporting Bugs

If you find a bug, please open an issue and include:

Bug description
Steps to reproduce
Expected behavior
Screenshots (if applicable)
Environment (OS, Browser, Node version)
Feature Requests

Have an idea to improve ExamSage?

Open an issue describing:

The problem you're trying to solve.
Your proposed solution.
Any alternatives you've considered.

