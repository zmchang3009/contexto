// Script to check incoming word guesses
// Make use of APIs

// Return response with response code and error message
const wordChecker = async (word, puzzleApi) => {
    const responseTemplate = (ok, message, data) => ({
        ok: ok,
        message: message,
        data: data
    })

    // 1. Pre-processing (lowercase, remove whitespace, etc)


    // 2. Check if word is in the puzzle list
    const puzzleResponse = await fetch(puzzleApi)
    const puzzleJson = await puzzleResponse.json()
    if (puzzleResponse.ok) {
        return responseTemplate(true, 'Word recorded', puzzleJson)
    }

    // 3. Check if word is in the dictionary (stop words, etc)
    const embeddingResponse = await fetch(`/api/embedding/${word}`)
    const embeddingJson = await embeddingResponse.json()

    if (!embeddingResponse.ok) {
        return responseTemplate(false, 'This word is not recognized', embeddingJson)
    } else if (embeddingJson.remark === 'stopword') {
        return responseTemplate(false, 'This word is too common', embeddingJson)
    }

    return responseTemplate(false, 'Unknown error', null)
}


export default wordChecker