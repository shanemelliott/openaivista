/*
Todo:
    Process the rest of the types.......
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

function processPatientData(items) {
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
                icdCode: item.icdCode,
                description: item.summary
              });
              break;
            case 'visit':
              patientData.visit.push({
                type,
                type: item.typeName,
                class: item.patientClassName,
                stay: item.stay,
                service: item.service,
                providers: item.providers
              });
              break;
            case 'allergy':
              patientData.allergy.push({
                type,
                substance: item.kind,
                reaction: item.reaction,
                observed: item.products
              });
              break;
            case 'consult':
              patientData.consult.push({
                type,
                dateTime: item.dateTime,
                service: item.service,
                reason: item.reason,
                status: item.statusName,
                provisionalDx: item.provisionalDx
              });
              break;
            case 'document':
              patientData.document.push({
                type,
                typeName: item.documentTypeName,
                dateTime: item.referenceDateTime,
                text: item.text
              });
              break;
            case 'lab':
              patientData.lab.push({
                type,
                typeName: item.TypeName,
                dateTime: item.observerd,
                specimen: item.specimen,
                result: item.result,
                units: item.units,
                displayName: item.displayName,
              });
              break;
            case 'med':
              patientData.med.push({
                type,
                typeName: item.TypeName,
                dateTime: item.observerd,
                specimen: item.specimen,
                result: item.result,
                units: item.units,
                displayName: item.displayName,
              });
              break;
            case 'patient':
              patientData.patient.push({
                type,
                name: item.fullName,
                gender: item.genderName,
                disability: item.disability,
                veteran: item.veteran
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
            // ...repeat for each type as needed...
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