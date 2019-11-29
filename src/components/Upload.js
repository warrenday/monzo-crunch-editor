import React from 'react';
import { Upload, message, Button, Icon } from 'antd';
import Papa from 'papaparse';

const processFile = (file, cb) => e => {
  const body = e.target.result;
  const { data, errors } = Papa.parse(body, { header: true, skipEmptyLines: true });
  if (errors.length) {
    message.error('There are errors with this CSV, see console.');
    console.log(errors);
  } else {
    message.success(`${file.name} file uploaded successfully`);
    cb(data);
  }
};

const Uploader = props => {
  const { onChange } = props;

  const uploadProps = {
    name: 'file',
    action: null,
    beforeUpload(file) {
      const reader = new FileReader();
      reader.onloadend = processFile(file, onChange);
      reader.readAsText(file);
      return false;
    },
    fileList: [],
  };

  return (
    <Upload {...uploadProps}>
      <Button>
        <Icon type="upload" /> Upload Monzo CSV
      </Button>
    </Upload>
  );
};

export default Uploader;
