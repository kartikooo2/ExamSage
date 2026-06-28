

from collections import Counter, defaultdict


def generate_analytics(subject_name, syllabus_data, matched_questions):
    
    
    if not matched_questions:
        return {
            "subject": subject_name,
            "summary": {
                "totalPapers": 0,
                "totalChapters": 0,
                "mostRepeatedChapter": None,
                "highestWeightageChapter": None
            },
            "chapters": []
        }
    
    # Initialize data structures
    chapter_data = defaultdict(lambda: {
        "unit": None,
        "chapter": None,
        "questions": [],
        "years": set(),
        "sections": Counter(),
        "total_marks": 0,
        "question_count": 0
    })
    
    # Group questions by matched chapter
    for q in matched_questions:
        chapter_key = (q.get("matchedUnit"), q.get("matchedChapter"))
        
        if chapter_key == (None, "Unknown") or not q.get("matchedChapter"):
            continue
        
        chapter_data[chapter_key]["unit"] = q.get("matchedUnit")
        chapter_data[chapter_key]["chapter"] = q.get("matchedChapter")
        chapter_data[chapter_key]["questions"].append(q)
        
        # Track year
        if q.get("year"):
            chapter_data[chapter_key]["years"].add(q.get("year"))
        
        # Track section
        if q.get("section") and q.get("section") != "Unknown":
            chapter_data[chapter_key]["sections"][q.get("section")] += 1
        
        # Track marks
        if q.get("marks"):
            chapter_data[chapter_key]["total_marks"] += q.get("marks")
        
        chapter_data[chapter_key]["question_count"] += 1
    
    # Extract unique years and papers
    all_years = set()
    for chapter in chapter_data.values():
        all_years.update(chapter["years"])
    
    # Build chapters list for response
    chapters_list = []
    
    for (unit, chapter_name), data in chapter_data.items():
        if data["question_count"] == 0:
            continue
        
        # Calculate average confidence
        confidences = [q.get("confidence", 0.5) for q in data["questions"]]
        avg_confidence = sum(confidences) / len(confidences) if confidences else 0.0
        
        # Extract repeated topics
        all_topics = []
        for q in data["questions"]:
            all_topics.extend(q.get("matchedTopics", []))
        
        # Count topic frequency and get top ones
        topic_counter = Counter(all_topics)
        repeated_topics = [topic for topic, count in topic_counter.most_common(5) if count > 1]
        
        chapter_info = {
            "unit": unit or "General",
            "chapter": chapter_name,
            "questionCount": data["question_count"],
            "totalMarks": data["total_marks"] if data["total_marks"] > 0 else None,
            "years": sorted(list(data["years"])),
            "sections": dict(data["sections"]),
            "averageConfidence": round(avg_confidence, 2),
            "repeatedTopics": repeated_topics,
            "matchedQuestions": [
                {
                    "question": q.get("question", "")[:200],  # Limit to 200 chars
                    "year": q.get("year"),
                    "section": q.get("section"),
                    "marks": q.get("marks"),
                    "confidence": round(q.get("confidence", 0.5), 2)
                }
                for q in data["questions"]
            ]
        }
        
        chapters_list.append(chapter_info)
    
    # Sort chapters by question count (descending)
    chapters_list.sort(key=lambda x: x["questionCount"], reverse=True)
    
    # Find most repeated and highest weightage chapters
    most_repeated_chapter = None
    highest_weightage_chapter = None
    
    if chapters_list:
        most_repeated_chapter = chapters_list[0]["chapter"]  # Already sorted by count
        
        # Find highest weightage (by marks, or fallback to question count)
        chapters_with_marks = [c for c in chapters_list if c["totalMarks"] and c["totalMarks"] > 0]
        if chapters_with_marks:
            highest_weightage_chapter = max(chapters_with_marks, key=lambda x: x["totalMarks"])["chapter"]
        else:
            highest_weightage_chapter = most_repeated_chapter
    
    # Build summary
    summary = {
        "totalPapers": len(all_years) if all_years else 0,
        "totalChapters": len(chapters_list),
        "mostRepeatedChapter": most_repeated_chapter,
        "highestWeightageChapter": highest_weightage_chapter
    }
    
    return {
        "subject": subject_name,
        "summary": summary,
        "chapters": chapters_list
    }


def extract_section_distribution(chapters_data):
    """
    Extract section-wise question distribution for charts.
    
    Args:
        chapters_data (list): Chapters list from analytics
        
    Returns:
        dict: Section name -> question count
    """
    section_dist = Counter()
    
    for chapter in chapters_data:
        sections = chapter.get("sections", {})
        for section, count in sections.items():
            section_dist[section] += count
    
    return dict(section_dist)


def extract_chapter_marks_data(chapters_data):
    """
    Extract chapter-wise marks for charting.
    
    Args:
        chapters_data (list): Chapters list from analytics
        
    Returns:
        list: List of dicts with chapter name and marks
    """
    data = []
    for chapter in chapters_data:
        if chapter.get("totalMarks"):
            data.append({
                "chapter": chapter["chapter"],
                "marks": chapter["totalMarks"]
            })
    return data


def extract_chapter_questions_data(chapters_data):
    """
    Extract chapter-wise question count for charting.
    
    Args:
        chapters_data (list): Chapters list from analytics
        
    Returns:
        list: List of dicts with chapter name and question count
    """
    data = []
    for chapter in chapters_data:
        data.append({
            "chapter": chapter["chapter"],
            "questionCount": chapter["questionCount"]
        })
    return data
