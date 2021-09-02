import React from 'react'

function MaterialDetails(props) {
	const {handleChange, detailClick} = props;
	const {item, count, cost} = props.state;
	
	return(
		<main>
			<form>
				<label>Item</label><br/>
					<input
						name='item'
						type='text'
						value={item}
						onChange={handleChange}
					/><br/>
				<label>Count</label><br/>
					<input
						name='count'
						type='text'
						value={count}
						onChange={handleChange}
					/><br/>
				<label>Cost</label><br/>
					<input
						name='cost'
						type='text'
						value={cost}
						onChange={handleChange}
					/><br/>
				<button
					name='material-button'
					onClick={detailClick}
				>Add</button>
			</form>
		</main>
	)
}
export default MaterialDetails
