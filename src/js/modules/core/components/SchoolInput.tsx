import * as React from "react";
import Autocomplete from "react-autocomplete";

interface InputState<T> {
  value: T;
}

const isUpper = (str) => str === str.toUpperCase()
const doesStringMatch = (item, value) => {
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

const SchoolInput: React.SFC<Props> = (props) => {
  const { schools, input } = props;

  return (
    <Autocomplete
      {...input}
      getItemValue={(item) => item}
      items={ schools }
      shouldItemRender={ doesStringMatch }
      renderItem={(item, isHighlighted) =>
        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
          { item }
        </div>
      }
      onChange={ (val) => input.onChange(val) }
      onSelect={ (val) => input.onChange(val) }
    />
  );    
};

export default SchoolInput;