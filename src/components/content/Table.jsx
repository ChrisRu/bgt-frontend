import React, { Component } from 'react';
import ReactTable from 'react-table';
import MapPopup from './MapPopup';

class Table extends Component {
  state = {
    tableSettings: {
      previousText: 'Vorige',
      nextText: 'Volgende',
      loadingText: 'Laden...',
      noDataText: 'Geen data gevonden',
      pageText: 'Pagina',
      ofText: 'van',
      rowsText: 'rijen'
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
        Header: 'Beschrijving',
        accessor: 'description',
        minWidth: 120
      },
      {
        Header: 'Status',
        accessor: 'status',
        minWidth: 120
      }
    ],
    open: null
  };

  render() {
    const { columns, tableSettings, open } = this.state;
    const { projects } = this.props;

    return (
      <React.Fragment>
        <ReactTable
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: () =>
              this.setState({ open: rowInfo ? rowInfo.original : null })
          })}
          columns={columns}
          data={projects}
          {...tableSettings}
        />
        <MapPopup
          visible={open}
          onClose={() => this.setState({ open: null })}
          {...open}
        />
      </React.Fragment>
    );
  }
}

export default Table;
