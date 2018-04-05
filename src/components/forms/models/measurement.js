import HTTP from '../../util/services/http';

export default {
  type: 'measurement',
  name: 'Meting',
  done: data => data.startDate && data.endDate,
  submit: (data, partial) =>
    new Promise((resolve, reject) =>
      HTTP.measurement[partial ? 'edit' : 'create'](data)
        .then(resolve)
        .catch(reject)
    ),
  form: [
    {
      name: 'Bedrijf',
      apiName: 'company'
    },
    {
      name: 'Opleverings Datum',
      apiName: 'deliveryDate',
      input: 'date'
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
