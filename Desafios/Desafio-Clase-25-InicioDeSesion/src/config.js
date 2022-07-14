export default {
    PORT: process.env.PORT || 8080,
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://eelop:MOSfet2905@cluster0.lhzzn.mongodb.net/?retryWrites=true&w=majority'
    },
    fileSystem: {
        path: './DB'
    }
}