import HTTP from '../../util/services/http';

export default {
  type: 'endCheck',
  name: 'Eind Controle',
  done: data => !!data.endDate,
  submit: (data, partial) => HTTP.endChecks[partial ? 'edit' : 'create'](data),
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
