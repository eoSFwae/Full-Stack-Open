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

export default Course