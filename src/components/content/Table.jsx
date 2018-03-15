import React, { Component } from 'react';
import ReactTable from 'react-table';

class Table extends Component {
  state = {
    tableSettings: {
      previousText: 'Vorige',
      nextText: 'Volgende',
      loadingText: 'Laden...',
      noDataText: 'Geen data gevonden',
      pageText: 'Pagina',
      ofText: 'van',
      rowsText: 'rijen',
    },
    columns: [
      {
        Header: 'BGT Nummer',
        accessor: 'bgtOnNumber',
        minWidth: 80
      },
      {
        Header: 'Categorie',
        accessor: 'category',
        minWidth: 80
      },
      {
        Header: 'Omschrijving',
        accessor: 'description',
        minWidth: 120
      },
      {
        Header: 'Status',
        accessor: 'status',
        minWidth: 120
      }
    ]
  };

  render() {
    const { columns, tableSettings } = this.state;
    const { projects } = this.props;

    console.log(projects);

    return (
      <ReactTable
        columns={columns}
        data={projects}
        {...tableSettings}
      />
    );
  }
}

export default Table;
