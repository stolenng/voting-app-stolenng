module.exports = function(image) {
    return {
        url : image.webformatURL,
        snippet : image.tags,
        thumbnail : image.previewURL,
        context : image.pageURL
    }
}