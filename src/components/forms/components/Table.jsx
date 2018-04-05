import React from 'react';
import classnames from 'classnames';

import { EditIcon } from '../../util/static/icons';

const format = (value, apiName) => {
  if (value != null) {
    if (apiName.toLowerCase().includes('date')) {
      return new Date(value).toLocaleDateString();
    }

    if (apiName.toLowerCase().includes('isadmin')) {
      return value ? 'ja' : 'nee';
    }

    return value;
  }

  return '-';
};

const Table = ({ form = [], data = {}, className = '', onEdit }) => {
  return (
    <React.Fragment>
      <table className={`table ${className}`}>
        <tbody className="table__body">
          {form.filter(key => !key.hiddenInTable).map(item => (
            <tr className="table__row" key={item.apiName}>
              <td className="table__name">{item.name}:</td>
              <td
                className={classnames('table__value', {
                  'no-value': data[item.apiName] == null
                })}
              >
                {format(data[item.apiName], item.apiName)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {onEdit ? <EditIcon onClick={onEdit} /> : null}
    </React.Fragment>
  );
};

export default Table;
