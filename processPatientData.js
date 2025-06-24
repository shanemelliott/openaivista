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
  'med', 'ptf', 'factor', 'immunization', 'cpt', 'education', 'pov', 'image',
  'appointment', 'surgery', 'document', 'visit'
];

async function processPatientData(items) {
  const patientData = {};
  types.forEach(type => { patientData[type] = []; });

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
              patientData.document.push({
                ...obj,
                tokenSize: enc.encode(JSON.stringify(obj)).length
              });
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
              patientData.order.push({
                type,
                dateTime: item.entered,
                name: item.content,
                status: item.statusName
              });
              break;
            case 'factor':
              patientData.factor.push({
                type,
                dateTime: item.entered,
                name: item.name,
                category: item.categoryName
              });
              break;
            case 'immunization':
              patientData.immunization.push({
                type,
                dateTime: item.administeredDateTime,
                name: item.name
              });
              break;
            case 'surgery':
              patientData.surgery.push({
                type,
                dateTime: item.dateTime,
                typeName: item.TypeName,
                kind: item.kind
              });
              break;
            case 'appointment':
              patientData.appointment.push({
                type,
                dateTime: item.dateTime,
                typeName: item.categoryName,
                status: item.appointmentStatus,
                careType: item.stopCodeName
              });
              break;
            default:
              break;
          }
        }
      }
    }
  });

  return patientData;
}

module.exports = { processPatientData };