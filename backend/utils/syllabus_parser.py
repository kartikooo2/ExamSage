import re

def parse_syllabus(text):

    if not text:
        return []

    # remove extra spaces
    text = re.sub(r'\s+', ' ', text)

    headings = [
        "Introduction",
        "Surveying",
        "Linear Measurements",
        "Angular Measurements",
        "Levelling",
        "Buildings",
        "Transportation",
        "Environmental Engineering",
        "Water Pollution"
    ]

    syllabus = []

    for i, heading in enumerate(headings):

        match = re.search(re.escape(heading), text, re.IGNORECASE)

        if not match:
            continue

        start = match.start()
        print(heading, "->", start)

        if start == -1:
            continue

        if i < len(headings)-1:
            end = len(text)
            for next_heading in headings[i+1:]:
                m = re.search(re.escape(next_heading), text[start+1:], re.IGNORECASE)
                if m:
                    end = start + 1 + m.start()
                    break    
        else:
            end = len(text)

        chapter_text = text[start:end].strip()

        syllabus.append({
            "unit": f"Unit {len(syllabus)+1}",
            "chapter": heading,
            "topics": [chapter_text]
        })

    return syllabus