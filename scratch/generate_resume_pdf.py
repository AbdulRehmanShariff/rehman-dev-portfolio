import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable
)

def build_pdf():
    # Output paths
    output_dir = os.path.join(os.getcwd(), 'public', 'resume')
    os.makedirs(output_dir, exist_ok=True)
    
    target_pdf = os.path.join(output_dir, 'Rehman_Shariff_Resume.pdf')
    fallback_pdf = os.path.join(os.getcwd(), 'public', 'resume.pdf')

    # Page setup - 0.4 inch margins for 1 page fit
    doc = SimpleDocTemplate(
        target_pdf,
        pagesize=letter,
        leftMargin=0.4 * inch,
        rightMargin=0.4 * inch,
        topMargin=0.35 * inch,
        bottomMargin=0.35 * inch
    )

    styles = getSampleStyleSheet()
    
    # Custom Typography matching the uploaded resume image
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=1,
        textColor=colors.HexColor('#111827'),
        spaceAfter=2
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=14,
        alignment=1,
        textColor=colors.HexColor('#1F2937'),
        spaceAfter=4
    )

    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=11,
        alignment=1,
        textColor=colors.HexColor('#374151'),
        spaceAfter=6
    )

    section_heading = ParagraphStyle(
        'DocSectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=colors.HexColor('#111827'),
        spaceBefore=5,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=11.5,
        textColor=colors.HexColor('#1F2937'),
        spaceAfter=3
    )

    bold_label_style = ParagraphStyle(
        'DocBoldLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11.5,
        textColor=colors.HexColor('#111827')
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#1F2937'),
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=1.5
    )

    story = []

    # 1. HEADER
    story.append(Paragraph("REHMAN SHARIFF", title_style))
    story.append(Paragraph("PYTHON DEVELOPER", subtitle_style))
    
    contact_text = (
        "rehmanshariff996@gmail.com &nbsp;&bull;&nbsp; 9036069732 &nbsp;&bull;&nbsp; Bengaluru, Karnataka<br/>"
        "<font color='#2563EB'><u><a href='https://www.linkedin.com/in/rehman-shariff-8a8071305'>LinkedIn</a></u></font> &nbsp;&bull;&nbsp; "
        "<font color='#2563EB'><u><a href='https://github.com/AbdulRehmanShariff'>GitHub</a></u></font> &nbsp;&bull;&nbsp; "
        "Portfolio"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#374151'), spaceAfter=4))

    # 2. SUMMARY
    story.append(Paragraph("SUMMARY", section_heading))
    story.append(Paragraph(
        "Recent Artificial Intelligence & Machine Learning graduate with hands-on experience in Python, Flask, SQL, and web application development. Developed database-driven and AI-powered applications using Python and MySQL, with a strong foundation in backend development, problem-solving, and scalable software design.",
        body_style
    ))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#9CA3AF'), spaceBefore=2, spaceAfter=4))

    # 3. TECHNICAL SKILLS
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    skills_items = [
        ("Programming Languages", "Python, SQL, JavaScript"),
        ("Backend & Web Development", "Flask, RESTful APIs, HTML5, CSS3"),
        ("Databases", "MySQL"),
        ("Libraries & Frameworks", "NumPy, Pandas, Scikit-learn, TensorFlow, OpenCV"),
        ("Machine Learning & AI", "Machine Learning, Generative AI"),
        ("Tools & Platforms", "Git, GitHub, VS Code, Jupyter Notebook, Google Colab"),
        ("Core Concepts", "Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), Database Management")
    ]
    for label, val in skills_items:
        txt = f"<b>{label}:</b> {val}"
        story.append(Paragraph(txt, body_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#9CA3AF'), spaceBefore=2, spaceAfter=4))

    # 4. PROJECTS
    story.append(Paragraph("PROJECTS", section_heading))
    
    # Project 1
    story.append(Paragraph("<b>Deepfake Detection System (Major Project)</b>", bold_label_style))
    story.append(Paragraph("<b>Technologies:</b> Python, Flask, React.js, MySQL, TensorFlow, Keras, OpenCV", body_style))
    story.append(Paragraph("&bull; Developed a full-stack web application to detect manipulated image, video, and audio content using Python-based machine learning models.", bullet_style))
    story.append(Paragraph("&bull; Designed and integrated a Flask backend for file upload, processing, and real-time prediction workflows.", bullet_style))
    story.append(Paragraph("&bull; Optimized data processing and model performance, achieving over 90% detection accuracy across multiple content formats.", bullet_style))
    story.append(Paragraph("&bull; Enhanced the platform with misinformation detection and chatbot features to improve user interaction and accessibility.", bullet_style))

    story.append(Spacer(1, 3))

    # Project 2
    story.append(Paragraph("<b>Smart Resume Screening & Candidate Ranking System</b>", bold_label_style))
    story.append(Paragraph("<b>Technologies:</b> Python, Flask, React.js, MySQL, spaCy, Sentence Transformers", body_style))
    story.append(Paragraph("&bull; Developed an AI-powered resume screening platform that automates candidate evaluation and ranking based on job requirements.", bullet_style))
    story.append(Paragraph("&bull; Built an NLP pipeline to extract candidate information from PDF and DOCX resumes and store data in MySQL.", bullet_style))
    story.append(Paragraph("&bull; Implemented semantic matching and scoring mechanisms to compare candidate profiles with job descriptions and generate ATS-style rankings.", bullet_style))
    story.append(Paragraph("&bull; Developed a dashboard for displaying candidate rankings, match scores, and recruitment insights, reducing manual screening effort.", bullet_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#9CA3AF'), spaceBefore=2, spaceAfter=4))

    # 5. INTERNSHIPS
    story.append(Paragraph("INTERNSHIPS", section_heading))
    
    # Internship 1
    story.append(Paragraph("<b>Data Science Intern | QSpiders, Hebbal</b> &nbsp;&nbsp;&nbsp;&nbsp; <i>Feb 2026 &ndash; May 2026</i>", body_style))
    story.append(Paragraph("&bull; Worked with Python, NumPy, Pandas, and data preprocessing techniques for data analysis and machine learning tasks.", bullet_style))
    story.append(Paragraph("&bull; Applied data science and machine learning concepts through project-based assignments, problem-solving exercises, and technical presentations.", bullet_style))

    story.append(Spacer(1, 2))

    # Internship 2
    story.append(Paragraph("<b>Artificial Intelligence Intern | LearnX (Powered by Wipro)</b> &nbsp;&nbsp;&nbsp;&nbsp; <i>2 Months</i>", body_style))
    story.append(Paragraph("&bull; Applied Artificial Intelligence and Machine Learning fundamentals through hands-on projects and practical learning modules.", bullet_style))
    story.append(Paragraph("&bull; Worked on data processing, model development workflows, and real-world AI application use cases.", bullet_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#9CA3AF'), spaceBefore=2, spaceAfter=4))

    # 6. EDUCATION
    story.append(Paragraph("EDUCATION", section_heading))
    story.append(Paragraph("<b>Bachelor of Engineering (B.E.) in Artificial Intelligence & Machine Learning</b>", bold_label_style))
    story.append(Paragraph("K N S Institute of Technology, Bengaluru", body_style))
    story.append(Paragraph("2022 &ndash; 2026 | <b>CGPA: 7.78</b>", body_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#9CA3AF'), spaceBefore=2, spaceAfter=4))

    # 7. CERTIFICATIONS
    story.append(Paragraph("CERTIFICATIONS", section_heading))
    story.append(Paragraph("&bull; Microsoft Azure Administrator", bullet_style))
    story.append(Paragraph("&bull; Develop Solutions for Microsoft Azure", bullet_style))
    story.append(Paragraph("&bull; Designing and Implementing a Microsoft Azure AI Solution", bullet_style))
    story.append(Paragraph("&bull; Artificial Intelligence Internship Certification &ndash; LearnX (Powered by Wipro)", bullet_style))

    doc.build(story)
    print(f"Reverted PDF generated successfully at: {target_pdf}")

    import shutil
    shutil.copy(target_pdf, fallback_pdf)
    print(f"Copied reverted PDF to fallback: {fallback_pdf}")

if __name__ == '__main__':
    build_pdf()
