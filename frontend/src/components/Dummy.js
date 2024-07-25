const Dummy = ({ dummy }) => {
    return (
        <div className='dummy'>
            <p><strong>Text: </strong>{dummy.text}</p>
            <p><strong>Rank: </strong>{dummy.rank}</p>
        </div>
    )
}

export default Dummy