const { Router } = require('express'); 
const taskRouter = Router(); 
const DBmidlleware = require('../middleware/mongoConnection');
const BreadController = require('../controllers/taskBread');
const SearchController = require('../controllers/taskSearch');

const database = require('../database/accesmethod');

const sayHello = (req, res) =>{
    res.json({message: "Welcome Home"}); 
}

taskRouter.use(DBmidlleware.checkMongoReady);

taskRouter.get('/test', sayHello); 

taskRouter.get('/fulltext-search', SearchController.FulltextSearch)

taskRouter.get('/search', SearchController.QueryfieldSearch); 

taskRouter.get('/', BreadController.List); 

taskRouter.post('/new', BreadController.Create); 

taskRouter.route('/:id')
    .get(BreadController.GetOne)
    // .post()
  
module.exports = taskRouter;