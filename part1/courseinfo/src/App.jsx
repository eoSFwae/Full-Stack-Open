const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    const Header = (props)=> {
        return <h1>{props.course.name}</h1>
    }
    const Part = (props)=> {
        return <p>{props.part} {props.exercise}</p>
    }

    const Total = (props)=> {
        const {parts} = props.parts
        return (
            <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    )
    }

    const Content = (props)=> {
        console.log(props)
        const {parts} = props.parts
        return (
            <>
            <Part part={parts[0].name} exercise={parts[0].exercises} />
            <Part part={parts[1].name} exercise={parts[1].exercises} />
            <Part part={parts[2].name} exercise={parts[2].exercises} />
            </>
        )
    }


    return (
        <div>
            <Header course={course}/>
            <Content parts={course}/>
            <Total parts={course}/>
        </div>
    )
}

export default App