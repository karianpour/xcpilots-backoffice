import React from 'react';
import SampleSuggestInputBase from './sample-suggest-base';

const suggestions = [
  { id: '1', label: 'Afghanistan' },
  { id: '2', label: 'Aland Islands' },
  { id: '3', label: 'Albania' },
  { id: '4', label: 'Algeria' },
];

function getSuggestionValue(suggestion) {
  return suggestion.id;
}

function getSuggestionDescription(suggestion){
  return suggestion && suggestion.label ? suggestion.label : '';
}

async function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

async function getSuggestionByValue(value) {
  const suggestion = suggestions.find( s => getSuggestionValue(s) === value);
  return suggestion;
}

function SampleSuggestInput(props){
  return (
    <SampleSuggestInputBase
      inputProps={{
        getSuggestionValue,
        getSuggestionDescription,
        getSuggestionByValue,
        getSuggestions,
      }}
      {...props}
    />
  )
}

export default SampleSuggestInput;