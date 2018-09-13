import React from 'react';
import { List, Create, SimpleForm, DisabledInput, LongTextInput, TextInput, TextField, DateField, BooleanField, Datagrid, Edit, EditButton, BooleanInput, NumberInput, ImageInput, ImageField} from 'react-admin';
import uuidv1 from 'uuid';
import JalaliField from '../components/JalaliField';

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

export const NewsCreate = (props) => (
  <Create title={"خبر جدید"} {...props}>
    <SimpleForm>
      <DisabledInput source="id" label={"شناسه"} defaultValue={() => uuidv1()}/>
      <TextInput source="title" label={"تیتر"}/>
      <LongTextInput source="description" label={"توضیح"}/>
      <LongTextInput source="body" label={"مشروح"}/>
      <ImageInput source="pictures" multiple={true} label="عکس مربوطه" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
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
