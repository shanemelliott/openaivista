# VA OpenAI Demo

This repository contains a demo for using OpenAI's API to analyze VistA EMR data. It also uses [vista-api-x](https://github.com/department-of-veterans-affairs/octo-vista-api-x) to fetch data from a VistA using the [VPR GET PATIENT DATA JSON](https://vivian.worldvista.org/vivian-data/8994/8994-3243.html).

The goal of this demo is to demonstrate how to use OpenAI's API to analyze patient data and generate summaries.

You can view an example of analysis results in the [output.txt](./output.txt) file.


# Notes

- My discovery identified:
  - Veterans have ~1.2M to 2M tokens if you pull their entire VistA record.
  - With this limitation, the best I can get is about 6 months of data for a patient.
  - If there is an admission in that time period, I can get about 3 months of data.
  - I started some pre-processing to reduce the number of tokens by pasing each type of data seperatly to the LLM. The types of data returned from the VistA API are:
    - patient
    - problem
    - allergy
    - consult
    - vital
    - lab
    - order
    - treatment
    - med
    - ptf 
    - factor
    - immunization
    - cpt *
    - education *
    - pov *
    - image *
    - appointment
    - surgery
    - document
    - visit
  - The items listed above with an '*' have not been included in the pre-processing yet.
  - I also explored converting to pdf and processing with Contoso, but the 400 page pdf froze the web interface while trying to create images from the pdf. 
  - Plans for the future:
    - Add the remaining items to the pre-processing.
    - Explore a python version and including pre-processing locally with something like scispaCy,medspacy, or similar.
    - As this is a POC, other features are left out like patient selection, prompt selection,dateselection etc. This all is done manually in the code.
  - 6.24.25: Update, I can now process an entire medical record ~10 mb in size. I had to break the data into smaller chunks and process each chunk individually. I also had to add some logic to ensure that the chunks did not exceed the token limit. This process takes a total of 10 minutes to process a 10 mb record. The results are then combined into a single summary. An updated output file is included in the repo. 