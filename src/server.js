const express = require('express');
const { Connection, Request } = require('tedious');

const app = express();
const port = 3000; // Puedes cambiar el número de puerto según tus necesidades

const cors = require('cors');

// Configuración de CORS
app.use(cors());

// Configuración de la conexión a la base de datos
const config = {
  server: 'servidor-toso.ddns.net',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'qweASDzxc123*',
    },
  },
  options: {
    encrypt: false,
    database: 'PaginaWeb',
    rowCollectionOnDone: true
  },
};
const executeQuery = (sql, res) => {
  const connection = new Connection(config);

  connection.on('connect', function (err) {
    if (err) {
      console.error('Connection error: ', err);
      return setTimeout(() => connection.connect(), 5000); // Retry connection after 5 seconds
    }

    var request = new Request(sql, function (err, rowCount, rows) {
      if (err) {
        console.error('Error executing query: ', err);
        return next(err);
      }
    }).on('doneInProc', function (rowCount, more, rows) {
      res(rows);
    });

    connection.execSql(request);
  });

  connection.on('error', function (err) {
    if (err.code === 'ECONNRESET') {
      console.error('Connection reset by peer');
    } else {
      console.error(err);
    }
  });

  connection.connect();
};

app.get('/api/products', (req, res, next) => {
  executeQuery("SELECT * FROM productos", function (rows) {
    const products = rows.map((columns) => ({
      id: columns[0].value,
      nombre: columns[1].value,
      codigo: columns[2].value,
      descripcion: columns[3].value,
      precio: columns[4].value,
      imagen: columns[5].value,
    }));

    res.json({ products });
  });
});

app.get('/api/promotionCarousel', (req, res, next) => {
  executeQuery("SELECT * FROM promociones", function (rows) {
    const images = rows.map((columns) => columns[0].value);
    res.json({ images });
  });
});

// Middleware de manejo de errores
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error ejecutando la consulta');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});