

import pdfplumber
import os
from pdf2image import convert_from_path
import easyocr
import numpy as np


def extract_text_from_pdf(file_path):
   
    try:
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                page_text = page.extract_text()
                if page_text:
                    text += f"\n--- Page {page_num + 1} ---\n"
                    text += page_text
        if len(text.strip()) < 50:
            print("Scanned PDF detected. Running OCR...")
            text = extract_text_from_scanned_pdf(file_path)  
        print("========== Extracted Text ==========")
        print(text[:2000])   # Prints first 2000 characters
        print("===================================")    

        return text
    except Exception as e:
        print(f"Error extracting PDF {file_path}: {str(e)}")
        return ""
def extract_text_from_scanned_pdf(file_path):
   
    try:
        reader = easyocr.Reader(['en'])

        text = ""
        images = convert_from_path(
    file_path,
    poppler_path=r"D:\DSA\ExamSage\poppler-26.02.0\Library\bin"
)

        for image in images:
            image=np.array(image)
            result = reader.readtext(image, detail=0)
            text += " ".join(result) + "\n"

        return text

    except Exception as e:
        print(f"OCR Error: {str(e)}")
        return ""    


def extract_text_from_txt(file_path):
 
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except UnicodeDecodeError:
        # Try with a different encoding if UTF-8 fails
        try:
            with open(file_path, 'r', encoding='latin-1') as f:
                return f.read()
        except Exception as e:
            print(f"Error extracting TXT {file_path}: {str(e)}")
            return ""
    except Exception as e:
        print(f"Error reading TXT file {file_path}: {str(e)}")
        return ""


def extract_text(file_path):
   
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return ""
    
    file_ext = os.path.splitext(file_path)[1].lower()
    
    if file_ext == '.pdf':
        return extract_text_from_pdf(file_path)
    elif file_ext == '.txt':
        return extract_text_from_txt(file_path)
    else:
        print(f"Unsupported file type: {file_ext}")
        return ""
