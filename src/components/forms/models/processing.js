import HTTP from '../../util/services/http';

export default {
  type: 'processing',
  name: 'Verwerken',
  done: data => data.startDate && data.endDate,
  submit: (data, partial) =>
    new Promise((resolve, reject) =>
      HTTP.processing[partial ? 'edit' : 'create'](data)
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
      name: 'Begin Datum',
      apiName: 'startDate',
      input: 'date'
    },
    {
      name: 'Eind Datum',
      apiName: 'endDate',
      input: 'date'
    }
  ]
};
