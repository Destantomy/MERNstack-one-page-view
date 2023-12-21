const express = require('express');
const workoutRoutes = require('./routes/workouts');
const connectDB = require('./database/connection');
require('dotenv').config();

// express app
const app = express();
const port = process.env.port || 3000;

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// routes
app.use('/api/workouts', workoutRoutes);

// default routes app
// app.get('/', (req, res) => {
//   res.json({msg: 'Hello-world !'});
// });

// connect to mongodb
connectDB();

// listen for requests
app.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}`);
});
