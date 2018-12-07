import React, { Component } from 'react';
import loopbackRestClient from 'aor-loopback';
import {Delete, Admin, Resource} from 'react-admin';
import './App.css';
import {NewsCreate, NewsEdit, NewsList} from './models/News';
import {BackgroundCreate, BackgroundEdit, BackgroundList} from './models/Background';
import {ContentCreate, ContentEdit, ContentList} from './models/Content';
// import farsiMessages from 'ra-language-farsi';
import farsiMessages from './farsi';
import addUploadCapabilities from './fileUpload';
import { createMuiTheme } from '@material-ui/core/styles'

import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const messages = {
  'fa': farsiMessages,
};

const i18nProvider = locale => messages[locale];

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

export function getServerApi(){
  return `${process.env.REACT_APP_API}/__api`;
}

const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: [
      'Nahid',
    ].join(','),
  },  
});

class App extends Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
      <div dir={'rtl'}>
        <Admin theme={theme} locale="fa" i18nProvider={i18nProvider} title="ایکسی‌پایلوت" dataProvider={addUploadCapabilities(loopbackRestClient(getServerApi()))}>
          <Resource options={{ label: 'اخبار' }} name="news" list={NewsList} create={NewsCreate} edit={NewsEdit} remove={Delete} />
          <Resource options={{ label: 'پس‌زمینه' }} name="background" list={BackgroundList} create={BackgroundCreate} edit={BackgroundEdit} remove={Delete} />
          <Resource options={{ label: 'محتوا' }} name="content" list={ContentList} create={ContentCreate} edit={ContentEdit} remove={Delete} />
        </Admin>
      </div>
      </JssProvider>
    );
  }
}

export default App;
