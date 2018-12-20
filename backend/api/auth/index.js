import { Router } from 'express'
import { login } from './controller'
import { password, master, googleAuth, googleVerify, googleSuccess } from '../../services/passport'

const router = new Router()

/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission master
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String} access_token Master access_token.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Master access only or invalid credentials.
 */
router.post('/',
  master(),
  password(),
  login)

router.get('/google',
  googleAuth(),
  login)
/*
router.get('/google-success',
  googleSuccess(),
  login)

router.get('/google-verify',
  googleVerify(),
  login)
*/

export default router
