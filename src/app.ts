import express, {
    type Application,
    type Request,
    type Response
} from 'express';

const app: Application = express();
import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profile/profile.route';
import { authRoute } from './modules/auth/auth.route';
import cookieParser from 'cookie-parser';
import logger from './middleware/logger';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';




app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your client's origin
   optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));






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


// Global Error Handling Middleware
app.use(globalErrorHandler);


export default app;
