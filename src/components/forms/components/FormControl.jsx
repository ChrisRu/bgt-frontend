import React from 'react';
import throttle from 'lodash/throttle';
import SelectAsync from 'react-select/lib/Async';
import Select from 'react-select/lib/Select';
import DayPickerInput from 'react-day-picker/lib/src/DayPickerInput';

const FormInput = props => {
  const {
    input = 'input',
    type = 'text',
    placeholder = '',
    value = ({ value }) => ({ value }),
    apiName,
    onChange
  } = props;

  switch (input) {
    case 'input':
      return (
        <input
          value={value}
          onChange={onChange}
          id={apiName}
          name={apiName}
          placeholder={placeholder}
          type={type}
          className="input"
        />
      );
    case 'textarea':
      return (
        <textarea
          value={value}
          onChange={onChange}
          id={apiName}
          rows={5}
          name={apiName}
          placeholder={placeholder}
          type={type}
          className="input"
        />
      );
    case 'date':
      return (
        <DayPickerInput
          value={value}
          onChange={onChange}
          id={apiName}
          name={apiName}
          placeholder={placeholder}
          className="input"
        />
      );
    case 'select': {
      if (props.switch.loadOptions) {
        const {
          loadOptions,
          labelKey,
          valueKey,
          value,
          onValueClick
        } = props.switch;

        return (
          <SelectAsync
            multi={false}
            backspaceRemoves={false}
            placeholder="Zoek..."
            searchPromptText="Typ om te zoeken"
            backspaceToRemoveMessage="Druk op backspace om {last label} te verwijderen"
            clearAllText="Verwijder alle inhoud"
            clearValueText="Verwijder inhoud"
            noResultsText="Geen resultaten"
            loadingPlaceholder="Locaties ophalen..."
            loadOptions={throttle(loadOptions, 800)}
            labelKey={labelKey}
            valueKey={valueKey}
            value={value(props)}
            onChange={props.switch.onChange(props)}
            onValueClick={onValueClick(props)}
          />
        );
      } else {
        const {
          options,
          value,
          valueKey,
          labelKey,
          onValueClick
        } = props.switch;

        return (
          <Select
            multi={false}
            backspaceRemoves={false}
            placeholder="Zoek..."
            backspaceToRemoveMessage="Druk op backspace om {last label} te verwijderen"
            clearAllText="Verwijder alle inhoud"
            clearValueText="Verwijder inhoud"
            noResultsText="Geen resultaten"
            value={value(props)}
            valueKey={valueKey}
            labelKey={labelKey}
            options={options.map(option => ({ value: option, label: option }))}
            onChange={props.switch.onChange(props)}
            onValueClick={onValueClick(props)}
          />
        );
      }
    }
    default:
      return null;
  }
};

const FormControl = props => (
  <div className="form__item">
    <label className="label" htmlFor={props.apiName}>
      {props.name}
    </label>
    <FormInput {...props} />
  </div>
);

export default FormControl;
