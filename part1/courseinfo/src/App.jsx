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
  return (
    <div>
      <Header course={course} />
      <Content content={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({content}) => {
  return (
    <div>
      <Part part={content[0]} />
      <Part part={content[1]} />
      <Part part={content[2]} />
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({total}) => {
  return (
    <p>Number of exercises {total[0].exercises + total[1].exercises + total[2].exercises}</p>
  )
}



export default App