import HTTP from '../../util/services/http';

export default {
  type: 'measurementCheck',
  name: 'Meting controle',
  done: data => !!data.endDate,
  submit: (data, partial) =>
    new Promise((resolve, reject) =>
      HTTP.measurementCheck[partial ? 'edit' : 'create'](data)
        .then(resolve)
        .catch(reject)
    ),
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
