import React, { useState, useEffect } from "react";
import Cardlist from "../components/Cardlist";
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";
import './App.css';

function App() {
	// without hooks
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		robots: [],
	// 		searchfield: ''
	// 	}
	// }

	// with hooks
	const [robots, setRobots] = useState([])
	const [searchfield, setSearchfield] = useState('')
	const [count, setCount] = useState(0)

	// without hooks
	// componentDidMount() {
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// 		.then(response => response.json())
	// 		.then(users => this.setState({ robots: users }));
	// }

	// with hooks
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => { setRobots(users) });
		console.log(count)
		// run useEffect only when app is rendered
	}, [count]) // only run if count changes.

	const onSearchChange = (event) => {
		setSearchfield(event.target.value)
	}
	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})
	return !robots.length ?
		<h1>Loading</h1> :
		(
			<div className="tc">
				<h1 className="f2">RoboFriends</h1>
				<button onClick={() => setCount(count + 1)}>Click Me!</button>
				<SearchBox searchChange={onSearchChange} />
				<Scroll>
					<ErrorBoundry>
						<Cardlist robots={filteredRobots} />
					</ErrorBoundry>
				</Scroll>
			</div>
		);
}


export default App;