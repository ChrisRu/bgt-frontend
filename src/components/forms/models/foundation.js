import HTTP from '../../util/services/http';

export default {
  type: 'foundation',
  name: 'Grondslag',
  done: data => data.startDate && data.endDate,
  submit: (data, partial) =>
    new Promise((resolve, reject) =>
      HTTP.foundation[partial ? 'edit' : 'create'](data)
        .then(resolve)
        .catch(reject)
    ),
  form: [
    {
      name: 'Meting Naam',
      apiName: 'measurementName'
    },
    {
      name: 'Meting Berekening',
      apiName: 'measurementCalculation'
    },
    {
      name: 'Begin Datum',
      apiName: 'startDate',
      input: 'date'
    },
    {
      name: 'Eind Datum',
      apiName: 'eindDatum',
      input: 'date'
    },
    {
      name: 'Uren Meten',
      apiName: 'hoursMeasuring',
      type: 'number'
    },
    {
      name: 'Uren Rekenen',
      apiName: 'hoursCalculating',
      type: 'number'
    }
  ]
};
