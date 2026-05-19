import express, {
    type Application,
    type Request,
    type Response
} from 'express';

const app: Application = express();
import {  pool } from './db';
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







app.get('/api/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully!',
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }

})



app.get('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1',
            [id]);



        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found!',
                data: null,
            })


        }


        res.status(200).json({
            success: true,
            message: 'User retrieved successfully!',
            data: result.rows[0],
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
})

app.put('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, is_active, password, age } = req.body;



    try {
        const result = await pool.query(`UPDATE users
            SET name =COALESCE($1, name),
            password = COALESCE($2, password),
            age = COALESCE($3, age), 
            is_active = COALESCE($4, is_active),
            updated_at = NOW()
             WHERE id = $5 RETURNING *`,
            [name, password, age, is_active, id]);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found!',
                data: null,
            })
        };

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result.rows[0]
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }


})

app.delete('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found!',
                data: null,
            })
        };

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: null
        });
    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }

});

export default app;
