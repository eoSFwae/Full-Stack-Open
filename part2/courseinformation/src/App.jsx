const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
    return (
        <div>
            <Part part={props.course}/>
        </div>)
}

const Part = (props) => (
    props.part.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
)

const Total = (props) => {
    return (<p>Number of exercises {
        // props.course.map((course)=> course.exercises)
        //     .reduce((total, exercise)=> total + exercise, 0)
        props.course.reduce((total, part) => total + part.exercises, 0)
    }</p>)

}

const Course = (props)=> {

    return (
        props.course.map(course =>(
            <div key={course.id}>
                <Header course={course.name} />
                <Content course={course.parts} />
                <Total course={course.parts} />
            </div>
        ))

    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]



    return <Course course={courses} />
}

export default App