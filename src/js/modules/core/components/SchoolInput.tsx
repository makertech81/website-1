import * as React from "react";
import Autocomplete from "react-autocomplete";

interface InputState<T> {
  value: T;
}

const isUpper = (str) => str === str.toUpperCase()

export default class SchoolInput extends React.Component<Props, InputState<string>> {
  schools: Array<string>;

  constructor(props: Props) {
    super(props);
    this.schools = props.schools;
    this.state = { value: '' };
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
    return (
      <Autocomplete
        getItemValue={(item) => item}
        items={ this.schools }
        shouldItemRender={ this.doesStringMatch }
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            { item }
          </div>
        }
        value={ this.state.value }
        onChange={(e) => this.setState({ value: e.target.value })}
        onSelect={(value) => this.setState({ value })}
      />
    );    
  }
};