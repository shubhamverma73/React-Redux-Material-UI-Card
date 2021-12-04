import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { getDataFromAPI, searechDataFromAPI } from "./actions/rocket_data";
import { useDispatch } from "react-redux";
import {
	TextField, Button, Grid, styled, Paper, CardContent,
	CardMedia, Typography, CardActionArea, Select, MenuItem, InputLabel, FormControl
} from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

function GetFormattedDate(inputFormat) {
	function pad(s) { return (s < 10) ? '0' + s : s; }
	var d = new Date(inputFormat)
	return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

function App() {

	const [startDate, setStartDate] = useState(new Date());
	const dispatch = useDispatch();
	const [library, setLibrary] = useState('Select Launch Status');

	const handleChange = (event) => {
		setLibrary(event.target.value);
	};

	let getAllData = [];
	getAllData = useSelector(state => state.getAllData);

	const rocketData = () => {
		dispatch(getDataFromAPI());
	}

	const getSearchData = (event) => {
		var dispatch_data = {
			'keyword': event.target.value,
		};
		dispatch(searechDataFromAPI(dispatch_data));
	}

	console.log(GetFormattedDate(startDate));
	console.log(library);

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Item>
						<Button variant="contained" color="primary"
							onClick={() => rocketData()}
							className="primary-btn">Load Data
						</Button>
					</Item>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Item>
						<TextField type="text" id="filled-hidden-label-small" label="Search Data" variant="outlined" size="small"
							onChange={(event) => getSearchData(event)}
						/>
					</Item>
				</Grid>
				<Grid item xs={4}>
					<Item>
						<DatePicker className="calender-field" selected={startDate} onChange={(date) => setStartDate(date)} />
					</Item>
				</Grid>
				<Grid item xs={4}>
					<Item>
						<FormControl fullWidth>
							<InputLabel>Launch Status</InputLabel>
							<Select value={library} required label="Library" onChange={handleChange} >
								<MenuItem value={"Select Launch Status"}>Select Launch Status</MenuItem>
								<MenuItem value={"Success"}>Success</MenuItem>
								<MenuItem value={"Failure"}>Failure</MenuItem>
							</Select>
						</FormControl>
					</Item>
				</Grid>
			</Grid>


			<div>
				{/* <Grid container spacing={2}>					
					<Grid item xs={3}>
						<Item>							
							<CardActionArea>
								<CardMedia
									component="img"
									height="140"
									image="https://mui.com/static/images/cards/paella.jpg"
									alt="green iguana"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										Lizard
									</Typography>
									<Typography variant="body2">
										Lizards are a widespread group of squamate reptiles, with over 6,000
										species, ranging across all continents except Antarctica
									</Typography>
								</CardContent>
							</CardActionArea>							
						</Item>
					</Grid>
				</Grid> */}

				<Grid container spacing={2}>
					{
						(getAllData) ?
							getAllData.map((launcherData, index) => (
								(launcherData.links.flickr_images[0]) ?
									<Grid item xs={3} key={index + 1}>
										<Item>
											<CardActionArea>
												<CardMedia
													component="img"
													height="140"
													image={
														(launcherData.links.flickr_images !== '' || launcherData.links.flickr_images !== undefined)
															? launcherData.links.flickr_images[0]
															: launcherData.links.mission_patch_small
													}
													alt={launcherData.rocket.rocket_id}
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="div">
														{launcherData.rocket.rocket_name} ({launcherData.launch_year})
													</Typography>
													<Typography variant="body2">
														<h2>{(launcherData.launch_success === true) ? 'Launch successful' : 'Launch failed'}</h2>
													</Typography>
												</CardContent>
											</CardActionArea>
										</Item>
									</Grid>
									: ''
							)) : 'Empty Cart Value'
					}
				</Grid>
			</div>
		</>
	);
}

export default App;
