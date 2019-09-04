import React, { Component } from 'react';
//import loopbackRestClient from 'aor-loopback';
import loopbackClient, { authProvider } from 'react-admin-loopback';

import {Admin, Resource} from 'react-admin';
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

export function getServerAuthApi(){
  return `${process.env.REACT_APP_API}/__api/users/login`;
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
        <Admin theme={theme} locale="fa" i18nProvider={i18nProvider} title="ایکسی‌پایلوت" dataProvider={addUploadCapabilities(loopbackClient(getServerApi()))} authProvider={authProvider(getServerAuthApi())}>
          <Resource options={{ label: 'اخبار' }} name="news" list={NewsList} create={NewsCreate} edit={NewsEdit} />
          <Resource options={{ label: 'پس‌زمینه' }} name="background" list={BackgroundList} create={BackgroundCreate} edit={BackgroundEdit} />
          <Resource options={{ label: 'محتوا' }} name="content" list={ContentList} create={ContentCreate} edit={ContentEdit} />
        </Admin>
      </div>
      </JssProvider>
    );
  }
}

export default App;
