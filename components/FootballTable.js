import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import styled from 'styled-components/native';
import { NFTCard, HomeHeader, FocusedStatusBar,BackgroundImg,TableBody,TableHeader, SimpleHeader} from "../components";

class FootballTable extends Component {
	
	 

  render() {
		return (
			
			<ScrollView contentContainerStyle={{flexGrow: 1}} >
				<TableHeader />
				<TableBody />
			</ScrollView>
    );
  }
}

const ContainerView = styled.ScrollView`
	flex-grow: 1;
`;

export default FootballTable;