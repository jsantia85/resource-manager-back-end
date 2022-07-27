import { Router } from 'express'
import * as resourcesCtrl from '../controllers/resources.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/
router.get('/', resourcesCtrl.index)
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, resourcesCtrl.create)
router.delete('/:id', checkAuth, resourcesCtrl.delete)
router.put('/:id', checkAuth, resourcesCtrl.update)


export {
  router
}