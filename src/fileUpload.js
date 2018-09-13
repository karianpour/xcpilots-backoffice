import axios from 'axios';

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
  return axios.post('http://localhost:3000/api/assets/upload', formData, {});
}

const hasFileToUpload = (resource) => {
  return resource === 'news';
};

const addUploadCapabilities = requestHandler => {
  return (type, resource, params) => {
    if ((type === 'CREATE' || type === 'UPDATE') && hasFileToUpload(resource)) {
      if (params.data.pictures && params.data.pictures.length) {
        // only freshly dropped pictures are instance of File
        // console.log(params.data.pictures.length);
        const formerPictures = params.data.pictures.filter(
          p => !(p.rawFile instanceof File)
        );
        const newPictures = params.data.pictures.filter(
          p => p.rawFile instanceof File
        );

        return Promise.all(newPictures.map(upload))
          .then(function (uploadedPictures) {
              return uploadedPictures.map(function (p) {
                // console.log(p);
                return ({
                  ...p.data
                });
              });
            }
          )
          .then(function (transformedNewPictures) {
              return requestHandler(type, resource, {
                ...params,
                data: {
                  ...params.data,
                  pictures: [
                    ...transformedNewPictures,
                    ...formerPictures,
                  ],
                },
              });
            }
          );
      }
    }

    return requestHandler(type, resource, params);
  };
};

export default addUploadCapabilities;
