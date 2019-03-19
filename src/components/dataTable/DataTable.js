import React, { PureComponent } from 'react';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from '../inputText';

const ROWS = 2;
const PAGE_LINK_SIZE = 1;

type Props = {
  fetchData: Function,
  filterData: Function,
  cars: Object[],
  carsRequest: Object,
  columns: Object[],
};

type State = {
  query: Object,
  sortOrder: number,
  sortField: string,
  columnFilters: Object,
  page: number,
};

class DataTable extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.columnFilters = props.columns.reduce(
      (accumulator, currentObj) => ({
        ...accumulator,
        [currentObj.field]: '',
      }),
      {},
    );

    this.state = {
      query: {},
      sortField: '',
      sortOrder: 1,
      page: 1,
      columnFilters: {
        ...this.columnFilters,
      },
    };
  }

  componentDidMount() {
    this.props.fetchData({
      _page: 1,
      _limit: ROWS,
    });
  }

  onColumnFilter = (id: string, text: string) => {
    const page = 1;
    let { sortField } = this.state;
    const filterKey = `${id}_like`;

    let newQuery = this.state.query;

    if (newQuery._sort && newQuery._sort !== id) {
      const { _sort: _1, _order: _2, ...query } = newQuery;

      sortField = '';
      newQuery = query;
    }

    newQuery = Object.keys(newQuery)
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
            page,
            sortField,
            query: {
              ...query,
              _page: page,
            },
            columnFilters: {
              ...this.columnFilters,
              [id]: '',
            },
          };
        }

        return {
          page,
          sortField,
          query: {
            ...newQuery,
            _page: page,
            [filterKey]: text,
          },
          columnFilters: {
            ...this.columnFilters,
            [id]: text,
          },
        };
      },
      () => {
        this.props.filterData(this.state.query);
      },
    );
  };

  onSort = (ev: Object) => {
    const id = ev.sortField;
    const filterKey = `${id}_like`;
    const text = this.state.query[filterKey];

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
            // ...ev,
            query: {
              ...query,
              _sort: id,
              _order: ev.sortOrder === 1 ? 'asc' : 'desc',
            },
            columnFilters: {
              ...this.columnFilters,
              [id]: '',
            },
          };
        }

        return {
          // ...ev,
          query: {
            ...newQuery,
            _sort: id,
            _order: ev.sortOrder === 1 ? 'asc' : 'desc',
            [filterKey]: text,
          },
          columnFilters: {
            ...this.columnFilters,
            [id]: text,
          },
        };
      },
      () => {
        this.props.filterData(this.state.query);
      },
    );
  };

  onPage = (ev: Object) => {
    const page = ev.page + 1;

    this.setState(
      state => ({
        // ...ev,
        page,
        query: {
          ...state.query,
          _page: page,
          _limit: ROWS,
        },
      }),
      () => {
        this.props.fetchData(this.state.query);
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

  columnFilters: {};

  render() {
    const value = this.props.cars;
    const first = (this.state.page - 1) * ROWS;
    const totalRecords =
      value.length === ROWS
        ? (this.state.page + 1) * ROWS
        : this.state.page * ROWS;

    return (
      <div>
        <div className="content-section implementation">
          <PrimeDataTable
            loading={this.props.carsRequest.sending}
            paginatorTemplate="PrevPageLink PageLinks NextPageLink"
            // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            value={value}
            paginator
            lazy
            totalRecords={totalRecords}
            pageLinkSize={PAGE_LINK_SIZE}
            rows={ROWS}
            first={first}
            onFilter={() => {
              // ignore default
            }}
            onPage={this.onPage}
            onSort={this.onSort}
            sortField={this.state.sortField}
            sortOrder={this.state.sortOrder}
          >
            {this.props.columns.map(col => (
              <Column
                key={col.key}
                field={col.field}
                header={col.header}
                name={col.name}
                filter={col.filter}
                filterElement={this.filterInput(...col.filterElement)}
              />
            ))}
          </PrimeDataTable>
        </div>
      </div>
    );
  }
}

export default DataTable;
