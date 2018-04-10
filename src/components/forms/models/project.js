import HTTP from '../../util/services/http';
import convertRdToGeo from '../../util/functions/coordinates';

export default {
  type: 'project',
  name: 'Project',
  submit: (data, partial) =>
    new Promise((resolve, reject) =>
      HTTP.projects[partial ? 'create' : 'edit'](data)
        .then(resolve)
        .catch(reject)
    ),
  remove: id =>
    new Promise((resolve, reject) =>
      HTTP.projects
        .remove(id)
        .then(resolve)
        .catch(reject)
    ),
  form: [
    {
      name: 'BGT Nummer',
      apiName: 'bgtOnNumber',
      placeholder: '123456'
    },
    {
      name: 'Locatie',
      apiName: 'location',
      placeholder: 'Spui, Den Haag',
      input: 'select',
      switch: {
        value: v => v.value,
        onChange: ({ onChange, apiName }) => async value => {
          const [latitude, longtitude] = convertRdToGeo(
            ...(await HTTP.geo.getDetails(value.key)).geometry.coordinates
          );
          onChange({
            target: {
              name: apiName,
              value: {
                latitude,
                longtitude,
                ...value
              }
            }
          });
        },
        onValueClick: ({ onChange, apiName }) => async value => {
          const [latitude, longtitude] = convertRdToGeo(
            ...(await HTTP.geo.getDetails(value.key)).geometry.coordinates
          );
          onChange({
            target: {
              name: apiName,
              value: {
                latitude,
                longtitude,
                ...value
              }
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
