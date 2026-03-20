const Persons = ({filter, erase}) => {
    
    return (
        <div>
            {filter.map(person => <p key={person.id}>{person.name} {person.number} <button value={person.id} onClick={erase}>delete</button></p> )}
        </div>
    )
}

export default Persons