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
  try {
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
  } catch (error) {
    console.error('Error executing query: ', error);
    res([]);
  }
};

app.get('/api/searchProducts', (req, res, next) => {
  const query = req.query.q;
  const sql = `SELECT * FROM productos WHERE nombre LIKE '%${query}%'`;

  executeQuery(sql, function (rows) {
    const products = rows.map((columns) => ({
      id: columns[1].value,
      nombre: columns[2].value,
      codigo: columns[3].value,
      descripcion: columns[4].value,
      precio: columns[5].value,
      imagen: columns[6].value,
    }));

    res.json({ products });
  });
});

app.get('/api/products', (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = 20;
  const sort = req.query.sort || ''; // Opción de ordenamiento seleccionada
  const order = req.query.order || 'asc'; // Dirección del ordenamiento
  const search = req.query.search || ''; // Obtiene el parámetro de búsqueda de la consulta
  const category = req.query.category || null;
  const subcategory = req.query.subcategory || null;

  console.log(category);
  console.log(subcategory);

  let orderBy = 'id'; // Orden predeterminado por ID
  if (sort === 'price') {
    orderBy = 'precio';
  } else if (sort === 'name') {
    orderBy = 'nombre';
  } else if (sort === 'code') {
    orderBy = 'codigo';
  }

  // Verificamos que la dirección del ordenamiento sea válida
  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).send('Invalid order parameter');
  }

  console.log(`
  SELECT COUNT(*) OVER () as TotalCount, *
  FROM productos
  WHERE (nombre LIKE '%${search}%' OR codigo LIKE '%${search}%') 
  ${category ? `AND categoria = '${category}'` : ''} 
  ${subcategory ? `AND subcategoria = '${subcategory}'` : ''}
  ORDER BY ${orderBy} ${order} 
  OFFSET ${(page - 1) * pageSize} ROWS FETCH NEXT ${pageSize} ROWS ONLY
`);

  // Creamos la consulta SQL
  let sql = `
    SELECT COUNT(*) OVER () as TotalCount, *
    FROM productos
    WHERE (nombre LIKE '%${search}%' OR codigo LIKE '%${search}%') 
    ${category ? `AND categoria = '${category}'` : ''} 
    ${subcategory ? `AND subcategoria = '${subcategory}'` : ''}
    ORDER BY ${orderBy} ${order} 
    OFFSET ${(page - 1) * pageSize} ROWS FETCH NEXT ${pageSize} ROWS ONLY
  `;

  executeQuery(sql, function (rows) {
    const totalCount = rows.length > 0 ? rows[0][0].value : 0; // Total count from the first row
    const products = rows.map((columns) => ({
      id: columns[1].value,
      nombre: columns[2].value,
      codigo: columns[3].value,
      descripcion: columns[4].value,
      precio: columns[5].value,
      imagen: columns[6].value,
    }));

    res.json({ products, totalCount });
  });
});

app.get('/api/promotionCarousel', (req, res, next) => {
  executeQuery("SELECT * FROM promociones", function (rows) {
    const images = rows.map((columns) => columns[0].value);
    res.json({ images });
  });
});

app.get('/api/categories', (req, res, next) => {
  const sql = `SELECT DISTINCT categoria, subcategoria FROM productos`;

  executeQuery(sql, function (rows) {
    const categories = rows.map((columns) => ({
      categoria: columns[0].value,
      subcategoria: columns[1].value,
    }));

    res.json({ categories });
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