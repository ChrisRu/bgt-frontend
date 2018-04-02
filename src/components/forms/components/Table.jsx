import React from 'react';
import classnames from 'classnames';

const format = (value, apiName) => {
  if (value) {
    if (apiName.toLowerCase().includes('date')) {
      return new Date(value).toLocaleDateString();
    }

    return value;
  }

  return '-';
};

const Table = ({ form = [], data = {}, className = '' }) => {
  return (
    <table className={`table ${className}`}>
      <tbody className="table__body">
        {form.map(item => (
          <tr className="table__row" key={item.apiName}>
            <td className="table__name">{item.name}:</td>
            <td
              className={classnames('table__value', {
                'no-value': !data[item.apiName]
              })}
            >
              {format(data[item.apiName], item.apiName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
