import React from 'react';
import classnames from 'classnames';

const Table = ({ form, data, className = '' }) => {
  return (
    <table className={`table ${className}`}>
      <tbody className="table__body">
        {(form || []).map(item => {
          const value = (data || {})[item.apiName];

          return (
            <tr className="table__row" key={item.apiName}>
              <td className="table__name">{item.name}:</td>
              <td
                className={classnames('table__value', { 'no-value': !value })}
              >
                {value || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
