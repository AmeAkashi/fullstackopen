const Person = (props) => {
    return (
        <p>{props.name} {props.number}</p>
    )
}

const Persons = ({ data }) => {
    return (
        <div>
            {data.map(person => <Person key={person.id} name={person.name} number={person.number} />)}
        </div>
    )
}

export default Persons
