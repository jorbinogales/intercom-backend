export const RenameImage = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileName = file.originalname;
    const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 32).toString(32))
        .join('');

    callback(null, `${randomName}.png`)
}