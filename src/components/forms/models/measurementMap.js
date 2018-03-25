import HTTP from '../../util/services/http';

export default {
  type: 'measurementMap',
  name: 'Meetmap',
  done: data => !!data.endDate,
  submit: (data, partial) =>
    HTTP.measurementMaps[partial ? 'edit' : 'create'](data),
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
