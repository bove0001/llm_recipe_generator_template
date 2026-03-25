const { GoogleGenAI } = require('@google/genai')

const genAI = new GoogleGenAI({
    apiKey: 'AIzaSyDh2Jy-pRkHIIEYR55H9p8TT_ylAxSAW8I'
})


const Type = {
    OBJECT: 'object',
    STRING: 'string',
    ARRAY: 'array'
}

async function generateRecipe(userInput) {
    //let prompt = `Write a recipe that uses the following ingredients: ${userInput}`
    let prompt = `${userInput}`
    console.log('About to call Gemini...')
    console.log('User input:', userInput)

    let response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: `You are a recipe suggestion bot for a health-conscious, budget-friendly website. Suggest recipes that are easy to make, use the provided ingredients, and are suitable for a family of four. Include a list of ingredients and step-by-step instructions. Avoid using any additional ingredients that are not listed in the user input.`,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recipeName: {
                        type: Type.STRING,
                        description: 'The name of the recipe'
                    },
                    ingredients: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    },
                    instructions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                },
                required: ['recipeName', 'ingredients', 'instructions']
            }
        }
    })

    console.log('Raw response object:', response)
    console.log('Raw response text:', response.text)

    if (!response.text) {
        throw new Error('Gemini returned no text')
    }

    let recipe = JSON.parse(response.text)
    console.log('Parsed recipe:', recipe)

    return recipe
}

module.exports = generateRecipe