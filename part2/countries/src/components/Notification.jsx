const Notification = ({ error }) => {
    if (error !== null) {
        return (
            <div className="error">
                {error}
            </div>
        )
    }

    return null
}

export default Notification
