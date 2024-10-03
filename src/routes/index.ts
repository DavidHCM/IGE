import {Router} from 'express';


const router = Router();

//router.use('/users', authMiddleware, usersRoutes);
router.get('',(req, res)=> {
    res.send('api IGE works')
})


export default router;

