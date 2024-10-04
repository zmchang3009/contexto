// Script to check incoming word guesses
// Make use of APIs

// Return response with response code and error message
const wordChecker = async (word, existingWords, puzzleApi) => {
    // Mock HTTP response
    const responseTemplate = (ok, status, message, data) => ({
        ok: ok,
        status: status,
        message: message,
        data: data
    })

    // 1. Pre-processing (lowercase, remove whitespace, etc)
    // Remove whitespace and to lowercase
    word = word.trim().toLowerCase()
    console.log('Checking word:', word)
    
    // Check for spaces
    if (word.includes(' ')) {
        return responseTemplate(false, 400, 'Enter only one word', null)
    }
    
    // Check if word is already guessed (existingWords contains Word components)
    if (existingWords.some(w => w.text === word)) {
        return responseTemplate(false, 400, `"${word}" has already been guessed`, null)
    }


    // 2. Check if word is in the puzzle list
    const puzzleResponse = await fetch(puzzleApi.concat(word))
    const puzzleJson = await puzzleResponse.json()
    
    if (puzzleResponse.ok) {
        return responseTemplate(true, 200, 'Word recorded', puzzleJson)
    }


    // 3. Check if word is in the dictionary (stop words, etc)
    const embeddingResponse = await fetch(`/api/embedding/${word}`)
    const embeddingJson = await embeddingResponse.json()

    if (!embeddingResponse.ok) {
        return responseTemplate(false, 404, 'This word is not recognized', embeddingJson)
    } else if (embeddingJson.remark === 'stopword') {
        return responseTemplate(false, 400, 'This word is too common', embeddingJson)
    }

    
    return responseTemplate(false, 400, 'Unknown error', null)
}


export default wordChecker