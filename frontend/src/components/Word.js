// Word component

const Word = ({ word }) => {
    return (
        <div className='word'>
            <p><strong>Word: </strong>{word.text}</p>
            <p><strong>Rank: </strong>{word.rank}</p>
        </div>
    )
}


export default Word