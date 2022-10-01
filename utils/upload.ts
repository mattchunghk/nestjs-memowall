import * as formidable from 'formidable';
import { join } from 'path';
export const uploadDir = join(__dirname, '..', '..', 'public', 'uploads');
import express from 'express';

let counter = 0;

console.log(join(__dirname, '..', '..', 'public', 'uploads'));
const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200000 * 1024 ** 2, // the default limit is 200KB
  filter: (part) => part.mimetype?.startsWith('image/') || false,
  filename: (originalName, originalExt, part, form) => {
    counter++;
    const fieldName = part.name;
    const timestamp = Date.now();
    const ext = part.mimetype?.split('/').pop();
    return `${fieldName}-${timestamp}-${counter}.${ext}`;
  },
});

export const formParse = (req: express.Request) => {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      const text = fields.memoText;
      let filename = '';

      const file = Array.isArray(files.memoFile)
        ? files.memoFile[0]
        : files.memoFile;
      if (file) {
        filename = file.newFilename;
      } else {
        filename = 'None';
      }
      resolve({
        filename,
        text,
      });
    });
  });
};
