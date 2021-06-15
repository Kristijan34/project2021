import React, {useState, useEffect} from 'react';
import '../App.css';
import MaterialTable from 'material-table';
import api from '../utils/utils';
import Iframe from 'react-iframe';
//import PopUp from '../components/PopUp';

function Leads() {
	const handleRowDelete = (oldData) => {
		api.delete('/leads/' + oldData.id, {
			// headers: {
			//   Authorization: `Bearer ${localStorage.getItem("token")}`,
			// },
		})
			.then((res) => {
				const dataDelete = [...data];
				const index = oldData.tableData.id;
				dataDelete.splice(index, 1);
				setData([...dataDelete]);
			})
			.catch((error) => {});
	};

	const [data, setData] = useState([]);
	const [countries, setCountries] = useState([]);
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [openPopup, setOpenPopup] = useState(false);

	const columns = [
		{title: 'ID', field: 'id', editable: 'never'},

		{
			title: 'Name',
			field: 'name',
			validate: (rowData) =>
				rowData.name === undefined
					? {isValid: false, helperText: 'Name cannot be empty'}
					: rowData.name === ''
					? {isValid: false, helperText: 'Name cannot be empty'}
					: true,
		},
		{
			title: 'Email',
			field: 'email',
			validate: (rowData) =>
				rowData.email === undefined
					? {isValid: false, helperText: 'Please enter your email'}
					: rowData.email === ''
					? {isValid: false, helperText: 'Please enter your email'}
					: true,
		},
		{title: 'Phone', field: 'phone'},
		{title: 'Country', field: 'country_id', lookup: countries},
		{title: 'Created', field: 'created'},
		{title: 'Assign to', field: 'user_id'},
		{
			title: 'Qualified',
			field: 'qualified',
			editable: 'never',
			render: (row) => (
				<div className={row.id % 2 === 0 ? 'ispolnal' : 'neispolnal'}>
					{row.id % 2 === 0 ? 'Ispolnal Uslov' : 'Ne ispolnal uslov '}
				</div>
			),
		},
		{title: 'Status', field: 'status'},
		{title: 'Assign to', field: 'user_id'},
		{title: 'Comment', field: 'comment'},
		{title: 'Attachments', field: 'attachments'},
	];
	useEffect(() => {
		fetchCountries();
		fetchUsers();
		fetch('http://djakov.pythonanywhere.com/leads')
			.then((resp) => resp.json())
			.then((resp) => {
				setData(resp);
			});
	}, []);

	const fetchCountries = () => {
		setIsLoading(true);
		api.get('/countries')
			.then((res) => {
				const countriesObject = {};
				res.data.map((country) => {
					const {id, name} = country;
					countriesObject[id] = name;
				});
				setCountries(countriesObject);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
			});
	};

	const fetchUsers = () => {
		setIsLoading(true);
		api.get('/users')
			.then((res) => {
				const usersObject = {};
				res.data.map((users) => {
					const {id, name} = users;
					usersObject[id] = name;
				});
				setUsers(usersObject);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
			});
	};

	//   const openInPopup = item => {
	//     setRecordForEdit(item)
	//     setOpenPopup(true)
	// }

	return (
		<div className="App">
			<h1 align="center">Table</h1>
			<MaterialTable
				title="Employee Data"
				data={data}
				columns={columns}
				isLoading={isLoading}
				options={{
					actionsColumnIndex: -1,
					exportButton: true,
					search: true,
					sorting: true,
					draggable: true,
					grouping: true,
					selection: true,
					rowStyle: {
						backgroundColor: '#EEE',
						height: 20,
						maxHeight: 20,
						padding: 0,
					},
					headerStyle: {
						backgroundColor: '#039be5',
						whiteSpace: 'nowrap',
						height: 20,
						maxHeight: 20,
						padding: 0,
					},

					// selectionProps: rowData => ({
					//   disabled: rowData.id === 2,
					//   color: 'primary'
					// })
				}}
				detailPanel={(rowData) => {
					return (
						<Iframe
							width="100%"
							height="315"
							src="https://www.youtube.com/embed/C0DPdy98e4c"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						/>
					);
				}}
				onRowClick={(event, rowData, togglePanel) => {
					setOpenPopup(true);
					setRecordForEdit(rowData);
				}}
				editable={{
					isEditable: (row) => row.id % 2 === 0,

					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const dataUpdate = [...data];
								const index = oldData.tableData.id;
								dataUpdate[index] = newData;
								setData([...dataUpdate]);

								resolve();
							}, 1000);
						}),

					//    onRowDelete: oldData =>
					//     new Promise((resolve, r\ eject) => {handleRowDelete(oldData, resolve)
					//       //  setTimeout(() => {
					//       //    const dataDelete = [...data];
					//       // const index = oldData.tableData.id;
					//       //  dataDelete.splice(index, 1);
					//       //  setData([...dataDelete]);

					//       //   resolve()
					//       // }, 1000)
					//     }),
				}}
				actions={[
					{
						tooltip: 'Remove All Selected Users',
						icon: 'delete',
						onClick: (evt, data) => {
							handleRowDelete(data);
							console.log(data);
						},
					},
				]}
			/>
		</div>
	);
}

export default Leads;
