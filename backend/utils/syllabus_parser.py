

import re


def parse_syllabus(text):
   
    if not text or len(text.strip()) == 0:
        return []
    
    lines = text.split('\n')
    syllabus_data = []
    
    current_unit = None
    current_chapter = None
    current_topics = []
    
    unit_pattern = r'^(?:Unit|Module|UNIT|MODULE|Unit#|UNIT#)[\s-]*([IVX]+|[A-Z]|[\d]+)[:\s-]*(.*)?$'
    
    chapter_pattern = r'^(?:Chapter|CHAPTER|Ch\.?|Topic|TOPIC|SECTION|Section)[\s-]*([IVX]+|[A-Z]|[\d]+)[:\s-]*(.*)?$'
    
    heading_pattern = r'^[A-Z][A-Za-z\s&-]+:?$'
    
    for original_line in lines:
        indent_level = len(original_line) - len(original_line.lstrip())
        line = original_line.strip()
        
        if not line:
            continue
        
        unit_match = re.match(unit_pattern, line, re.IGNORECASE)
        if unit_match:
            if current_chapter and current_topics:
                syllabus_data.append({
                    "unit": current_unit or "General",
                    "chapter": current_chapter,
                    "topics": current_topics
                })
            
            current_unit = f"Unit {unit_match.group(1)}"
            current_chapter = unit_match.group(2).strip() if unit_match.group(2) else None
            current_topics = []
            continue
        
        chapter_match = re.match(chapter_pattern, line, re.IGNORECASE)
        if chapter_match:
            if current_chapter and current_topics:
                syllabus_data.append({
                    "unit": current_unit or "General",
                    "chapter": current_chapter,
                    "topics": current_topics
                })
            
            chapter_name = chapter_match.group(2).strip() if chapter_match.group(2) else f"Chapter {chapter_match.group(1)}"
            current_chapter = chapter_name
            current_topics = []
            continue
        
        is_heading = (re.match(heading_pattern, line) and 
                     not line.startswith(('-', '•', '*', '·', '○', '□')) and
                     not re.match(r'^\d+[\.\)]\s', line) and
                     len(line) < 100 and
                     indent_level <= 4)  # Allow some indentation for headings
        
        if is_heading and (not current_chapter or len(current_topics) > 0):
            if current_chapter and current_topics:
                syllabus_data.append({
                    "unit": current_unit or "General",
                    "chapter": current_chapter,
                    "topics": current_topics
                })
            current_chapter = line
            current_topics = []
            continue
        
        if current_chapter:
            cleaned_topic = re.sub(r'^[\s\-•*·○□]+', '', line)  # Remove bullets
            cleaned_topic = re.sub(r'^(\(?\d+\)?[\.\):]?\s*)', '', cleaned_topic)  # Remove (1), 1., 1) style
            cleaned_topic = re.sub(r'^\[\d+\]\s*', '', cleaned_topic)  # Remove [1] style
            cleaned_topic = re.sub(r'^[a-z][\.\)]\s*', '', cleaned_topic, flags=re.IGNORECASE)  # Remove a., a) style
            cleaned_topic = re.sub(r'^\([a-z]\)\s*', '', cleaned_topic, flags=re.IGNORECASE)  # Remove (a) style
            cleaned_topic = re.sub(r'^[IVX]+[\.\)]\s*', '', cleaned_topic, flags=re.IGNORECASE)  # Remove Roman numerals
            cleaned_topic = re.sub(r'^\([IVX]+\)\s*', '', cleaned_topic, flags=re.IGNORECASE)  # Remove (I) style
            cleaned_topic = cleaned_topic.strip()
            
            if cleaned_topic and len(cleaned_topic) > 2 and not re.match(r'^[\s\-:;,.]+$', cleaned_topic):
                current_topics.append(cleaned_topic)
    
    if current_chapter and current_topics:
        syllabus_data.append({
            "unit": current_unit or "General",
            "chapter": current_chapter,
            "topics": current_topics
        })
    
    if not syllabus_data:
        topics = []
        for line in lines:
            cleaned = line.strip()
            if (cleaned and len(cleaned) > 3 and 
                not cleaned.endswith(':') and 
                not re.match(r'^[\s\-=_#*]+$', cleaned)):
                topics.append(cleaned)
        
        if topics:
            syllabus_data.append({
                "unit": "General",
                "chapter": "Syllabus Topics",
                "topics": topics[:30]  # Limit to first 30 lines to avoid noise
            })
    
    return syllabus_data
