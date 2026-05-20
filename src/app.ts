import express, {
    type Application,
    type Request,
    type Response
} from 'express';

const app: Application = express();
import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profile/profile.route';
import { authRoute } from './modules/auth/auth.route';
import fs from 'fs';




app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(' Method - URL  Time:',req.method, req.url, Date.now());

  const log= `\nMethod - URL  Time: ${req.method} ${req.url} ${Date.now()}\n`;


    fs.appendFile('logger.txt', log + '\n', (err) => {
        console.log(err); 
    });


  next();
});



app.get('/', (req: Request, res: Response) => {
    //   res.send('Express with TypeScript!')
    res.status(200).json({
        message: 'express server!',
        "author": "Programming Hero"
    });

});

app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);
app.use("/api/auth",authRoute);


export default app;
