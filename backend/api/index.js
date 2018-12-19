/**
 * Stack Assignment Backend - M800
 * API router file
 * Author: Francisco Aranda <farandal@gmail.com>
 */

import { Router } from 'express'
import items from './items'

const router = new Router()

router.use('/items', items)

export default router
