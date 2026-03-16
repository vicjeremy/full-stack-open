import Part from './Part'

const Content = (props) => {
  const {parts} = props
  return (
  <div>
    {parts.map(parts =>
       <Part key={parts.id} part={parts} />
    )}
  </div>
  )
}

export default Content

