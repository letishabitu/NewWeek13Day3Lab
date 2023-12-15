const React = require('react');
class Show extends React.Component {
    render () {
        const vegitable = this.props.vegitable;

        return (
            <div>
                <h1>Show Page</h1>
                <p>The {vegitable.name} is {vegitable.color}</p>
                {vegitable.readyToEat ? 'It is ready to eat' : "NOT READY!"}
            </div>

        )
    }
}

module.exports = Show;