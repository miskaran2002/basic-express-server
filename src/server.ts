import express, { 
    type Application, 
    type Request, 
    type Response } from 'express';

const app:Application = express()
import {Pool} from "pg"


const port = 5000;

app.use(express.json());
app.use (express.text());
app.use(express.urlencoded({extended: true}));

const pool = new Pool({
    connectionString : "postgresql://neondb_owner:npg_QFTu6UPcrSE7@ep-tiny-mountain-ap8lzqs8-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

const initBD = async () => {
    try {
       await pool.query(` 
        CREATE TABLe  IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) ,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        ) 
        `);
        console.log('table created successfully');
    } catch (error) {
        console.log(error);
    }
}; 
initBD();


app.get('/', (req:Request, res :Response) => {
//   res.send('Express with TypeScript!')
res.status(200).json({
    message: 'express server!',
    "author": "Programming Hero"
  });

});
app.post('/',async (req:Request, res :Response) => {
// console.log(req.body);
 const {name, email, password} = req.body;
  res.status(201).json({
    message: 'Created successfully!',
    data: {name,
         email,
        },
      
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
