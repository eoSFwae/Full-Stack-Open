import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>
const StatisticsLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = ({good,neutral,bad})=>{

    const total = good + neutral +bad

    if (total === 0){
        return <p>No Feedback Given</p>
    }

    const reviewPositive =  (good / total) * 100 +" %"
    const reviewAverage = (good + bad * -1) / total

    return (
        <>
            <table className="table">
                <tbody>
                <StatisticsLine value={good} text="Good" />
                <StatisticsLine value={neutral} text="Neutral" />
                <StatisticsLine value={bad} text="Bad" />
                <StatisticsLine value={reviewAverage} text="Average" />
                <StatisticsLine value={reviewPositive} text="positive" />
                </tbody>
            </table>
        </>
    )

}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodOnClick = ()=> setGood(prev => prev + 1)
    const neutralOnClick = ()=> setNeutral(prev => prev + 1)
    const badOnClick = ()=> setBad(prev => prev + 1)


    return (
        <div>
            <Header text="Give Feedback" />
            <Button text="Good" onClick={goodOnClick} />
            <Button text="Neutral" onClick={neutralOnClick} />
            <Button text="Bad" onClick={badOnClick} />
            <Header text ="Statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App