import { useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const Day = (props) => {
    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{props.anecdote}</p>
            <p>has {props.vote} votes</p>
        </div>
    )
}

const Popular = (props) => {
    let indexMost = 0
    let mostVote = 0

    for (let i = 0; i < 8; i++) {
        if (props.votes[i] > mostVote) {
            indexMost = i
            mostVote = props.votes[i]
        }
    }

    return (
        <div>
            <h2>Anecdote with most votes</h2>
            <p>{props.anecdotes[indexMost]}</p>
            <p>has {mostVote} votes</p>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(8).fill(0))

    const handleNext = () => {
        const index = Math.floor(Math.random()*8)

        //To prevent selecting the same anecdote twice in a row
        if (index === selected) {
            setSelected((index+1)%8)
        } else {
            setSelected(index)
        }
    }

    const handleVote = () => {
        const copy = [...votes]
        copy[selected]++

        setVotes(copy)
    }

    return (
        <div>
            <Day anecdote={anecdotes[selected]} vote={votes[selected]} />
            <Button onClick={handleVote} text="vote" />
            <Button onClick={handleNext} text="next anecdote" />
            <Popular anecdotes={anecdotes} votes={votes} />
        </div>
    )
}

export default App
