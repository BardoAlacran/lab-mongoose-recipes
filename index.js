const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const firstRecipe = {
  title: `fool's meal`,
  level: 'Easy Peasy',
  ingredients: ['bread','bread'],
  cuisine: 'Global',
  dishType: 'snack',
  duration: 1,
  creator: 'Refranero español',
}


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(firstRecipe);
  })
  .then((recipeTitle)=>{
    console.log(recipeTitle.title);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
   .then((recipeList)=>{
    recipeList.forEach((recipes)=>{
      console.log(`titles: ${recipes.title}`)
    })
   })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration: 100}, {new: true, useFindAndModify: false})
    //useFindAndModify: false --> lo paso como opción porque si lo paso en global con el .set quizá me cargo algo.
  })
  .then((updatedRecipe) => {
    console.log(`Recipe ${updatedRecipe.title}: Updated Successfully.`);
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    console.log(`Recipe deleted successfully.`);
  })
  .then(() => {
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
