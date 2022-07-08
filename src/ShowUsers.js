import React, {Component,useMemo} from 'react';
import { Button, Table, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

const URL_API='https://jsonplaceholder.typicode.com';

class ShowUsers extends Component {
	constructor(props) {
		super(props);

		this.state = {
				users: [],
				sortedCol: [],
				filters: {}
		};
		
		this.headers = [
			{ key: 'id', label: 'ID' },
			{ key: 'name', label: 'Użytkownik' },
			{ key: 'username', label: 'Login' },
			{ key: 'email', label: 'Email' },
			{ key: 'address:city', label: 'Miejscowość' },
			{ key: 'phone', label: 'Nr telefonu' },
			{ key: 'company:name', label: 'Firma' }
		];
	}

	componentDidMount() {

		fetch(URL_API + '/users?sort_by=name.asc')
			.then(response => { return response.json();})
			.then(result => {
				let count = result.length;
				this.setState({
					users:result
				});
				//console.log("\n\nMount--> " + JSON.stringify(result)+"\n");
			});
	}

	async remove(id) {
		await fetch(URL_API + `/users/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(() => {
			let updatedUsers = [...this.state.users].filter(i => i.id !== id);
			//Czemu na poniższym logu, usuwanie kolejnych użytkowników miesza w tablicy i się sypie ??
			// "this.state.users[id-1]['name']" zmienia listę (?)
			  //console.log("Został usunięty użytkownik: '" + this.state.users[id-1]['name'] + "' o  ID: " + id);
			console.log("Został usunięty użytkownik  o ID: " + id);
			this.setState({users: updatedUsers});
		});
	}

	handleSearch = (value, col) => {

		//TODO! 

		if (value) {
			this.setState({
				filters: {col: value,}
			})
		}
			
	}
	
	isEmpty(obj = {}) {
		return Object.keys(obj).length === 0
	  }
	  
	 isString(value) {
		return typeof value === 'string' || value instanceof String
	  }
	  
	 isNumber(value) {
		return typeof value == 'number' && !isNaN(value)
	  }
	  
	 isBoolean(value) {
		return value === true || value === false
	  }
	  
	 isNil(value) {
		return typeof value === 'undefined' || value === null
	  }

	 toLower(value) {
		if (this.isString(value)) {
		  return value.toLowerCase()
		}
		return value
	  }

	filterRows(rows, filters) {
		//console.log("filtr="+filters + " ROWS: "+rows );

		if (this.isEmpty(filters)) return rows
		

		return rows.filter((row) => {
		  return Object.keys(filters).every((accessor) => {
			const value = row[accessor]
			const searchValue = filters[accessor]
	  
			if (this.isString(value)) {
			  return this.toLower(value).includes(this.toLower(searchValue))
			}
	  
			if (this.isBoolean(value)) {
			  return (searchValue === 'true' && value) || (searchValue === 'false' && !value)
			}
	  
			if (this.isNumber(value)) {
			  return value == searchValue
			}
	  
			return false
		  })
		})
	  }

	sortActivate =  (col) => {
		this.setState({
			sortedCol: [col,0]
		});
	}

	requestSort = (key) => {
		let dir = 'asc';
		if (
		  this.state.sortedCol &&	
		  this.state.sortedCol[0] === key &&
		  this.state.sortedCol[1] === 'asc'
		) {
		  dir = 'desc';
		}

		this.setState({
			sortedCol: [key,dir]
		});
	  };
	

	  
	render() {
	
		const {users} = this.state;
		const {filters} = this.state;
		const filteredRows = this.filterRows(users, filters);
		
		///   SORTOWANIE  ////
		if (this.state.sortedCol.col !== null) {
			users.sort((a, b) => {
				if (a[this.state.sortedCol[0]] < b[this.state.sortedCol[0]]) {
					return this.state.sortedCol[1] === 'asc' ? -1 : 1;
				}
				if (a[this.state.sortedCol[0]] > b[this.state.sortedCol[0]]) {
					return this.state.sortedCol[1] === 'asc' ? 1 : -1;
				}
				return 0;
			});
		}

		const userItems = users.map(item => {
			return <tr key={item.id}>
						<td>{item.id}</td>
						<td>{item.name}</td>
						<td>{item.username}</td>
						<td>{item.email}</td>
						<td>{item.address['city']}</td>
						<td>{item.phone}</td>
						<td>{item.company['name']}</td>
						<td><Button size="sm" color="secondary" onClick={() => this.remove(item.id)}>Usuń</Button></td>
						<td><Button size="sm" color="primary"  tag={Link}  to={"/user/" + item.id}>Edit</Button></td>
				</tr>
		});

		return (
				<div>
					<h4>Użytkownicy z <a href={URL_API} rel='noopener' target='_blank'  >{URL_API}</a></h4>
					<div>
						<Table  responsive  className="table table-striped table-hover " >
							<thead>
								<tr>
								{
									this.headers.map(h =>  {
										return (
											<th key = {h.key}>
												<Input
													key={`${h.key}-search`}
													type="search"
													placeholder={`Szukaj: ${h.label}`}
													value={this.state.filters[h.key]}
													onChange={(event) => this.handleSearch(event.target.value, h.key)}
												/>
												<Label  onClick={() => this.requestSort(h.key)}>{h.label}</Label>
											</th>
										)
									})
								}
								</tr>
							</thead>
							<tbody>{userItems}</tbody>
						</Table>
					</div>	
					<div className="float-right">
						<Button color="success" tag={Link} to="/user/add">Dodaj nowego użytkownika</Button>
					</div>
				</div>
				);
	}
}
export default ShowUsers;