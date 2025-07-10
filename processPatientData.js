const { encoding_for_model } = require("@dqbd/tiktoken");
 const enc = encoding_for_model("gpt-4o"); // or your model


/*

Here we process the patient data and categorize it into different types.
This is a simplified version that processes some of the types and returns an object with categorized data.

Todo:
    Process the rest of the types.......
    consider combining the preprocess with this step.  
 done:
 'patient-x', 'problem-X', 'allergy-X', 'consult-X', 'vital-x', 'lab-x', 'order-x', 'treatment',
  'med-x',  'factor-x', 'immunization-x', 'surgery-x', 'document-X', 'visit-X',appointment-x
not done:
  'ptf', 'cpt', 'education', 'pov', 'image', 

*/

const types = [
  'patient', 'problem', 'allergy', 'consult', 'vital', 'lab', 'order', 'treatment',
  'med', 'ptf', 'immunization', 'cpt', 'education', 'pov', 'image', 
  'document', 'visit'
];


const fm2UTC = (fileManDateTime: number): string => {
  if (!fileManDateTime) return '';

  const parts = fileManDateTime.toString().split('.');
  const baseDate = parseInt(parts[0]) + 17000000; // Adjust from FileMan epoch (year 1700)
  const timeStr = parts[1]?.padEnd(6, '0') ?? '000000';

  const year = baseDate.toString().slice(0, 4);
  const month = baseDate.toString().slice(4, 6);
  const day = baseDate.toString().slice(6, 8);
  const hours = timeStr.slice(0, 2);
  const minutes = timeStr.slice(2, 4);

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}


