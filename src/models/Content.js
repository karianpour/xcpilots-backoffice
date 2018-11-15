import React from 'react';
import { List, Create, SimpleForm, DisabledInput, TextInput, TextField, Datagrid, Edit, EditButton, FileInput, FileField, SelectField, SelectInput} from 'react-admin';
import uuidv1 from 'uuid';
import JalaliField from '../components/JalaliField';

export const ContentList = (props) => (
  <List title={"محتوا"} sort={{field: 'created_at', order: 'desc'}} {...props}>
    <Datagrid>
      <JalaliField source="created_at" label={"زمان ایجاد"} showTime/>
      <JalaliField source="updated_at" label={"زمان تغییر"} showTime/>
      <SelectField source="section" label={"بخش"} choices={[
        { id: 'radio', name: 'رادیو' },
        { id: 'glide', name: 'گلاید' },
      ]}/>
      <TextField source="title" label={"تیتر"}/>
      <TextField source="id" label={"شناسه"}/>
      <EditButton />
    </Datagrid>
  </List>
);

export const ContentCreate = (props) => (
  <Create title={"محتوا جدید"} {...props}>
    <SimpleForm>
      <DisabledInput source="id" label={"شناسه"} defaultValue={() => uuidv1()}/>
      <SelectInput source="section" label={"بخش"} choices={[
        { id: 'radio', name: 'رادیو' },
        { id: 'glide', name: 'گلاید' },
      ]}/>
      <TextInput source="title" label={"تیتر"}/>
      <FileInput source="file" multiple={false} label="فایل مربوطه" accept="application/pdf, audio/*">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Create>
);

export const ContentEdit = (props) => (
  <Edit title={"ویرایش محتوا"} {...props}>
    <SimpleForm>
      <DisabledInput source="id" label={"شناسه"}/>
      <SelectInput source="section" label={"بخش"} choices={[
        { id: 'radio', name: 'رادیو' },
        { id: 'glide', name: 'گلاید' },
      ]}/>
      <TextInput source="title" label={"تیتر"}/>
      <FileInput source="file" multiple={false} label="فایل مربوطه" accept="application/pdf, audio/*">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);
