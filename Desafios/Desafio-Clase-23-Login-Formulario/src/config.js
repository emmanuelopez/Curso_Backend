export default {
    PORT: process.env.PORT || 8080,
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://eel:4GDJDZvBBKOK6ZaA@cluster0.zib5u.mongodb.net/miBaseLogin?retryWrites=true&w=majority'
    },
    fileSystem: {
        path: './DB'
    }
}