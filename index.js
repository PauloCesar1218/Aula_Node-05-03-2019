const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());


const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database: 'jwtUser'
});

conn.connect((err) => {
    if (err) {
        console.log(err);        
    } else {
        console.log("Database connection succeded!");
    }
});

app.get('/', (req, res) => {
    
})

app.post('/cadastrar', (req, res) => {
    console.log(req.body);
    const user = req.body;
    
    const queryString = "insert into user (nome, eid, pid, email, senha) values (?, ?, ?, ?, ?)";
    conn.query(queryString, [user.nome, user.eid, user.pid, user.email, user.senha],(err, rows, fields) => {
        if (!err) {
            console.log('usuario cadastrado com sucesso!');
            
            res.json({sucesso:'Funcionario cadastrado com sucesso!', data: user})
        }else {
            console.log(err);
            res.json({erro:'Erro ao cadastrar funcionario', erro: err})
        }
    })
    
})

app.post('/login', (req, res) => {
    const user = req.body;
    console.log(user);
    
    const queryString = 'select * from user';
    conn.query(queryString, (err, rows, fields) => {
        if (!err) {
            for (const row of rows) {
                
                if (row.email == user.email && row.senha == user.senha) {
                    jwt.sign({ user: user }, 'secretkey', (e, token) => {
                        if (!e) {
                            res.json({ data: user, token: token });
                        } else {
                            res.json({ erro: e });
                        }
                    })
                } else {
                    console.log(row);
                }           
            }
        } else {
            res.json({erro: err})
        }
    })
})

app.listen(port, () => console.log(`Server listening on port ${port}`));
