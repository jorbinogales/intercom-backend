export const pictureFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(png)$/)) {
    req.fileValidationError = 'only image files allowed';
    return callback(null, false);
  }
  return callback(null, true);
}
