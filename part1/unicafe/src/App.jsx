import { useState } from 'react'

const Header = ({ text }) => {
    return (
        <div>
            <h2>{text}</h2>
        </div>
    )
}

const Button = (props) => {
    return (
            <button onClick={props.onClick}>{props.text}</button>
    )
}

const StatisticLine = (props) => {
    if (props.text === 'positive') {
        return (
            <tr>
                <td>{props.text}</td>
                <td>{props.value}%</td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = ({ stats }) => {
    const all = stats.good.count + stats.neutral.count + stats.bad.count

    if (all === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    const average = (stats.good.value + stats.neutral.value + stats.bad.value)/all
    const positive = (stats.good.count*100)/all

    return (
        <div>
            <table>
                <tbody>
                    <StatisticLine text="good" value={stats.good.count} />
                    <StatisticLine text="neutral" value={stats.neutral.count} />
                    <StatisticLine text="bad" value={stats.bad.count} />
                    <StatisticLine text="all" value={all} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={positive} />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const title = 'give feedback'
    const section = 'statistics'

    //the feedback values are : good +1, neutral 0 and bad -1
    const stats = {
        good: {count: good, value: good},
        neutral: {count: neutral, value: 0},
        bad: {count: bad, value: -bad}
    }

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    return (
        <div>
            <Header text={title} />
            <Button onClick={handleGood} text="good"/>
            <Button onClick={handleNeutral} text="neutral" />
            <Button onClick={handleBad} text="bad" />
            <Header text={section} />
            <Statistics stats={stats} />
        </div>
    )
}

export default App
