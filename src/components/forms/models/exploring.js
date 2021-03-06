import HTTP from '../../util/services/http';

export default {
  type: 'exploring',
  name: 'Verkennen',
  done: data => !!data.endDate,
  submit: (data, partial) =>
    new Promise((resolve, reject) =>
      HTTP.exploring[partial ? 'edit' : 'create'](data)
        .then(resolve)
        .catch(reject)
    ),
  form: [
    {
      name: 'M2',
      apiName: 'm2',
      type: 'number'
    },
    {
      name: 'Naam',
      apiName: 'Naam'
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
    },
    {
      name: 'Eind Datum Opgeleverd',
      apiName: 'endDateDelivered',
      input: 'date'
    },
    {
      name: 'Opmerkingen',
      apiName: 'remarks',
      input: 'textarea'
    }
  ]
};
