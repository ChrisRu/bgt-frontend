import HTTP from '../../util/services/http';

export default {
  type: 'preparation',
  name: 'Voorbereiding',
  done: data => !!data.endDate,
  submit: (data, partial) =>
    HTTP.preparation[partial ? 'edit' : 'create'](data),
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
