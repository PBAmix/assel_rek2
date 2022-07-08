import React from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

const URL_API='https://jsonplaceholder.typicode.com';

class FormUser extends React.Component {

	emptyItem = {
		name: '',
		username: '',
		email: '',
		phone: '',
	};

	constructor(props) {
		super(props);
		this.state = {
			item: this.emptyItem,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {

		if (this.props.match.params.id !== 'add') {
			const user = await (await fetch(URL_API + `/users/${this.props.match.params.id}`)).json();
			this.setState({ item: user });
			console.log("MountForm--> " + JSON.stringify(user));
		}
	}
	
	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		let item = { ...this.state.item };
		item[name] = value;
		this.setState({ item });
	}
	
	async handleSubmit(e) {

		e.preventDefault();
		const {item} = this.state;
		
		await fetch(URL_API + '/users' + (item.id ? '/' + item.id : ''), {
			method: (item.id) ? 'PUT' : 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item),
		});
		// Dodać Komumikat gui o akcji dodania/update'u
		item.id ? console.log("\nSubmit Update: " + JSON.stringify(item)) : console.log("\nSubmit Add: " + JSON.stringify(item));

		this.props.history.push('/');
	}

	render() {
		const { item } = this.state;
		const formtype = <h2>{item.id ? 'Edytuj użytkownika' : 'Dodaj użytkownika'}</h2>;

		return (<div>

			<Container>
				{formtype}
				<Form onSubmit={this.handleSubmit} >
					<FormGroup>
						<Label for="name">Użytkownik</Label>
						<Input type="text" name="name" id="name" value={item.name || ''}
							onChange={this.handleChange} autoComplete="name" />
					</FormGroup>
					<FormGroup>
						<Label for="username">Login</Label>
						<Input type="text" name="username" id="username" value={item.username || ''}
							onChange={this.handleChange} autoComplete="name"   />
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input type="email" name="email" id="email" value={item.email || ''}
							onChange={this.handleChange} autoComplete="email" />
					</FormGroup>
					<FormGroup>
						<Label for="phone">Telefon</Label>
						<Input type="tel" name="phone" id="phone" value={item.phone || ''}
							onChange={this.handleChange} autoComplete="phone" />
					</FormGroup>
					<FormGroup>
						<Button color="primary" type="submit">Save</Button>{' '}
						<Button color="secondary" tag={Link} to="/">Cancel</Button>
					</FormGroup>
				</Form>
			</Container>
		</div>);
	}
}

export default FormUser;