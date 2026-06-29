

export const demoResponse = {
  "success": true,
  "timestamp": "2024-01-15T10:30:00",
  "data": {
    "subject": "Engineering Mathematics",
    "summary": {
      "totalPapers": 3,
      "totalChapters": 8,
      "mostRepeatedChapter": "Matrices",
      "highestWeightageChapter": "Differential Equations"
    },
    "chapters": [
      {
        "unit": "Unit 1",
        "chapter": "Matrices",
        "questionCount": 12,
        "totalMarks": 42,
        "years": [2021, 2022, 2023],
        "sections": {
          "Section A": 5,
          "Section B": 4,
          "Part A": 3
        },
        "averageConfidence": 0.89,
        "repeatedTopics": [
          "eigenvalues",
          "rank",
          "determinant"
        ],
        "matchedQuestions": [
          {
            "question": "Define the rank of a matrix and explain its significance",
            "year": 2023,
            "section": "Section A",
            "marks": 2,
            "confidence": 0.94
          },
          {
            "question": "Find the inverse of the matrix [[1, 2], [3, 4]] using the adjugate method",
            "year": 2023,
            "section": "Section B",
            "marks": 5,
            "confidence": 0.87
          },
          {
            "question": "Find all eigenvalues and eigenvectors of the matrix [[4, 1], [2, 3]]",
            "year": 2023,
            "section": "Section C",
            "marks": 10,
            "confidence": 0.92
          }
        ]
      },
      {
        "unit": "Unit 2",
        "chapter": "Differential Calculus",
        "questionCount": 9,
        "totalMarks": 35,
        "years": [2021, 2022, 2023],
        "sections": {
          "Section A": 3,
          "Section B": 4,
          "Part A": 2
        },
        "averageConfidence": 0.85,
        "repeatedTopics": [
          "derivatives",
          "limit",
          "taylor series"
        ],
        "matchedQuestions": [
          {
            "question": "Find the derivative of x^3 + 2x^2 - 5 with respect to x",
            "year": 2023,
            "section": "Section A",
            "marks": 2,
            "confidence": 0.91
          },
          {
            "question": "Find the limit as x approaches 0 of sin(x)/x",
            "year": 2022,
            "section": "Section A",
            "marks": 2,
            "confidence": 0.88
          }
        ]
      },
      {
        "unit": "Unit 3",
        "chapter": "Differential Equations",
        "questionCount": 10,
        "totalMarks": 48,
        "years": [2021, 2022, 2023],
        "sections": {
          "Section B": 5,
          "Section C": 5
        },
        "averageConfidence": 0.82,
        "repeatedTopics": [
          "first-order",
          "second-order",
          "linear equations"
        ],
        "matchedQuestions": [
          {
            "question": "Solve the differential equation dy/dx + 2y = e^(-2x) using integrating factor method",
            "year": 2023,
            "section": "Section C",
            "marks": 10,
            "confidence": 0.89
          },
          {
            "question": "Solve the second-order differential equation d^2y/dx^2 - 3*dy/dx + 2y = 0",
            "year": 2022,
            "section": "Section B",
            "marks": 10,
            "confidence": 0.84
          }
        ]
      },
      {
        "unit": "Unit 1",
        "chapter": "Systems of Linear Equations",
        "questionCount": 7,
        "totalMarks": 28,
        "years": [2022, 2023],
        "sections": {
          "Section B": 4,
          "Part B": 3
        },
        "averageConfidence": 0.81,
        "repeatedTopics": [
          "gaussian elimination",
          "consistency"
        ],
        "matchedQuestions": [
          {
            "question": "Solve the system of equations: 2x + 3y + z = 9, x + y + z = 5, 3x - y + 2z = 8",
            "year": 2023,
            "section": "Section B",
            "marks": 5,
            "confidence": 0.88
          }
        ]
      },
      {
        "unit": "Unit 2",
        "chapter": "Integral Calculus",
        "questionCount": 8,
        "totalMarks": 32,
        "years": [2021, 2023],
        "sections": {
          "Section B": 4,
          "Section C": 4
        },
        "averageConfidence": 0.79,
        "repeatedTopics": [
          "integration by parts",
          "definite integral"
        ],
        "matchedQuestions": [
          {
            "question": "Integrate x^2 * e^x from 0 to 1 using integration by parts",
            "year": 2022,
            "section": "Section B",
            "marks": 5,
            "confidence": 0.85
          }
        ]
      },
      {
        "unit": "Unit 4",
        "chapter": "Complex Analysis",
        "questionCount": 6,
        "totalMarks": 20,
        "years": [2021, 2022],
        "sections": {
          "Section A": 2,
          "Section B": 4
        },
        "averageConfidence": 0.76,
        "repeatedTopics": [
          "complex numbers",
          "cauchy-riemann"
        ],
        "matchedQuestions": [
          {
            "question": "Verify that u = e^x * sin(y) satisfies Laplace's equation",
            "year": 2022,
            "section": "Section C",
            "marks": 10,
            "confidence": 0.81
          }
        ]
      },
      {
        "unit": "Unit 5",
        "chapter": "Vector Calculus",
        "questionCount": 5,
        "totalMarks": 18,
        "years": [2021, 2023],
        "sections": {
          "Section B": 2,
          "Section C": 3
        },
        "averageConfidence": 0.78,
        "repeatedTopics": [
          "divergence",
          "stokes theorem"
        ],
        "matchedQuestions": [
          {
            "question": "Verify Stokes' theorem for the vector field F = (y, z, x) over the unit sphere",
            "year": 2023,
            "section": "Section C",
            "marks": 10,
            "confidence": 0.80
          }
        ]
      },
      {
        "unit": "Unit 6",
        "chapter": "Probability and Statistics",
        "questionCount": 4,
        "totalMarks": 12,
        "years": [2021, 2023],
        "sections": {
          "Section A": 2,
          "Section B": 2
        },
        "averageConfidence": 0.75,
        "repeatedTopics": [
          "probability",
          "normal distribution"
        ],
        "matchedQuestions": [
          {
            "question": "A box contains 5 red balls and 3 black balls. If 2 balls are drawn without replacement, find the probability that both are red",
            "year": 2023,
            "section": "Section A",
            "marks": null,
            "confidence": 0.72
          }
        ]
      }
    ]
  },
  "sectionDistribution": {
    "Section A": 22,
    "Section B": 26,
    "Section C": 22,
    "Part A": 5
  },
  "totalQuestionsProcessed": 61,
  "totalChaptersInSyllabus": 15
}

export default demoResponse
