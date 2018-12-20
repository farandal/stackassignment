import { Router } from 'express'
import { login, googleAuth, googleSuccess } from './controller'
import { password, master } from '../../services/passport'

const router = new Router()

router.post('/',
  master(),
  password(),
  login)

router.get('/google',
  googleAuth())

router.get('/google-success',
  googleSuccess(),
  login)

/*

router.get('/google-verify',
  googleVerify(),
  login)
*/

export default router
