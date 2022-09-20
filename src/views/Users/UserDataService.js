import { db } from '../../config/firebase'

class UserDataService {
    createUser(user) {
        this.user = user
        return db.collection('users').add(this.user)
    }
}

export default new UserDataService()
