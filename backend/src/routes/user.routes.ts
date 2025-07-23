import Router from 'express';
import UserController from '@src/app/controllers/UserController';
import { ensureAuthenticated } from '@src/app/middlewares/ensureAuthenticated';
import { ensureProfile } from '@middlewares/ensureProfile';
import { ensureAdmin } from '@middlewares/ensureAdmin';


const routes = Router();
routes.post('/', ensureAuthenticated, ensureAdmin, UserController.create);
routes.get('/', ensureAuthenticated, ensureAdmin, UserController.findUsers);
routes.get('/account/', ensureAuthenticated, UserController.findAccount);
routes.get('/role/:id', ensureAuthenticated, UserController.getRole);
routes.get('/:id', ensureAuthenticated, ensureAdmin, UserController.findUserById);
routes.put('/:id', ensureAuthenticated, ensureProfile, UserController.update);
routes.delete('/:id', ensureAuthenticated, ensureAdmin, UserController.delete);

export default routes;

