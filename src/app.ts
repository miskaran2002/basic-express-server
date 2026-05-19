import express, {
    type Application,
    type Request,
    type Response
} from 'express';

const app: Application = express();
import { userRoute } from './modules/user/user.route';




app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req: Request, res: Response) => {
    //   res.send('Express with TypeScript!')
    res.status(200).json({
        message: 'express server!',
        "author": "Programming Hero"
    });

});

app.use('/api/users', userRoute);


export default app;
