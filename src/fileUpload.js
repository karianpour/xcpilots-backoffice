import axios from 'axios';
import {getServerApi} from './App';

function upload(file){
  // console.log(file);
  // console.log(file.lastModified);
  // console.log(file.lastModifiedDate);
  // console.log(file.name);
  // console.log(file.preview);
  // console.log(file.size);
  // console.log(file.type);

  //curl -X POST -F file=@hello.txt -F name=Hello http://localhost:3000/api/assets/upload

  // const req = request.post('http://localhost:3000/api/assets/upload');
  // req.attach('file', file);
  // return req.end();

  // const blob = new Blob([file.rawFile]); // kind of works and choses stream as content type of file (not request)
  const blob = new Blob([file.rawFile], { type: file.rawFile.type });// WORKS much better (if you know what MIME type you want.

  const formData = new FormData();
  formData.append('file', blob, file.rawFile.name);
  return axios.post(`${getServerApi()}/assets/upload`, formData, {});
}

const hasFileToUpload = (resource) => {
  return resource === 'news' || resource === 'background' || resource === 'content';
};

const whatIsFileField = (resource) => {
  if(resource === 'news' || resource === 'background') return 'pictures';
  if(resource === 'content') return 'files';
};

const addUploadCapabilities = requestHandler => {
  return (type, resource, params) => {
    if ((type === 'CREATE' || type === 'UPDATE') && hasFileToUpload(resource)) {
      const fileField = whatIsFileField(resource);
      if (params.data[fileField] && params.data[fileField].length) {
        // only freshly dropped pictures|files are instance of File
        // console.log(params.data[fileField].length);
        const formerFiles = params.data[fileField].filter(
          p => !(p.rawFile instanceof File)
        );
        const newFiles = params.data[fileField].filter(
          p => p.rawFile instanceof File
        );

        return Promise.all(newFiles.map(upload))
          .then(function (uploadedFiles) {
              return uploadedFiles.map(function (p) {
                // console.log(p);
                return ({
                  ...p.data
                });
              });
            }
          )
          .then(function (transformedNewFiles) {
              return requestHandler(type, resource, {
                ...params,
                data: {
                  ...params.data,
                  [fileField]: [
                    ...transformedNewFiles,
                    ...formerFiles,
                  ],
                },
              });
            }
          );
      }else if (params.data[fileField]){
        const file = params.data[fileField];
        if(file.rawFile instanceof File) {
          return upload(file)
            .then(function (uploadedFile) {
                return {...uploadedFile.data};
              }
            )
            .then(function (transformedNewFile) {
                return requestHandler(type, resource, {
                  ...params,
                  data: {
                    ...params.data,
                    [fileField]: transformedNewFile,
                  },
                });
              }
            );
        }
      }
    }

    return requestHandler(type, resource, params);
  };
};

export default addUploadCapabilities;
