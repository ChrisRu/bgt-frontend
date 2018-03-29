import HTTP from '../../util/services/http';

export default {
  type: 'measurement',
  name: 'Meting',
  done: data => data.startDate && data.endDate,
  submit: (data, partial) =>
    HTTP.measurement[partial ? 'edit' : 'create'](data),
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
