import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

const tableSettings = {
  previousText: 'Vorige',
  nextText: 'Volgende',
  loadingText: 'Laden...',
  noDataText: 'Geen data gevonden',
  pageText: 'Pagina',
  ofText: 'van',
  rowsText: 'rijen',
};

class Table extends Component {
  state = {
    columns: [
      {
        Header: 'BGT Nummer',
        accessor: 'place_id',
        minWidth: 80
      },
      {
        Header: 'Adres',
        accessor: 'display_name',
        minWidth: 80
      },
      {
        Header: 'Onderweg',
        key: 'onderweg',
        minWidth: 80
      }
    ]
  };

  render() {
    const { columns } = this.state;
    const { data } = this.props;

    return (
      <ReactTable
        columns={columns}
        data={data}
        {...tableSettings}
      />
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired
};

export default Table;
