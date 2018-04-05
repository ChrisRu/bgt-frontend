import HTTP from '../../util/services/http';

export default {
  type: 'endCheck',
  name: 'Eind Controle',
  done: data => !!data.endDate,
  submit: (data, partial) =>
    new Promise((resolve, reject) =>
      HTTP.endCheck[partial ? 'edit' : 'create'](data)
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
      name: 'Einddatum',
      apiName: 'endDate',
      input: 'date'
    }
  ]
};
