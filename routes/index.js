// const express = require('express')
// const router = express.Router()
// const generateRecipe = require('../services/generate_recipe')

// router.get('/', function(req, res, next){
//     res.render('enter_ingredients')
// })

// router.post('/generate_recipe', function(req, res, next){
//     // TODO complete this method 
// })

// module.exports = router

const express = require('express')
const router = express.Router()

const generateRecipe = require('../services/generate_recipe')

// First page - we will build this template later
router.get('/', function(req, res) {
    res.render('enter_ingredients')
})

// Form submission route

router.post('/recipe', async function(req, res, next) {
    try {
        let ingredients = req.body.ingredients

        let recipe = await generateRecipe(ingredients)

        res.render('recipe_result', {
            title: 'Recipe Results',
            recipeName: recipe.recipeName,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            originalIngredients: ingredients
        })
    }
    catch (error) {
        next(error)
    }
})

module.exports = router


