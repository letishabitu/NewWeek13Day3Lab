const React = require('react');

class Index extends React.Component {
    render() {
        const { vegitables } = this.props;
        // const fruits = this.props.fruits;

        return (
            <div>
                <h1>Vegitables Index Page</h1>
                <nav>
                    <a href="/vegitables/new">Create a New vegitable</a>
                </nav>
                <ul>
                    {vegitables.map((vegitable, i) => {
                        return (
                            <li>
                                The {' '}
                                <a href={`/vegitables/${vegitable._id}`}>
                                    {vegitable.name}
                                </a> {' '}
                                is {vegitable.color} <br></br>
                                {vegitable.readyToEat
                                ? `It is ready to eat`
                            :   `It is NOT ready to eat`}
                            <br />
                            </li>
                        )
                    })

                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index;