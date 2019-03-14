import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  sendRequestAwait,
  dismissResult,
} from '../../redux/request/request.action';
import { selectRequestObject } from '../../redux/request/request.selector';
import type {
  ActionDispatcher,
  GlobalState,
  RequestObject,
} from '../../redux/util/types';
import { CREATE_CAR } from '../../redux/request/request.constants';
import { CarForm } from '../../components/forms';

type StateProps = {
  createCarRequestState: RequestObject,
};

type DispatchProps = {
  sendRequestAwait: (
    key: string,
    id: string,
    params: Object,
  ) => ActionDispatcher,
  dismissResult: (key: string, id: string) => ActionDispatcher,
};

type Props = StateProps & DispatchProps;

class AdminDemo extends PureComponent<Props> {
  createCar = (brand: string, color: string) => {
    this.props.sendRequestAwait(CREATE_CAR, '', { brand, color });
  };

  dismissError = () => {
    this.props.dismissResult(CREATE_CAR, '');
  };

  render() {
    return (
      <CarForm
        createCar={this.createCar}
        createCarRequestState={this.props.createCarRequestState}
        dismissError={this.dismissError}
      />
    );
  }
}

const mapStateToProps: GlobalState => StateProps = state => ({
  createCarRequestState: selectRequestObject(state, CREATE_CAR, ''),
});

const mapDispatchToProps: ActionDispatcher => DispatchProps = dispatch => ({
  sendRequestAwait: (key: string, id: string, params: Object) =>
    dispatch(sendRequestAwait(key, id, params)),
  dismissResult: (key, id) => dispatch(dismissResult(key, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminDemo);
