import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from '../../components/inputText';
import { FETCH_SAMPLE_DATA } from '../../redux/request/request.constants';
import {
  sendRequestLatest,
  debounceRequest,
} from '../../redux/request/request.action';
import { selectRequestObject } from '../../redux/request/request.selector';

const ROWS = 2;

type Props = {
  totalRecords: number,
  sendRequestLatest: Function,
  debounceRequest: Function,
  cars: Object[],
  carsRequest: Object,
};

type State = {
  query: Object,
  sortOrder: number,
  sortField: string,
  columnFilters: Object,
  pageLinkSize: number,
  first: number,
};

const columnFilters = {
  vin: '',
  year: '',
  brand: '',
  color: '',
  test: '',
};

class Demo extends PureComponent<Props, State> {
  constructor() {
    super();
    this.state = {
      query: {},
      sortField: '',
      sortOrder: 1,
      pageLinkSize: 10,
      first: 5,
      columnFilters: {
        ...columnFilters,
      },
    };
  }

  componentDidMount() {
    this.props.sendRequestLatest(FETCH_SAMPLE_DATA, '', {
      _page: 0,
      _limit: ROWS,
    });
  }

  onFilterChange = (id: string, text: string) => {
    this.setState(
      state => {
        if (!text) {
          const { q: _, ...query } = state.query;

          return {
            query,
          };
        }
        return {
          query: {
            ...state.query,
            q: text,
          },
        };
      },
      () => {
        this.props.debounceRequest(FETCH_SAMPLE_DATA, '', this.state.query);
      },
    );
  };

  onColumnFilter = (id: string, text: string) => {
    const filterKey = `${id}_like`;

    const newQuery = Object.keys(this.state.query)
      .filter(key => key.indexOf('_like') === -1)
      .reduce(
        (accumulator, currentKey) => ({
          ...accumulator,
          [currentKey]: this.state.query[currentKey],
        }),
        {},
      );

    this.setState(
      () => {
        if (!text) {
          const { [filterKey]: _, ...query } = newQuery;

          return {
            query,
            columnFilters: {
              ...columnFilters,
              [id]: text,
            },
          };
        }

        return {
          query: {
            ...newQuery,
            [filterKey]: text,
          },
          columnFilters: {
            ...columnFilters,
            [id]: text,
          },
        };
      },
      () => {
        this.props.debounceRequest(FETCH_SAMPLE_DATA, '', this.state.query);
      },
    );
  };

  onSort = ev => {
    this.setState(
      state => ({
        query: {
          ...state.query,
          _sort: ev.sortField,
          _order: ev.sortOrder === 1 ? 'asc' : 'desc',
        },
        ...ev,
      }),
      () => {
        this.props.sendRequestLatest(FETCH_SAMPLE_DATA, '', this.state.query);
      },
    );
  };

  onPage = ev => {
    this.setState(
      state => ({
        query: {
          ...state.query,
          _page: ev.page,
          _limit: ROWS,
        },
        ...ev,
      }),
      () => {
        this.props.sendRequestLatest(FETCH_SAMPLE_DATA, '', this.state.query);
      },
    );
  };

  filterInput = (id: string, type: string | null = null) => (
    <InputText
      keyfilter={type}
      id={id}
      className="p-column-filter"
      value={this.state.columnFilters[id]}
      onTextChange={this.onColumnFilter}
    />
  );

  render() {
    const header = (
      <div style={{ textAlign: 'left' }}>
        <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }} />
        <InputText
          type="search"
          id="search"
          onTextChange={this.onFilterChange}
          placeholder="Global Search"
          size="50"
        />
      </div>
    );

    return (
      <div>
        <div className="content-section implementation">
          <DataTable
            loading={this.props.carsRequest.sending}
            value={this.props.cars}
            paginator
            lazy
            totalRecords={this.props.totalRecords}
            pageLinkSize={this.state.pageLinkSize}
            pagina
            rows={ROWS}
            header={header}
            first={this.state.first}
            onFilter={() => {
              // ignore default
            }}
            onPage={this.onPage}
            onSort={this.onSort}
            sortField={this.state.sortField}
            sortOrder={this.state.sortOrder}
          >
            <Column
              field="vin"
              header="Vin"
              name="vin"
              filter
              filterElement={this.filterInput('vin')}
            />
            <Column
              field="year"
              header="Year"
              filter
              sortable
              filterElement={this.filterInput('year', 'int')}
            />
            <Column
              field="brand"
              header="Brand"
              filter
              sortable
              filterElement={this.filterInput('brand')}
            />
            <Column
              field="color"
              header="Color"
              filter
              sortable
              filterElement={this.filterInput('color')}
            />
            <Column
              field="test"
              header="Test"
              filter
              sortable
              filterElement={this.filterInput('test')}
            />
          </DataTable>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cars: state.demoStore.data,
  totalRecords: state.demoStore.totalRecords,
  carsRequest: selectRequestObject(state, FETCH_SAMPLE_DATA, ''),
});

const mapDispatchToProps = dispatch => ({
  sendRequestLatest: (
    key: string,
    id: string,
    params: Object,
    successAction?: Object | Object[],
    failureAction?: Object | Object[],
  ) =>
    dispatch(sendRequestLatest(key, id, params, successAction, failureAction)),
  debounceRequest: (
    key: string,
    id: string,
    params: Object,
    successAction?: Object | Object[],
    failureAction?: Object | Object[],
  ) => dispatch(debounceRequest(key, id, params, successAction, failureAction)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Demo);
