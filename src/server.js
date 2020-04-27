import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config';
import linearEquations from './linear-equations';

const app = express();
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const store = {
  streets: [],
};

app.get('/', (req, res) => {
  try {
    res.status(200).send(`Welcome to the Libera Nearest Street Finder
                            \n Add streets in the form:
                            \n {
                              \nname: string
                              \nstart: [x,y]
                              \nend: [x,y]
                            \n}.
                            \n To find the closest street to a point:
                            \n POST to /closest/[x,y]`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/street', (req, res) => {
  try {
    const street = req.body;
    // Using simple validation (this can be moved to a middleware)
    if (street && street.name && street.start && street.end) {
      store.streets.push(street);
      res.send(`Street ${JSON.stringify(street)} has been added. 
              \nStreet List: ${JSON.stringify(store.streets)}`);
    } else {
      res
        .status(401)
        .send('Bad request, please ensure street is in the proper JSON format');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/closest/:point', (req, res) => {
  try {
    const { point } = req.params;
    const closestStreets = linearEquations.calculateClosestStreets(
      point,
      store.streets
    );

    if (closestStreets) {
      res.status(200).send(closestStreets);
    } else {
      res.status(404).send('Could not find any streets close to that point');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(config.port, config.host, () => {
  console.info(`Running on ${config.host}:${config.port}...`);
});