async function processPatientData(items) {
  const patientData = {};
  types.forEach(type => { patientData[type] = []; });

  const immunizationRaw: any[] = [];

  items.forEach(item => {
    if (item.uid) {
      const parts = item.uid.split(':');
      if (parts.length > 2) {
        const type = parts[2];
        if (types.includes(type)) {
          switch (type) {
            case 'problem':
              patientData.problem.push({
                type,
                date: item.entered,
                sctCode: item.problemText,
                status: item.statusName
              });
              break;
            case 'visit':
              patientData.visit.push({
                type,
                dateTime: item.dateTime,
                type: item.typeName,
                class: item.patientClassName,
                stay: item.stay,
                service: item.service,
                reasonName: item.reasonName,
                categotyName: item.categoryName,
              });
              break;
            case 'image':
              let diagnosisField = '';  
             if(item.diagnosis && item.diagnosis.length > 1) {
             let primaryDiagnosis = '';
             let otherDiagnoses = [];
             item.diagnosis.forEach((code) => {
               if (code.primary===true) {
                 primaryDiagnosis = code.code;
               } else {
                 otherDiagnoses.push(code.code );
               }
             });
             diagnosisField = `Primary diagnosis: ${primaryDiagnosis || 'N/A'}, Other diagnoses: ${otherDiagnoses.join(', ') || 'None'}`;
             } else {
                diagnosisField = item.diagnosis && item.diagnosis.length === 1 ? `Primary diagnosis: ${item.diagnosis[0]}` : 'No diagnosis codes available';
              }
             patientData.image.push({
               type,
               encounter: item.encounterName,
               diagnosis: diagnosisField,
             });
             break;
            case 'allergy':
              patientData.allergy.push({
                type,
                kind: item.kind,
                summary:item.summary
              });
              break;
            case 'consult':
              patientData.consult.push({
                type,
                dateTime: item.dateTime,
                service: item.service,
                reason: item.reason.replace(/\s+/g, ' ').trim(),
                status: item.statusName,
                provisionalDxCode: item.provisionalDx?.code || '',
                provisionalDxName: item.provisionalDx?.name || ''
              });
              break;
            case 'document':
              var obj={
                type,
                Title: item.nationalTitle ? item.nationalTitle.title : item.localTitle,
                role: item.nationalTitleRole? item.nationalTitleRole.role : '',
                encounter: item.encounterName,
                typeName: item.documentTypeName,
                dateTime: item.referenceDateTime,
                text: item.text[0].content.replace(/\s+/g, ' ').trim()
              };
              const roleHasNurse = obj.role && obj.role.toUpperCase().includes('NURS');
              const titleHasNurse = obj.Title && obj.Title.toUpperCase().includes('NURS');
              if (!roleHasNurse && !titleHasNurse) {
                patientData.document.push({
                  ...obj,
                  tokenSize: enc.encode(JSON.stringify(obj)).length
                });
              }
              break;
            case 'lab':
              patientData.lab.push({
                type,
                typeName: item.typeName,
                dateTime: item.observed,
                specimen: item.specimen,
                result: item.result,
                units: item.units,
                displayName: item.displayName,
              });
              break;
            case 'med':
              if(item.dosages && item.dosages.length > 1) {
                var doseInfoFirst = item.dosages[0].dose ? item.dosages[0].dose : '';
                var doseInfoLast = item.dosages[item.dosages.length - 1].dose ? item.dosages[item.dosages.length - 1].dose : '';
                var sigInfo = item.sig ? item.sig : '';
                var medName = item.name;
                if (doseInfoFirst) { medName += ' ' + doseInfoFirst; }
                if (doseInfoLast && doseInfoLast !== doseInfoFirst) { medName += ' ... ' + doseInfoLast; }
                if (sigInfo) { medName += ' ' + sigInfo; }
              }else{
              var doseInfo = item.dosages && item.dosages.length > 0 ? item.dosages[0].dose : '';
              var sigInfo = item.sig ? item.sig : ''; 
              var medName = item.name;
              if (doseInfo) { medName += ' ' + doseInfo; }
              if (sigInfo) { medName += ' ' + sigInfo; }
            }
              patientData.med.push({
                type,
                name: medName,
                overallStart: item.overallStart,
                overallStop: item.overallStop,
                status: item.vaStatus
              });
              break;
            case 'ptf': 
              patientData.ptf.push({
                type,
                admissionDateTime: item.arrivalDateTime,
                dischargeDateTime: item.dischargeDateTime,
                icdCode: item.icdCode,
                icdName: item.icdName,
                specialty: item.specialtyName,
                facility: item.facilityName
               
              });
               break;
            case 'patient':
              patientData.patient.push({
                type,
                name: item.fullName,
                dob: item.dateOfBirth,
                sex: item.genderName,
                disability: item.disability,
                veteran: item.veteran.isVet,
                serviceConnected: item.veteran.serviceConnected
              });
              break;
            case 'vital':
              patientData.vital.push({
                type,
                dateTime: item.observed,
                typeName: item.typeName,
                value: item.result,
                units: item.units,
              });
              break;
            case 'order':
              if (item.statusName === "PENDING") {
                patientData.order.push({
                  type,
                  dateTime: item.entered,
                  name: item.content,
                  status: item.statusName
                });
              }
              break;
            case 'immunization':
              immunizationRaw.push({
                ...item,
                type,
                dateTime: item.administeredDateTime,
                name: item.name
              });
              break;
            default:
              break;
          }
        }
      }
    }
  });

  // Group immunizations by name and keep only the most recent record for each
  if (immunizationRaw.length > 0) {
    const grouped: Record<string, any[]> = {};
    immunizationRaw.forEach((rec) => {
      if (!grouped[rec.name]) grouped[rec.name] = [];
      grouped[rec.name].push(rec);
    });
    const mostRecent: any[] = [];
    Object.values(grouped).forEach((records) => {
      // Sort descending by administeredDateTime
      records.sort((a, b) => b.administeredDateTime - a.administeredDateTime);
      const latest = records[0];
      mostRecent.push({
        ...latest,
        dateTime: fm2UTC(latest.administeredDateTime),
      });
    });
    patientData.immunization = mostRecent;
  }

  return patientData;
}





module.exports = { processPatientData };
