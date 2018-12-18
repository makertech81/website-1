import * as React from "react";
import { Theme } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";

import Autocomplete from "react-autocomplete";

interface InputState<T> {
  value: T;
}

const isUpper = (str) => str === str.toUpperCase()
const doesStringMatch = (item, value) => {
  if (value !== '') {
    if (isUpper(value)) {
      const capLetters = item.split(" ").map(word => word[0]).filter(isUpper);
      const chars = [...value];

      for (let i = 0; i < chars.length; i++) {
        if (capLetters[i] !== chars[i]) {
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

const schoolInputStyles = (theme: Theme): Styles => ({
  input: {
    fontFamily: theme.fontFamily,
    marginLeft: "5px",
    padding: "5px",
    fontSize: "1em",
    position: "relative"
  }
});

const SchoolInput: React.SFC<Props> = (props) => {
  const { schools, input, classes } = props;
  const menuStyle = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    top: '50px', // height of your input
    left: 0,
    position: 'absolute',
    overflow: 'auto',
    width: '100%',
    zIndex: 1000
  };

  const wrapperStyle = {
    display: 'inline-block',
    position: 'relative'
  };

  console.log(props);

  return (
    <Autocomplete
      {...input}
      renderInput={(props) => <input {...props} className={classes.input} />}
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
      menuStyle={menuStyle}
      wrapperStyle={wrapperStyle}
    />
  );    
};

// adds `classes` to props
export default injectSheet(schoolInputStyles)(SchoolInput);