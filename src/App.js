import React, { Component } from 'react';
import loopbackRestClient from 'aor-loopback';
import {Delete, Admin, Resource} from 'react-admin';
import './App.css';
import {NewsCreate, NewsEdit, NewsList} from './models/News';
import {BackgroundCreate, BackgroundEdit, BackgroundList} from './models/Background';
// import farsiMessages from 'ra-language-farsi';
import farsiMessages from './farsi';
import addUploadCapabilities from './fileUpload';

const messages = {
  'fa': farsiMessages,
};

const i18nProvider = locale => messages[locale];

export function getServerApi(){
  return `${process.env.REACT_APP_API}/__api`;
}

class App extends Component {
  render() {
    return (
      <div dir={'rtl'}>
        <Admin locale="fa" i18nProvider={i18nProvider} title="ایکسی‌پایلوت" dataProvider={addUploadCapabilities(loopbackRestClient(getServerApi()))}>
          <Resource options={{ label: 'اخبار' }} name="news" list={NewsList} create={NewsCreate} edit={NewsEdit} remove={Delete} />
          <Resource options={{ label: 'پس‌زمینه' }} name="background" list={BackgroundList} create={BackgroundCreate} edit={BackgroundEdit} remove={Delete} />
        </Admin>
      </div>
    );
  }
}

export default App;
