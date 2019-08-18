import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { addField, FieldTitle } from 'ra-core';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const sanitizeRestProps = ({
  alwaysOn,
  basePath,
  component,
  defaultValue,
  formClassName,
  initializeForm,
  input,
  isRequired,
  label,
  locale,
  meta,
  options,
  optionText,
  optionValue,
  record,
  resource,
  allowEmpty,
  source,
  textAlign,
  translate,
  translateChoice,
  ...rest
}) => rest;

const sanitizeValue = value => {
  // console.log({value})
  // null, undefined and empty string values should not go through dateFormatter
  // otherwise, it returns undefined and will make the input an uncontrolled one.
  if (value == null || value === '') {
    return '';
  }

  // const finalValue = typeof value instanceof Date ? value : new Date(value);
  // return dateFormatter(finalValue);
  return value;
};

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

const styles = theme => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class SampleSuggest extends React.Component {
  state = {
    inputValue: '',
    lastSelectedValue: {},
    suggestions: [],
  };

  constructor(props){
    super(props);
    let { value } = props;
    if( value === null || value === undefined ) value = '';
  }

  componentDidMount(){
    this.updateSelectedValue();
  }

  updateSelectedValue = async () => {
    const selectedValue = this.props.value;
    const { lastSelectedValue } = this.state;
    if(selectedValue && selectedValue!==this.props.getSuggestionValue(lastSelectedValue)){
      const suggestion = await this.props.getSuggestionByValue(this.props.value);
      if(suggestion){
        this.setState({
          inputValue: this.props.getSuggestionDescription(suggestion),
          lastSelectedValue: suggestion,
        });
      }
    }
  }

  handleSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await this.props.getSuggestions(value);
    this.setState({
      suggestions,
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const {
      classes, name, onChange, placeholder,
      getSuggestionValue, getSuggestionDescription,
    } = this.props;
    const { inputValue } = this.state;
    // console.log(this.state);
    // console.log(name, selectedValue, this.props);

    const handleInputChange = (e, e2) => {
      if(e.target.value !== undefined) {
        this.setState({inputValue: e.target.value})
        if(!e.target.value){
          if(onChange) onChange({target: {name, value: ''}});
          this.setState({lastSelectedValue: {}})
        }
      }
      // console.log({e, e2})
    }

    const handleBlur = (event) => {
      // console.log('blured', event, props.field.value, value, lastSelectedValue);
      if((this.state.lastSelectedValue && this.state.inputValue !== getSuggestionDescription(this.state.lastSelectedValue))){
        this.setState({inputValue: getSuggestionDescription(this.state.lastSelectedValue)})
      }
    };

    const handleSelected = (event, selected)=> {
      if(selected.suggestion){
        if(onChange) onChange({target: {name, value: selected.suggestion.id}});
        this.setState({
          inputValue: getSuggestionDescription(selected.suggestion),
          lastSelectedValue: selected.suggestion,
        })
      }
    }

    const renderSuggestion = (suggestion, { query, isHighlighted }) => {
      return (
        <MenuItem selected={isHighlighted} component="div">
          <span>{getSuggestionDescription(suggestion)}</span>
        </MenuItem>
      );
    }
    
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionSelected: handleSelected,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          placeholder,
          value: inputValue,
          onChange: handleInputChange,
          onBlur: handleBlur,
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    );
  }
}

SampleSuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SampleSuggestStyled = withStyles(styles)(SampleSuggest);

class SampleSuggestField extends React.Component {
  render() {
    const {
      autoComplete,
      autoFocus,
      className,
      defaultValue,
      disabled,
      error,
      FormHelperTextProps,
      fullWidth,
      helperText,
      id,
      InputLabelProps,
      inputProps,
      InputProps,
      inputRef,
      label,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      required,
      value,
      classes,
      ...other
    } = this.props;

    // console.log({InputProps})

    const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
    const InputElement = (
      <Input
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        disabled={disabled}
        fullWidth={true}
        name={name}
        value={value}
        id={id}
        inputRef={inputRef}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        inputComponent={SampleSuggestStyled}
        inputProps={inputProps}
        {...InputProps}
      />
    );

    return (
      <FormControl
        aria-describedby={helperTextId}
        className={className}
        error={error}
        fullWidth={fullWidth}
        required={required}
        {...other}
      >
        {label && (
          <InputLabel htmlFor={id} {...InputLabelProps}>
            {label}
          </InputLabel>
        )}
        {InputElement}
        {helperText && (
          <FormHelperText fullWidth={true} id={helperTextId} {...FormHelperTextProps}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

class SampleSuggestInputBase extends Component {

  onChange = event => {
      this.props.input.onChange(event.target.value);
  };

  render() {
      const {
          className,
          meta,
          input,
          isRequired,
          label,
          options,
          source,
          resource,
          ...rest
      } = this.props;
      if (typeof meta === 'undefined') {
          throw new Error(
              "The SampleSuggestInputBase component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details."
          );
      }
      const { touched, error } = meta;
      const value = sanitizeValue(input.value);
      const sanitizedRest = sanitizeRestProps(rest);

      return (
        <SampleSuggestField
            {...input}
            className={className}
            margin="normal"
            error={!!(touched && error)}
            helperText={touched && error}
            label={
              <FieldTitle
                label={label}
                source={source}
                resource={resource}
                isRequired={isRequired}
              />
            }
            InputLabelProps={{
              shrink: true,
            }}
            {...options}
            {...sanitizedRest}
            value={value}
            onChange={this.onChange}
            onBlur={this.onBlur}
        />
      );
  }
}

SampleSuggestInputBase.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string,
};

SampleSuggestInputBase.defaultProps = {
  options: {},
};

export default addField(SampleSuggestInputBase);