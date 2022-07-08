//import React from 'react';
import React, {Component} from 'react';
//import { Button, ButtonGroup, Container, Table } from 'reactstrap';
//import Table from 'react-bootstrap/Table'
//</td>onClick={() => alert('usuwam /users/'+item.id)}
//<td><a href='#' onClick={() => this.handleClick(item.id) }  key={ item.id}>del</a></td>
let zm = 1;

class ShowUsers extends Component {

	constructor(props) {
        super(props);
        this.state = {users: []};
        this.remove = this.remove.bind(this);


		this.headers = [
			{ key: 'id', label: 'ID' },
			{ key: 'name', label: 'Użytkownik' },
			{ key: 'username', label: 'Login' },
			{ key: 'email', label: 'Email' },
			{ key: 'address:city', label: 'Miejscowość' },
			{ key: 'phone', label: 'Nr telefonu' },
			{ key: 'company:name', label: 'Firma' },
			{ key: 'del', label: 'Usuń' }
		];

	}
	async remove(id) {
		await fetch(`/clients/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(() => {
			let updatedClients = [...this.state.clients].filter(i => i.id !== id);
			this.setState({clients: updatedClients});
		});
	}
	onDeleteHandle = () =>  {
		console.log("dddD");
		console.log(this.props);
		//let id = arguments[0];
		alert('usuwam');
		//this.setState({
		  /*mockData: this.state.mockData.filter(item => {
			if (item.id !== id) {
			  return item;
			}
		  })
		  */
		//});
	  }
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => {
				return response.json();
			}).then(result => {
				this.setState({
					users:result
				});
			});
	}


	

	/*
	handleClick = id => {
		const requestOptions = {
		  method: 'DELETE'
		};
			// Note: I'm using arrow functions inside the `.fetch()` method.
		// This makes it so you don't have to bind component functions like `setState`
		// to the component.
		//fetch("https://jsonplaceholder.typicode.com/users/" + userId, requestOptions).then((response) => {
		//	return response.json();
		//}).then((result) => {
		//	// do what you want with the response here
		//});
		fetch('https://jsonplaceholder.typicode.com/users/1', {
			method: 'DELETE'
		});

		alert('usuwam');
	}
	*/
	//onButtonClick = () => {
//		alert('usuwam');
//	  }
	

	//handleClick() {
	//	alert('usuwam ');
	//}
	logProps = () => {
		console.log(this.props);
		//if (x==1) 
		alert('cccc' )
	};
	
	render =() => {
		return (
			<table className="table table-striped table-hover" >
				<thead>
					<tr>
					{
						this.headers.map(function(h) {
							return (
								<th key = {h.key}>{h.label}</th>
							)
						})
					}
					<th><button onClick={this.logProps}>Log props</button></th>
					</tr>
				</thead>
				<tbody>
					{
						this.state.users.map(function(item, key) {
							
						return (
								<tr key = {key}>
								  <td>{item.id}</td>
								  <td>{item.name}</td>
								  <td>{item.username}</td>
								  <td>{item.email}</td>
								  <td>{item.address['city']}</td>
								  <td>{item.phone}</td>
								  <td>{item.company['name']}</td>
								  <td><button size="sm" color="danger" onClick={() => this.remove(item.id)}>Delete</button></td>
								  <td><a href="#" onClick={() => this.remove(item.id)}>usuń</a></td>
								</tr>
							)
						})
					}
				</tbody>
			</table>

		)
	}

	del() {
		this.setState({
		  counter: this.state.counter + 1
		})
	  }

}
/*
class DeleteRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            status: null
        };
    }

    componentDidMount() {
        // Simple DELETE request with fetch
        fetch('https://jsonplaceholder.typicode.com/users/1', { method: 'DELETE' })
            .then(() => this.setState({ status: 'Delete successful' }));
    }

    render() {
        const { status } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Simple DELETE Request</h5>
                <div className="card-body">
                    Status: {status}
                </div>
            </div>
        );
    }
}

export { DeleteRequest }; 

*/

export default ShowUsers;
