//list of options for the prompt in the main file. 

module.exports = {
    prompt: [`1 Please use the following template to create a primary care note according the following instructions:
(1) Use same font size with no bolding or italics. (2) Use two line breaks between different sections. (3) When talking about the patient, use “Veteran” instead of “patient”. (4) Avoid the words: “denies”, “reports”, “cooperative”. (5) Do not include any information that was not explicitly discussed in the transcript. (6) do not change the format, existing data or spacing of the template unless specifically indicated below. (7) do not delete any information that is already populated in the note within or above the HPI (including outside doctors names)  
For the HPI section, start with a one sentence summary with the patient’s age, gender and a list of their most important medical history based on the list of Problems from the template and indicate they are there for an evaluation in Primary Care.  
For example: “78 yo M PMHx of coronary artery disease, asthma, peripheral vascular disease and diabetes who is evaluated in Primary Care.”
Next, put in two line breaks and then summarize the patient’s history of present illness.  Include separate paragraphs for each different medical problem discussed.  Include all relevant reported history related to each medical problem in that paragraph, even if they are discussed nonsequentially.  If there are any relevant notes that pertain to these problems listed within the template, please include these in the relevant paragraph.
For each problem include (if discussed) duration; severity; what makes it better or worse; any medications or treatment for this and if any evaluation has been completed.
The next section is review of symptoms (ROS)
If any review of symptoms are positive; make this change in the ROS section; including indicating “yes” in the check box and using a short phrase to specify the issue.  If the symptoms are extensive and involve a discussion; include this in the HPI and please write “as per HPI”
The next section is Social History. If social history is discussed (tobacco use; alcohol use; drug use; housing; who lives with the Veteran; military history; occupational history; important relationships; hobbies, religion or exercise), include that section in the appropriate area.  If this is not discussed; keep the current text from the template in this section.  Update any changes with relation to housing, tobacco use, etc.
If FAMILY MEDICAL HISTORY is discussed, include that section right after the HPI section. 

The next section is medications and allergies.  Please do not make any changes to this templated section.
In the EXAM section, leave the vitals signs listed as is.  If a different blood pressure or heart rate is noted during the exam; please include this with a dash next to the number listed in the template and a note “on recheck”.  
Include any noted physical exam findings in the appropriate area of exam using medical terminology (Gen= general exam; COR= heart; RESP=lung; Abd=abdominal exam; Ext=extremity exam).  If any skin findings are noted make an additional row “Skin” to document the findings and if any head and neck findings are noted please make an additional row below “GEN” called “HEENT” and document those findings next to that.  If nothing is noted; please use the templated normal exam in that section.
In the Lab/Test data: please place one line break, then indicate any abnormal tests that were reviewed with the patient, including bloodwork discussed and indicate “reviewed with patient” if no abnormalities were noted.  Include any xrays, CT scans, EKGs or other diagnostic studies results discussed in this section.
In the “ASSESSMENT/PLAN:” section, group clinical problems in descending order of importance. For each clinical problem, use a sequential number to denote the problem, followed by dashes on each new line to indicate plans for this problem. Problems should be listed in short phrases rather than full sentences.  Problems should be a medical term for which an ICD-10 code is available, if possible, but do not list the ICD-10 code. This section is intended for clinicians, so should use medical terminology.  Please use the active problem list provided when possible rather than indicating a new problem and list any medications, tests, or plans under each appropriate problem.  If the problem is not listed in the existing template, list it at the beginning; please re-order the problem list listing those items discussed most extensively first.  Do not delete any problems or text from this section.
Example: Problem in the ASSESSMENT/PLAN:
“1.Hypertension: 
-blood pressure at goal on current medication regimen. Goal SBP < 140.
-Continue lisinopril and amlodipine at current dosing

For the Health Maintenance section, update with the current date any vaccines that were given to indicate the current date, also update any colonoscopy, mammogram, pap smear or HPV screening, advanced directive, AAA screening or other screening if mentioned in the transcript.  If not mentioned, keep the current text in this area. 
Include at the bottom of the note this sentence: “The patient was informed of the presence of a listening and transcribing tool during the visit and given the option to opt out and agreed to proceed.”
This is the template:

`,
`2 As a primary care internist, I need a concise summary of a patient's progress notes from various visits. Please provide a 2- summary focusing only on pertinent updates that would be most relevant for me to know. At the beginning of the summary, mention the dates that the summary is summarizing in the format mm/yyyy to mm/yyyy. This includes notable changes in the patient's condition, any new diagnoses, updates on ongoing treatments, significant test results, and any modifications to medications or care plans. Exclude any repetitive information or minor details that are not essential for understanding the patient's primary health updates. After the summary, provide a bulleted list first of key medications the patient is on, then key diagnoses, then summarize vital signs trends, then any referrals/consultants they see (speciality and name of consultant), then provide a separate list of important lab results, then provide a separate list of key diagnostic test results. Here are the notes:paragraph "  
`,
`3 Can you please summarize the basic demographic information about the patient?  Include name, age sex and any other relevant information that would be helpful to know about the patient.  Please do not include any information that is not explicitly discussed in the transcript.  Here is the transcript: "`
,
`4 You are a clinical documentation assistant. Given structured or semi-structured patient data, generate a problem-specific summary focusing on a single medical problem. Your output should include the following components, organized clearly and concisely:
Problem Name: State the specific medical problem (e.g., Type 2 Diabetes Mellitus, Acute Kidney Injury).
Onset and Course: Describe when the problem began or was first identified, and summarize its clinical course (e.g., acute, chronic, relapsing). Include relevant contextual history or events contributing to the onset or exacerbation.
Relevant Labs and Tests: Identify and summarize lab results, imaging, pathology, or other diagnostics directly related to the problem. Include dates, trends, and interpretation where possible.
Medication History: Provide a targeted summary of medications used for the problem, including past and current therapies, dosage changes, and treatment response.
Missing or Absent Data: Clearly note any relevant diagnostics or procedures that would be expected for this condition but are not found in the available data (e.g., “No recent A1c noted,” “No echocardiogram on record,” “No colonoscopy found for CRC screening”).
Guidelines:
Use clinical reasoning to assess relevance.
Include only data pertinent to the identified problem.
Use structured medical language appropriate for clinician readers.
Be concise, evidence-focused, and exclude unrelated information.
Do not include personal identifiers or sensitive information.
Example Input Format:
Problem: Chronic Kidney Disease  
Patient Data: [structured EHR notes, labs, medication list, radiology reports, procedural history, etc.]
Example Output:
**Problem:** Chronic Kidney Disease (CKD), Stage 3b
 
**Onset and Course:**  
CKD first noted in 2021 with a gradually declining eGFR trend. No documented etiology but patient has long-standing hypertension and Type 2 diabetes. Most recent eGFR (March 2025) was 38 mL/min/1.73m².
 
**Relevant Labs and Tests:**  
- Serum Creatinine: 1.9 mg/dL (March 2025)  
- eGFR: 38 → 42 → 46 mL/min/1.73m² over past 18 months  
- Urine ACR: 180 mg/g (December 2024), consistent with albuminuria  
- Electrolytes: stable, with mild hyperkalemia noted intermittently
 
**Medication History:**  
- Lisinopril 20 mg daily since 2022  
- Metformin discontinued in 2023 due to reduced renal function  
- No SGLT2 inhibitors prescribed
 
**Missing or Absent Data:**  
- No renal ultrasound found in records  
- No nephrology consultation documented  
- No recent parathyroid hormone (PTH) or vitamin D levels`,
`5 Prompt:
You are a clinical documentation assistant. Given structured or semi-structured patient data, generate a medical problem-specific summary. Focus exclusively on one clinical problem (e.g., CKD, CHF, COPD). Your output should be organized and clinically relevant, including the following clearly labeled sections:
1. Problem Name
State the specific medical diagnosis or problem (e.g., Chronic Kidney Disease Stage 3, Heart Failure with Reduced Ejection Fraction).
2. Onset and Course
Describe the onset (include approximate or exact date if available), clinical progression (e.g., stable, worsening, relapsing), and any key triggering events or hospitalizations.
3. Relevant Labs and Tests
Recurrent Labs Table
Show trends in repeated labs over time using a table.
Example Format:
| Date         | eGFR (mL/min)            | Creatinine (mg/dL)       |
| Jan 15, 2025 | 35                       | 2.1                      | 
| Mar 01, 2025 | 39                       | 1.9                      | 

One-Time Tests and Imaging
Summarize any single-time relevant tests or imaging (e.g., echocardiogram, MRI) with:
Date
Findings
Clinical interpretation
4. Medication History
List medications used specifically for this condition. Include:
Name
Dose
Start and stop dates if known
Reasons for any changes (e.g., intolerance, improved control, contraindication)
5. Relevant Consults
Include any specialty consultations related to this problem, with:
Date of consult
Specialty
Key findings or recommendations
Example:
Cardiology – Apr 15, 2025: Recommended increasing beta blocker dose; advised repeat echocardiogram in 6 months.
6. Recent Red Flag Findings
Identify any acute or serious findings within the last 30–90 days that could indicate decompensation or need for urgent care or hospitalization. Include:
Abnormal vital signs
Dangerous lab results (e.g., rising potassium, high BNP)
Concerning symptoms (e.g., syncope, chest pain, worsening dyspnea)
Recent ED visits or hospitalizations related to the problem
If no red flag findings are present, clearly note:
“No recent red flag findings identified related to this problem.”
7. Missing or Absent Data
List diagnostic tests, labs, procedures, or consults that are typically indicated for this condition but not found in the available records.
Example:
No urine ACR available
No nephrology follow-up after 2023 referral
No echocardiogram within the past 12 months
Formatting Guidelines:
Use clear, clinically appropriate language.
Include only data relevant to the specified problem.
Format dates as MMM DD, YYYY (e.g., Jun 01, 2025).
Use tables and bullet points for clarity.`,
`6 You are a healthcare data analyst. Given a dataset containing primary care notes for multiple patients, your task is to analyze and quantify redundant information within the clinical notes for each patient. The objective is to identify repetitive content and determine how redundancy affects the overall efficiency and token limits of the data.

Your analysis should include the following steps:

1. **Data Preprocessing**:
   - Extract primary care notes for each patient.
   - Organize the notes chronologically for each patient.

2. **Redundancy Analysis**:
   - Identify and quantify repetitive phrases, sentences, or sections within the notes of each patient.
   - Compare the content of each note to the previous ones to find overlaps and repeated information.
   - Calculate the percentage of redundant information for each patient's notes.

3. **Quantitative Summary**:
   - Provide a statistical summary of redundancy for all patients, including mean, median, and range of redundancy percentages.
   - Highlight any patterns or commonalities in redundancy across different patients.

4. **Impact on Efficiency**:
   - Analyze the impact of redundancy on token limits and efficiency of the notes.
   - Provide insights on how reducing redundancy could improve the efficiency of clinical documentation.

5. **Recommendations**:
   - Suggest methods to minimize redundancy without compromising the quality and completeness of clinical information.
   - Recommend best practices for creating concise yet comprehensive clinical notes.

   6. **Formatting Guidelines**:
   - Use clear, structured language.
   - Do not include PHI or PII in the output or patient names.
**Example Input**:
Patient Data: 
Patient 1:
- Note 1: [Detailed primary care note text]
- Note 2: [Detailed primary care note text]
- ...
Patient 2:
- Note 1: [Detailed primary care note text]
- Note 2: [Detailed primary care note text]
- ...
...

**Example Output**:
**Patient 1**:
- Redundant Information Percentage: 35%
- Repetitive Content Identified: ["patient presents with...", "no new symptoms since..."]
  
**Patient 2**:
- Redundant Information Percentage: 28%
- Repetitive Content Identified: ["follow-up visit for...", "no changes in medication"]

**Overall Summary**:
- Mean Redundant Information Percentage: 31.5%
- Median Redundant Information Percentage: 30%
- Range of Redundant Information: 20% - 45%

**Impact on Efficiency**:
- Average token limit reduction: 20%
- Efficiency Improvement: Recommending template-based notes with dynamic sections.

**Recommendations**:
1. Implement a template-based documentation approach.
2. Utilize bullet points for commonly repeated information.
3. Regularly train clinicians on best practices to avoid unnecessary repetition.

Formatting Guidelines:
- Use clear, structured language.
- Create tables and lists for repetitive content and statistical summaries.
- Format dates as MMM DD, YYYY (e.g., Jun 01, 2025).

do not include any PII or PHI in the output.`,
`Using the provided physician data, extract all relevant details and organize them into a structured table format. Follow these steps: Step 1. Extract all relevant details from the text,
 ensuring no critical information is omitted. Maintain the granularity of the data. Step 2. If any information is missing or unclear, note it in the relevant column as "Not specified" or
  N/A. Step 3. Avoid adding comments or explanations in the output. Only include the extracted data explicitly stated in the provided text. Step 4. Organize the extracted data into a 
  structured table format with the following columns: \n-  Note Title: The title of the note or report.\n-  Date: The date when the note or report was created.\n-  Author: The name or identifier of the author or electronic signature. \n-  Type: The type of note (e.g., progress note, admin note, consult, emergency room fax, etc.). \n-  Content Summary: A summary of the content, focusing on key treatments given, patient progress, and relevant findings. \n-  Conditions/Diagnoses: [Extract onset, location, duration, previous episodes, progress, and current status.] \n-  Symptoms/Issues: [Extract new or ongoing symptoms, severity, associated factors, and environmental or predisposing factors.] \n-  Treatments Administered:  [Extract detailed information on any treatments, medications, or procedures administered to the patient.] \n-  Past Medical History: [Extract medical conditions, problems, and diagnoses (dates of onset or updates, if available)] \n- Past Surgical History: [Extract surgeries and dates, including invasive procedures like EGD and colonoscopy.] \n-  Family History: [Extract Father\'s health history.] [Extract Mother\'s health history.] [Extract Siblings\' health history.] [Extract Children\'s health history.] \n-  Social History:  [Extract marital status.] [Extract number of children.] [Extract occupation.][Extract branch of service.] [Extract smoking status.][Extract alcohol use.] [Extract drug use.][Extract family and social support.][Extract any recent changes affecting care.] \n-  Allergies: [Extract allergies and reactions if known.] \n-  Medications: [Extract medications, doses, and frequency, prioritizing the most recent list and changes.] \n-  Review of Systems: [Extract significant or abnormal symptoms.] \n-  Physical Exam: [Extract significant or abnormal findings.] \n-  Lab and Test Results: [Summarize  lab and test results mentioned, including dates and key findings.] \n-  Plan: [Summary of Net Actions for the Plan] \n-  Complications/Workups: .[Extract complications since the last visit, medical, functional status changes, or psychological impact.] \n-  Future Recommendations: [Extract tests, referrals, or scheduled follow-ups. If a future time is recommended, please provide a date estimate.] \n  Healthcare Maintenance: [Extract healthcare maintenance tasks.] \n\nStep 5. 
  Generate the output in CSV format, ensuring it is concise and free of additional comments or explanations.`,
  `You are a clinical documentation assistant. Given structured or semi-structured patient data, generate a problem-specific summary focusing on the most relevant problems for the patients current conditition. Your output should include the following components, organized clearly and concisely:
Problem Name: State the specific medical problem (e.g., Type 2 Diabetes Mellitus, Acute Kidney Injury).
Onset and Course: Describe when the problem began or was first identified, and summarize its clinical course (e.g., acute, chronic, relapsing). Include relevant contextual history or events contributing to the onset or exacerbation.
Relevant Labs and Tests: Identify and summarize lab results, imaging, pathology, or other diagnostics directly related to the problem. Include dates, trends, and interpretation where possible.
Medication History: Provide a targeted summary of medications used for the problem, including past and current therapies, dosage changes, and treatment response.
Missing or Absent Data: Clearly note any relevant diagnostics or procedures that would be expected for this condition but are not found in the available data (e.g., “No recent A1c noted,” “No echocardiogram on record,” “No colonoscopy found for CRC screening”).
Guidelines:
Use clinical reasoning to assess relevance.
Include only data pertinent to the identified problem.
Use structured medical language appropriate for clinician readers.
Be concise, evidence-focused, and exclude unrelated information.
Do not include personal identifiers or sensitive information.
Example Input Format:
Problem: Chronic Kidney Disease  
Patient Data: [structured EHR notes, labs, medication list, radiology reports, procedural history, etc.]
Example Output:
**Problem:** Chronic Kidney Disease (CKD), Stage 3b
 
**Onset and Course:**  
CKD first noted in 2021 with a gradually declining eGFR trend. No documented etiology but patient has long-standing hypertension and Type 2 diabetes. Most recent eGFR (March 2025) was 38 mL/min/1.73m².
 
**Relevant Labs and Tests:**  
- Serum Creatinine: 1.9 mg/dL (March 2025)  
- eGFR: 38 → 42 → 46 mL/min/1.73m² over past 18 months  
- Urine ACR: 180 mg/g (December 2024), consistent with albuminuria  
- Electrolytes: stable, with mild hyperkalemia noted intermittently
 
**Medication History:**  
- Lisinopril 20 mg daily since 2022  
- Metformin discontinued in 2023 due to reduced renal function  
- No SGLT2 inhibitors prescribed
 
**Missing or Absent Data:**  
- No renal ultrasound found in records  
- No nephrology consultation documented  
- No recent parathyroid hormone (PTH) or vitamin D levels`,
`7 Prompt:
You are a clinical documentation assistant. Given structured or semi-structured patient data, generate a medical problem-specific summary. Focus exclusively on one clinical problem (e.g., CKD, CHF, COPD). Your output should be organized and clinically relevant, including the following clearly labeled sections:
1. Problem Name
State the specific medical diagnosis or problem (e.g., Chronic Kidney Disease Stage 3, Heart Failure with Reduced Ejection Fraction).
2. Onset and Course
Describe the onset (include approximate or exact date if available), clinical progression (e.g., stable, worsening, relapsing), and any key triggering events or hospitalizations.
3. Relevant Labs and Tests
Recurrent Labs Table
Show trends in repeated labs over time using a table.
Example Format:
| Date         | eGFR (mL/min)            | Creatinine (mg/dL)       |
| Jan 15, 2025 | 35                       | 2.1                      | 
| Mar 01, 2025 | 39                       | 1.9                      | 

One-Time Tests and Imaging
Summarize any single-time relevant tests or imaging (e.g., echocardiogram, MRI) with:
Date
Findings
Clinical interpretation
4. Medication History
List medications used specifically for this condition. Include:
Name
Dose
Start and stop dates if known
Reasons for any changes (e.g., intolerance, improved control, contraindication)
5. Relevant Consults
Include any specialty consultations related to this problem, with:
Date of consult
Specialty
Key findings or recommendations
Example:
Cardiology – Apr 15, 2025: Recommended increasing beta blocker dose; advised repeat echocardiogram in 6 months.
6. Recent Red Flag Findings
Identify any acute or serious findings within the last 30–90 days that could indicate decompensation or need for urgent care or hospitalization. Include:
Abnormal vital signs
Dangerous lab results (e.g., rising potassium, high BNP)
Concerning symptoms (e.g., syncope, chest pain, worsening dyspnea)
Recent ED visits or hospitalizations related to the problem
If no red flag findings are present, clearly note:
“No recent red flag findings identified related to this problem.”
7. Missing or Absent Data
List diagnostic tests, labs, procedures, or consults that are typically indicated for this condition but not found in the available records.
Example:
No urine ACR available
No nephrology follow-up after 2023 referral
No echocardiogram within the past 12 months
Formatting Guidelines:
Use clear, clinically appropriate language.
Include only data relevant to the specified problem.
Format dates as MMM DD, YYYY (e.g., Jun 01, 2025).
Use tables and bullet points for clarity.`,

`9 I am working on identifying efficiencies can you just provide a list of note titles,the profession of the author, and if it is inpattient admission, inpatient discharge, inpatient or outpatient. Then exclude all nursing notes Please do not include any other information or comments in csv format.  Here is the data:`


]

}