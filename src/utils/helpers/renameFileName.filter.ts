export const RenameImage = (callback) => {
    const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 32).toString(32))
        .join('');

    callback(null, `${randomName}.png`)
}