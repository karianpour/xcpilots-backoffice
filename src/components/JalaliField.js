import React from 'react';
import moment from 'moment-jalaali';
import PropTypes from 'prop-types';

const JalaliField = ({ source, record = {}, showTime }) => <span>{formatDate(record[source], showTime)}</span>;

JalaliField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  showTime: PropTypes.boolean,
};

JalaliField.defaultProps = {
  addLabel: true,
  showTime: true,
};


const date_time_format = 'jYYYY/jMM/jDD HH:mm';
const date_format = 'jYYYY/jMM/jDD';

function formatDate(date, showTime){
  if(!date) return date;
  const jDate = moment(date);

  return jDate.isValid() ? '\u200E' + jDate.format(showTime ? date_time_format : date_format) : "##";
}

export default JalaliField;
