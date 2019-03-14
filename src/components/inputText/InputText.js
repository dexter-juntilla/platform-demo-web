import React, { PureComponent } from 'react';
import { InputText as PrimeInputText } from 'primereact/inputtext';

type Props = {
  id: string,
  onTextChange: Function,
};

class InputText extends PureComponent<Props> {
  onInput = (ev: Object) => {
    this.props.onTextChange(this.props.id, ev.target.value);
  };

  render() {
    const { onTextChange: _, ...newProps } = this.props;

    return <PrimeInputText {...newProps} onChange={this.onInput} />;
  }
}

export default InputText;
