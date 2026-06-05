const Person = (props) => {
    return (
        <p>
            {props.name} {props.number} <button onClick={props.onClick}>delete</button>
        </p>
    )
}

const Persons = ({ data, handleDelete }) => {
    const callBackFn = (name, id) => {
        if (window.confirm(`Delete ${name}?`)) {
            handleDelete(id, name)
        }
    }

    return (
        <div>
            {data.map(person =>
                <Person
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    onClick={() => callBackFn(person.name, person.id)}
                />
            )}
        </div>
    )
}

export default Persons
