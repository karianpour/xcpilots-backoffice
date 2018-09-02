import React, { Component } from 'react';
import loopbackRestClient from 'aor-loopback';
import {Delete, Admin, Resource} from 'react-admin';
import './App.css';
import {NewsCreate, NewsEdit, NewsList} from './models/News';
// import farsiMessages from 'ra-language-farsi';
import farsiMessages from './farsi';

const messages = {
  'fa': farsiMessages,
};

const i18nProvider = locale => messages[locale];

function getServerApi(){
  return `${process.env.REACT_APP_API}/api`;
}

class App extends Component {
  render() {
    return (
      <div dir={'rtl'}>
        <Admin locale="fa" i18nProvider={i18nProvider} title="ایکسی‌پایلوت" dataProvider={loopbackRestClient(getServerApi())}>
          <Resource options={{ label: 'اخبار' }} name="news" list={NewsList} create={NewsCreate} edit={NewsEdit} remove={Delete} />
        </Admin>
      </div>
    );
  }
}

export default App;
