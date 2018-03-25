import HTTP from '../../util/services/http';

export default {
  type: 'foundation',
  name: 'Grondslag',
  done: data => data.startDate && data.endDate,
  submit: (data, partial) =>
    HTTP.foundations[partial ? 'edit' : 'create'](data),
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
