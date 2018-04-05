import HTTP from '../../util/services/http';

export default {
  type: 'exploringCheck',
  name: 'Verkennen Controle',
  done: data => !!data.endDate,
  submit: (data, partial) =>
    new Promise((resolve, reject) =>
      HTTP.exploringCheck[partial ? 'edit' : 'create'](data)
        .then(resolve)
        .catch(reject)
    ),
  form: [
    {
      name: 'Naam',
      apiName: 'name'
    },
    {
      name: 'Uren',
      apiName: 'hours',
      type: 'number'
    },
    {
      name: 'Eind Datum',
      apiName: 'endDate',
      input: 'date'
    }
  ]
};
