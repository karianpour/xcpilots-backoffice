import React from 'react';
import { List, Create, SimpleForm, DisabledInput, TextField, Datagrid, Edit, EditButton, ImageInput, ImageField, SelectField, SelectInput} from 'react-admin';
import uuidv1 from 'uuid';
import JalaliField from '../components/JalaliField';

export const BackgroundList = (props) => (
  <List title={"پس‌زمینه"} sort={{field: 'created_at', order: 'desc'}} {...props}>
    <Datagrid>
      <JalaliField source="created_at" label={"زمان ایجاد"} showTime/>
      <JalaliField source="updated_at" label={"زمان تغییر"} showTime/>
      <SelectField source="section" label={"بخش"} choices={[
        { id: 'home', name: 'home' },
      ]}/>
      <TextField source="id" label={"شناسه"}/>
      <EditButton />
    </Datagrid>
  </List>
);

export const BackgroundCreate = (props) => (
  <Create title={"پس‌زمینه جدید"} {...props}>
    <SimpleForm>
      <DisabledInput source="id" label={"شناسه"} defaultValue={() => uuidv1()}/>
      <SelectInput source="section" label={"بخش"} choices={[
        { id: 'home', name: 'home' },
      ]}/>
      <ImageInput source="pictures" multiple={true} label="عکس مربوطه" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const BackgroundEdit = (props) => (
  <Edit title={"ویرایش پس‌زمینه"} {...props}>
    <SimpleForm>
      <DisabledInput source="id" label={"شناسه"}/>
      <SelectInput source="section" label={"بخش"} choices={[
        { id: 'home', name: 'home' },
      ]}/>
      <ImageInput source="pictures" multiple={true} label="عکس مربوطه" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
