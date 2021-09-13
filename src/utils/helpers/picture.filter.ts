export const PictureFilterFile = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.fileValidationError = 'File not acceptable';
    return callback(null, false);
  }
  return callback(null, true);
}
