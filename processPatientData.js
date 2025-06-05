/*
Todo:
    Process the rest of the types.......

 'patient', 'problem-X', 'allergy-X', 'consult-X', 'vital', 'lab', 'order', 'treatment',
  'med', 'ptf', 'factor', 'immunization', 'cpt', 'education', 'pov', 'image',
  'appointment', 'surgery', 'document-X', 'visit-X'

*/

const types = [
  'patient', 'problem', 'allergy', 'consult', 'vital', 'lab-x', 'order', 'treatment',
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
                type: item.documentTypeName,
                dateTime: item.referenceDateTime,
                text: item.text
              });
              break;
            case 'lab':
              patientData.lab.push({
                type,
                type: item.TypeName,
                dateTime: item.observerd,
                specimen: item.specimen,
                result: item.result,
                units: item.units,
                displayName: item.displayName,
              });
              break;
            case 'med':
              console.log('med', item);
              patientData.med.push({
                type,
                type: item.TypeName,
                dateTime: item.observerd,
                specimen: item.specimen,
                result: item.result,
                units: item.units,
                displayName: item.displayName,
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