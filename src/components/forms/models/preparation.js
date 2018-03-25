import HTTP from '../../util/services/http';

export default {
  type: 'preparation',
  name: 'Voorbereiding',
  done: data => true || !!data.endDate,
  submit: (data, partial) =>
    HTTP.preparations[partial ? 'edit' : 'create'](data),
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
