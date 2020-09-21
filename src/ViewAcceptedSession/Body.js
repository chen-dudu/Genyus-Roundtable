import React from 'react';
import {BodyWrapper} from './ViewAcceptedSession.style';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import {Card} from 'antd';

class Body extends React.Component {
	state = {
		loading: false,
	};

	onChange = checked => {
		this.setState({ loading: !checked });
	};

	render() {
		return (
			<BodyWrapper>
				<h1>Roundtable Confirmation</h1>
				<h2 style={{fontStyle:"italic"}}>Meaningful Vocation: Stroke Recovery Stories</h2>
			</BodyWrapper>


		)
	}
}

export default Body;