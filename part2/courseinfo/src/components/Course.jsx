import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
    const { course } = props
    
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts.reduce((sum, parts) => sum + parts.exercises, 0)} />
        </div>
    )
}

export default Course