import HTTP from '../../util/services/http';

export default {
  type: 'project',
  name: 'Project',
  submit: (data, partial) => HTTP.projects[partial ? 'edit' : 'create'](data),
  form: [
    {
      name: 'BGT Nummer',
      apiName: 'bgtOnNumber',
      placeholder: '123456'
    },
    {
      name: 'Locatie',
      apiName: 'location',
      placeholder: 'Duindorp, Den Haag',
      input: 'select',
      switch: {
        value: v => v.value,
        onChange: ({ onChange, apiName }) => value => {
          onChange({
            target: {
              name: apiName,
              value
            }
          });
        },
        onValueClick: ({ onChange, apiName }) => value => {
          onChange({
            target: {
              name: apiName,
              value
            }
          });
        },
        valueKey: 'value',
        labelKey: 'value',
        loadOptions: input =>
          HTTP.geo.code(input).then(options => ({ options }))
      }
    },
    {
      name: 'Status',
      apiName: 'status',
      placeholder: 'BAG',
      input: 'select',
      switch: {
        value: ({ value }) => ({ value }),
        valueKey: 'value',
        labelKey: 'value',
        options: [
          'Te Archiveren',
          'Te Verwerken',
          'Verwerkt',
          'Gestart',
          'Bij Meetburo',
          'Meetmap ok'
        ],
        onChange: ({ onChange, apiName }) => e => {
          onChange({
            target: {
              name: apiName,
              value: e ? e.value : ''
            }
          });
        },
        onValueClick: ({ onChange, apiName }) => e => {
          onChange({
            target: {
              name: apiName,
              value: e ? e.value : ''
            }
          });
        }
      }
    },
    {
      name: 'Beschrijving',
      apiName: 'description',
      placeholder: 'Meet project in Den Haag',
      input: 'textarea',
      value: ({ value }) => ({ value })
    },
    {
      name: 'Categorie',
      apiName: 'category',
      placeholder: 'nieuwbouw',
      input: 'select',
      switch: {
        value: ({ value }) => ({ value }),
        valueKey: 'value',
        labelKey: 'value',
        options: [
          'BAG',
          'Nieuwbouw',
          'Aanbouw',
          'Wijkmap',
          'Profiel',
          'Openbare ruimte'
        ],
        onChange: ({ onChange, apiName }) => e => {
          onChange({
            target: {
              name: apiName,
              value: e ? e.value : ''
            }
          });
        },
        onValueClick: ({ onChange, apiName }) => e => {
          onChange({
            target: {
              name: apiName,
              value: e ? e.value : ''
            }
          });
        }
      }
    }
  ]
};
