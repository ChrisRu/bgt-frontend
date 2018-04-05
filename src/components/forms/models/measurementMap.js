import HTTP from '../../util/services/http';

export default {
  type: 'measurementMap',
  name: 'Meetmap',
  done: data => !!data.endDate,
  submit: (data, partial) =>
    new Promise((resolve, reject) =>
      HTTP.measurementMap[partial ? 'edit' : 'create'](data)
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
      apiName: 'hours'
    },
    {
      name: 'Einddatum',
      apiName: 'endDate',
      input: 'date'
    },
    {
      name: 'Geschatte te meten',
      apiName: 'estimate',
      type: 'number'
    }
  ]
};
