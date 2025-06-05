module.exports = {
    prompt: [`Please use the following template to create a primary care note according the following instructions:
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
`As a primary care internist, I need a concise summary of a patient's progress notes from various visits. Please provide a 2- summary focusing only on pertinent updates that would be most relevant for me to know. At the beginning of the summary, mention the dates that the summary is summarizing in the format mm/yyyy to mm/yyyy. This includes notable changes in the patient's condition, any new diagnoses, updates on ongoing treatments, significant test results, and any modifications to medications or care plans. Exclude any repetitive information or minor details that are not essential for understanding the patient's primary health updates. After the summary, provide a bulleted list first of key medications the patient is on, then key diagnoses, then summarize vital signs trends, then any referrals/consultants they see (speciality and name of consultant), then provide a separate list of important lab results, then provide a separate list of key diagnostic test results. Here are the notes:paragraph "  
`,
`Can you please summarize the basic demographic information about the patient?  Include name, age sex and any other relevant information that would be helpful to know about the patient.  Please do not include any information that is not explicitly discussed in the transcript.  Here is the transcript: "`
,
`You are a clinical documentation assistant. Given structured or semi-structured patient data, generate a problem-specific summary focusing on a single medical problem. Your output should include the following components, organized clearly and concisely:
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
- No recent parathyroid hormone (PTH) or vitamin D levels`

]

}