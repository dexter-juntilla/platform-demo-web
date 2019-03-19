import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FETCH_SAMPLE_DATA } from '../../redux/request/request.constants';
import {
  sendRequestLatest,
  debounceRequest,
} from '../../redux/request/request.action';
import { selectRequestObject } from '../../redux/request/request.selector';
import { DataTable } from '../../components/dataTable';

type Props = {
  fetchCars: Function,
  filterCars: Function,
  cars: Object[],
  carsRequest: Object,
};

class Demo extends PureComponent<Props> {
  render() {
    return (
      <DataTable
        cars={this.props.cars}
        carsRequest={this.props.carsRequest}
        fetchData={this.props.fetchCars}
        filterData={this.props.filterCars}
        columns={[
          {
            key: 'vin',
            field: 'vin',
            header: 'Vin',
            name: 'vin',
            filter: true,
            filterElement: ['vin'],
          },
          {
            key: 'year',
            field: 'year',
            header: 'Year',
            filter: true,
            sortable: true,
            filterElement: ['year', 'int'],
          },
          {
            key: 'brand',
            field: 'brand',
            header: 'Brand',
            filter: true,
            sortable: true,
            filterElement: ['brand'],
          },
          {
            key: 'color',
            field: 'color',
            header: 'Color',
            filter: true,
            sortable: true,
            filterElement: ['color'],
          },
          {
            key: 'test',
            field: 'test',
            header: 'Test',
            filter: true,
            sortable: true,
            filterElement: ['test'],
          },
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  cars: state.demoStore.data,
  carsRequest: selectRequestObject(state, FETCH_SAMPLE_DATA, 'cars'),
});

const mapDispatchToProps = dispatch => ({
  fetchCars: (params: Object) =>
    dispatch(sendRequestLatest(FETCH_SAMPLE_DATA, 'cars', params)),
  filterCars: (params: Object) =>
    dispatch(debounceRequest(FETCH_SAMPLE_DATA, 'cars', params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Demo);
