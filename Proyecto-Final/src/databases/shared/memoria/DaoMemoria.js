import Dao from '../Dao.js'

export default class DaoMemoria extends Dao {
    constructor() {
        super()
        this.objects = []
    }

    async getMaxId() {
        let maxId = 0
        for (let object of this.objects) {
            if (object.id > maxId) {
                maxId = object.id
            }
        }    
        return maxId
    }

    async crearId() {
        let maxId = await this.getMaxId()
        return maxId + 1
    }

    async listarTodos() {
        return this.objects
    }

    async listarPorId(id) {
        return this.objects.find(object => object.id === id)
    }
}
