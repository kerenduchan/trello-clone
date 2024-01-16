const DB_NAME = 'krello'

export function getDbUrl() {
    if (process.env.NODE_ENV === 'production') {
        // For an atlas mongodb database, it should be something like:
        // 'mongodb+srv://<username>:<password>@<cluster-address>/<db-name>?retryWrites=true&w=majority';
        return process.env.DB_URL
    }
    // local development db
    return `mongodb://127.0.0.1:27017/${DB_NAME}`
}
