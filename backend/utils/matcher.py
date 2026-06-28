

import re
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


STOP_WORDS = {
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does',
    'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'as', 'if',
    'from', 'by', 'about', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it',
    'we', 'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all', 'each',
    'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
    'only', 'same', 'so', 'than', 'too', 'very', 'just', 'given', 'state', 'find', 'discuss'
}


def simple_stem(word):
  
    word = word.lower()
    
    suffixes = ['tion', 'sion', 'ity', 'ness', 'ment', 'able', 'ible', 'ing', 'ed', 'ly', 'er', 'est']
    
    for suffix in suffixes:
        if word.endswith(suffix) and len(word) > len(suffix) + 2:
            return word[:-len(suffix)]
    
    return word


def tokenize_and_clean(text):
   
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s\-]', ' ', text)  # Keep hyphens and numbers
    
    tokens = re.findall(r'[a-z0-9]+(?:-[a-z0-9]+)*', text)
    
    meaningful_tokens = []
    for token in tokens:
        if (len(token) >= 3 and 
            token not in STOP_WORDS and 
            not token.isdigit()):
            # Apply stemming for better matching
            stemmed = simple_stem(token)
            meaningful_tokens.append(stemmed)
    
    return meaningful_tokens


def calculate_keyword_overlap(question_text, chapter_text):
  
    q_tokens = set(tokenize_and_clean(question_text))
    c_tokens = set(tokenize_and_clean(chapter_text))
    
    if not q_tokens or not c_tokens:
        return 0.0
    
    intersection = len(q_tokens & c_tokens)
    union = len(q_tokens | c_tokens)
    
    if union == 0:
        return 0.0
    
    overlap_score = intersection / union
    
    return overlap_score


def calculate_tfidf_similarity(question_text, chapter_text):
   
    try:
        q_processed = ' '.join(tokenize_and_clean(question_text))
        c_processed = ' '.join(tokenize_and_clean(chapter_text))
        
        if not q_processed.strip() or not c_processed.strip():
            return 0.0
        
        vectorizer = TfidfVectorizer(
            max_features=200,  # Reduced for efficiency
            lowercase=True,
            min_df=1,
            max_df=0.95,
            ngram_range=(1, 2)  # Use unigrams and bigrams for better context
        )
        
        texts = [q_processed, c_processed]
        tfidf_matrix = vectorizer.fit_transform(texts)
        
        similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]
        
        return float(similarity)
    except Exception as e:
        return 0.0


def calculate_text_length_factor(question_text):

    word_count = len(tokenize_and_clean(question_text))
    
    if word_count < 5:
        return 0.8
    elif word_count >= 20:
        return 1.0
    else:
        return 0.8 + (word_count - 5) / 15.0 * 0.2


def match_question_to_chapter(question_text, syllabus_data):
 
    if not question_text or not syllabus_data:
        return {
            "matchedUnit": None,
            "matchedChapter": "Unknown",
            "confidence": 0.0
        }
    
    best_score = -1
    best_match = None
    
    length_factor = calculate_text_length_factor(question_text)
    
    for chapter_entry in syllabus_data:
        unit = chapter_entry.get("unit", "General")
        chapter = chapter_entry.get("chapter", "Unknown")
        topics = chapter_entry.get("topics", [])
        
        chapter_text = f"{chapter} {chapter} " + " ".join(topics)
        
        keyword_score = calculate_keyword_overlap(question_text, chapter_text)
        
        tfidf_score = calculate_tfidf_similarity(question_text, chapter_text)
        
        combined_score = 0.35 * keyword_score + 0.65 * tfidf_score
        
        combined_score *= length_factor
        
        if combined_score > best_score:
            best_score = combined_score
            best_match = {
                "unit": unit,
                "chapter": chapter,
                "topics": topics
            }
    
    confidence = max(0.0, min(1.0, best_score))
    
    if confidence > 0.0 and confidence < 0.3:
        q_tokens = set(tokenize_and_clean(question_text))
        if best_match:
            chapter_text = f"{best_match['chapter']} " + " ".join(best_match['topics'])
            c_tokens = set(tokenize_and_clean(chapter_text))
            if q_tokens & c_tokens:
                confidence = max(confidence, 0.3)
    
    if best_match is None:
        return {
            "matchedUnit": None,
            "matchedChapter": "Unknown",
            "confidence": 0.0
        }
    
    return {
        "matchedUnit": best_match["unit"],
        "matchedChapter": best_match["chapter"],
        "confidence": confidence
    }


def match_all_questions(questions, syllabus_data):
 
    matched_questions = []
    
    for question in questions:
        q_text = question.get("question", "")
        
        match_info = match_question_to_chapter(q_text, syllabus_data)
        
        matched_question = question.copy()
        matched_question.update({
            "matchedUnit": match_info["matchedUnit"],
            "matchedChapter": match_info["matchedChapter"],
            "confidence": match_info["confidence"]
        })
        
        matched_questions.append(matched_question)
    
    return matched_questions
