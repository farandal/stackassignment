/**
 * Stack Assignment Backend - M800
 * Items Router
 * This file contains the mapping between the routes in the api
 * and the logic in the controller
 * Author: Francisco Aranda <farandal@gmail.com>
 */

import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'

const router = new Router()

/**
 * @api {post} /items Create items
 * @apiName CreateItems
 * @apiGroup Items
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} items Items's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Items not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  create)

/**
 * @api {get} /items Retrieve items
 * @apiName RetrieveItems
 * @apiGroup Items
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} items List of items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /items/:id Retrieve items
 * @apiName RetrieveItems
 * @apiGroup Items
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} items Items's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Items not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /items/:id Update items
 * @apiName UpdateItems
 * @apiGroup Items
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} items Items's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Items not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  update)

/**
 * @api {delete} /items/:id Delete items
 * @apiName DeleteItems
 * @apiGroup Items
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Items not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
