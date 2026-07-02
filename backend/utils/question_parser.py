

import re
from pathlib import Path


def extract_year_from_filename(filename):
   
    matches = re.findall(r'\b(19|20)(\d{2})\b', filename)
    if matches:
        century, year_part = matches[-1]  # Take the last match (most likely the year)
        return int(century + year_part)
    
    matches = re.findall(r'\b(2\d{3})\b', filename)
    if matches:
        return int(matches[-1])
    
    return None


def extract_year_from_text(text):
   
    search_text = text[:2000] if len(text) > 2000 else text
    
    year_patterns = [
        r'[Yy]ear\s*[:=]?\s*(20\d{2})',  
        r'[Dd]ate\s*[:=]?\s*\d{1,2}[-/]?\d{1,2}[-/]?(20\d{2})',
        r'held\s*[:=]?\s*(20\d{2})', 
        r'\b(20\d{2})\b'  
    ]
    
    for pattern in year_patterns:
        matches = re.findall(pattern, search_text, re.IGNORECASE)
        if matches:
            year_str = matches[-1]
            try:
                return int(year_str)
            except ValueError:
                continue
    
    return None


def detect_section(line):
   
    section_patterns = [
        r'(?:Section|SECTION|Sec\.?)\s+([A-Z]|I{1,3}|[IVX]+)',
        r'(?:Part|PART|Pt\.?)\s+([A-Z]|I{1,3}|[IVX]+)',
        r'(?:\(|\\[)([A-Z]|I{1,3}|[IVX]+)(?:\)|\\])',
        r'SECTION\s*[:=]?\s*([A-Z]|[IVX]+)',
        r'PART\s*[:=]?\s*([A-Z]|[IVX]+)'
    ]
    
    for pattern in section_patterns:
        match = re.search(pattern, line, re.IGNORECASE)
        if match:
            section_letter = match.group(1).upper()
            return f"Section {section_letter}"
    
    return None


def extract_marks(question_text):
  
    mark_patterns = [
        r'\[(\d+(?:\.\d+)?)\]',                      
        r'\((\d+(?:\.\d+)?)\s*marks?\)',             
        r'(\d+(?:\.\d+)?)\s*marks?(?:\s|$)',         
        r'(\d+(?:\.\d+)?)\s*M\b',                    
        r'(\d+(?:\.\d+)?)\s*marks?\.?\s*\)',         
        r'\(\s*(\d+(?:\.\d+)?)\s*\)',                
        r'(\d+)\s*/\s*(\d+)\s*marks?',               
        r'[Mm]arks\s*[:=]?\s*(\d+(?:\.\d+)?)',       
    ]
    
    for pattern in mark_patterns:
        match = re.search(pattern, question_text, re.IGNORECASE)
        if match:
            try:
                if '/' in pattern and len(match.groups()) == 2:
                    numerator = float(match.group(1))
                    denominator = float(match.group(2))
                    if denominator != 0:
                        marks = int(round(numerator / denominator))
                    else:
                        continue
                else:
                    marks = int(round(float(match.group(1))))
                
                if 0 < marks <= 100:
                    return marks
            except (ValueError, IndexError):
                continue
    
    return None



def split_questions(text):

    if not text:
        return []

    text = text.replace("\r", "\n")
    text = re.sub(r'(?<![A-Za-z])0[\.:]?\s*(\d)', r'Q.\1', text)

    # Normalize section headings
    text = re.sub(r'PARL[_ ]?A|PART[_ ]?A', '\nPART A\n', text, flags=re.I)
    text = re.sub(r'PARL[_ ]?B|PART[_ ]?B', '\nPART B\n', text, flags=re.I)
    text = re.sub(r'PARL[_ ]?C|PART[_ ]?C', '\nPART C\n', text, flags=re.I)

    # Remove page numbers
    text = re.sub(r'Page\s+\d+\s+of\s+\d+', '', text, flags=re.I)

    # Start every question on a new line
    text = re.sub(r'(Q\.?\s*\d+)', r'\n\1', text)

    # OCR sometimes writes 01,02,03...

    lines = text.split("\n")

    questions = []

    current = ""

    for line in lines:

        line = " ".join(line.split())

        if not line:
            continue

        # Ignore obvious garbage
        if any(x in line.lower() for x in [
            "roll no",
            "maximum marks",
            "instructions",
            "time:",
            "total no"
        ]):
            continue

        # Section heading
        if re.match(r'^PART\s+[ABC]$', line, re.I):

            if current:
                questions.append(current.strip())
                current = ""

            questions.append(line.upper())
            continue

        # New question
        if re.search(r'Q\.?\s*\d+', line, re.I):

            if current:
                questions.append(current.strip())

            current = line

        else:
            if current:
                current += " " + line

    if current:
        questions.append(current.strip())

    return questions



def parse_questions(text, filename=None):

    if not text or len(text.strip()) == 0:
        return []

    year = None
    if filename:
        year = extract_year_from_filename(filename)
    if not year:
        year = extract_year_from_text(text)

    questions = split_questions(text)
    print("Questions Found:", len(questions))
    print("------------ QUESTIONS ------------")
    for i, q in enumerate(questions):
        print(i + 1, q[:120])
    


    parsed_questions = []
    current_marks = 2
    current_section = "Part A"

    for q in questions:

        q_lower = q.lower()
        if q.strip().upper() == "PART A":
            current_marks = 2
            current_section = "Part A"
            continue

        elif q.strip().upper() == "PART B":
            current_marks = 4
            current_section = "Part B"
            continue

        elif q.strip().upper() == "PART C":
            current_marks = 10
            current_section = "Part C"
            continue

        print("--------------------------------")
        print("SECTION:", current_section)
        print(q[:100])

        parsed_questions.append({
        "question": q,
        "year": year,
        "section": current_section,
        "marks": current_marks
        })

    return parsed_questions