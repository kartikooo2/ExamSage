

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
 
    if not text or len(text.strip()) == 0:
        return []
    
    questions = []
    lines = text.split('\n')
    
    current_question = ""
    
    question_start_pattern = r'^[\s]*(?:[Qq](?:uestion|uest)?\.?\s*)?(?:\(?)(?:[a-z]|[IVX]+|\d+)(?:\)?[\.\):]|\))\s+'
    
    for line in lines:
        line_rstrip = line.rstrip()
        
        if re.match(question_start_pattern, line_rstrip):
            # Save previous question if exists and is non-empty
            if current_question.strip() and len(current_question.strip()) > 10:
                questions.append(current_question.strip())
            
            current_question = line_rstrip
        else:
            if current_question:
                current_question += " " + line_rstrip.strip()
            elif line_rstrip.strip():
                current_question = line_rstrip
    
    if current_question.strip() and len(current_question.strip()) > 10:
        questions.append(current_question.strip())
    
    return questions


def parse_questions(text, filename=None):
   
    if not text or len(text.strip()) == 0:
        return []
    
    year = None
    if filename:
        year = extract_year_from_filename(filename)
    if not year:
        year = extract_year_from_text(text)
    
    question_texts = split_questions(text)
    
    parsed_questions = []
    current_section = "General"
    
    for q_text in question_texts:
        section_match = detect_section(q_text)
        if section_match:
            current_section = section_match
            if len(q_text) < 50:
                continue
        
        marks = extract_marks(q_text)
        
        clean_question = q_text
        
        clean_question = re.sub(r'\s*\[?\d+\s*marks?\.?\]?\s*$', '', clean_question, flags=re.IGNORECASE)
        
        clean_question = re.sub(r'\s*\(\d+(?:\.\d+)?\s*marks?\)\s*$', '', clean_question, flags=re.IGNORECASE)
        
        clean_question = re.sub(r'\s*\(\d+(?:\.\d+)?\)\s*$', '', clean_question)
        clean_question = re.sub(r'\s*\[\d+(?:\.\d+)?\]\s*$', '', clean_question)
        
        clean_question = re.sub(r'\s*\d+\s*M\s*$', '', clean_question, flags=re.IGNORECASE)
        
        clean_question = clean_question.strip()
        
        if clean_question and len(clean_question) > 10:
            parsed_questions.append({
                "question": clean_question,
                "year": year,
                "section": current_section,
                "marks": marks
            })
    
    return parsed_questions
