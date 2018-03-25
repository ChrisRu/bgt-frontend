import HTTP from '../../util/services/http';

export default {
  type: 'measurementCheck',
  name: 'Meting controle',
  done: data => !!data.endDate,
  submit: (data, partial) =>
    HTTP.measurementChecks[partial ? 'edit' : 'create'](data),
  form: [
    {
      name: 'Naam',
      apiName: 'name'
    },
    {
      name: 'Eind Datum',
      apiName: 'endDate',
      input: 'date'
    },
    {
      name: 'Uren',
      apiName: 'hours',
      type: 'number'
    },
    {
      name: 'Voorlopig Geleverde Punten',
      apiName: 'points',
      type: 'number'
    }
  ]
};
