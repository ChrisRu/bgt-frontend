import HTTP from '../../util/services/http';

export default {
  type: 'stereokarteren',
  name: 'Stereokarteren',
  done: data => data.startDate && data.endDate,
  submit: (data, partial) =>
    HTTP.stereokarteren[partial ? 'edit' : 'create'](data),
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
      name: 'Punten',
      apiName: 'points',
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
