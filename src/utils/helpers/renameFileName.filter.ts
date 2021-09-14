export const RenameImage = (file, callback) => {
    callback(null, file.fieldname + '-' + Date.now())
}