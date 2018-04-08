import Api from '@/services/Api'

export default {
 // register a user
 register (params) {
   return Api().post('users/register', params)
 }
}

