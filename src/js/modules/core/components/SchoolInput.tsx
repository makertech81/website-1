import * as React from "react";
import Autocomplete from "react-autocomplete";

interface InputState<T> {
  value: T;
}

const isUpper = (str) => str === str.toUpperCase()

export default class SchoolInput extends React.Component<Props, InputState<string>> {
  schools: Array<string>;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.schools = props.schools;
    this.state = { value: '' };
    this.props = props;
    console.log(this.props);
  }

  doesStringMatch(item, value) {
    if (value !== '') {
      if (isUpper(value)) {
        const firstLetters = item.split(" ").map(word => word[0]);

        for (let char of [...value]) {
          if (!firstLetters.includes(char)) {
            return false;
          }
        }

        return true;
      }
      else {
        return item.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }
    }
    else {
      return false;
    }
  }

  render() {
    const { input } = this.props;

    return (
      <Autocomplete
        {...input}
        getItemValue={(item) => item}
        items={ this.schools }
        shouldItemRender={ this.doesStringMatch }
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            { item }
          </div>
        }
        // value={ this.state.value }
        onChange={ (val) => input.onChange(val) }
        onSelect={ (val) => input.onChange(val) }
        // onSelect={(value) => this.setState({ value })}
      />
    );    
  }
};