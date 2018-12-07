import React from 'react';
import { List, Create, SimpleForm, DisabledInput, LongTextInput, TextInput, TextField, Datagrid, Edit, EditButton, ImageInput, ImageField} from 'react-admin';
import uuidv1 from 'uuid';
import {JalaliField, JalaliInput} from 'ra-hichestan-datetime';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

export const NewsList = (props) => (
  <List title={"اخبار"} sort={{field: 'created_at', order: 'desc'}} {...props}>
    <Datagrid>
      <JalaliField source="created_at" label={"زمان ایجاد"} showTime/>
      <JalaliField source="updated_at" label={"زمان تغییر"} showTime/>
      <TextField source="title" label={"تیتر"}/>
      <TextField source="description" label={"توضیح"}/>
      <TextField source="id" label={"شناسه"}/>
      <EditButton />
    </Datagrid>
  </List>
);

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      formControl:{
        right: 0,
      },
      shrink:{
        transformOrigin: 'top right',
      },
    },
  },
});

export const NewsCreate = (props) => (
  <MuiThemeProvider theme={theme}>
  <Create title={"خبر جدید"} {...props}>
    <SimpleForm>
      <DisabledInput source="id" label={"شناسه"} defaultValue={() => uuidv1()}/>
      <TextInput source="title" label={"تیتر"}/>
      <JalaliInput source="title" label={"تاریخ"} defaultValue={() => ''}/>

      <LongTextInput source="description" label={"توضیح"}/>
      <LongTextInput source="body" label={"مشروح"}/>
      <ImageInput source="pictures" multiple={true} label="عکس مربوطه" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
  </MuiThemeProvider>
);

export const NewsEdit = (props) => (
  <Edit title={"ویرایش خبر"} {...props}>
    <SimpleForm>
      <DisabledInput source="id" label={"شناسه"}/>
      <TextInput source="title" label={"تیتر"}/>
      <LongTextInput source="description" label={"توضیح"}/>
      <LongTextInput source="body" label={"مشروح"}/>
      <ImageInput source="pictures" multiple={true} label="عکس مربوطه" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
