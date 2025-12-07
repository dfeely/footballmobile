import React, { Component } from 'react';
import styled from 'styled-components/native';

const TableHeader = () => {

		return (
		
			<StyledView>
				<InfoText>Pos</InfoText>
				<TeamLogo/>
				<TeamText>Team</TeamText>
				<InfoText>PL</InfoText>
				<InfoText>W</InfoText>
				<InfoText>D</InfoText>
				<InfoText>L</InfoText>
				<InfoText>GD</InfoText>
				<InfoText>PTS</InfoText>
			</StyledView>
    );
  }

const StyledView = styled.View`
	display: flex;
	flex-direction: row;
	border-bottom-color: rgb(241, 241, 241);
	border-bottom-width: 1px;
	border-style: solid;
	padding: 2px;
`;

const InfoText = styled.Text`
  color: rgb(62, 69, 74);
	font-size: 12px;
	flex: 1;
	font-family: 'InterRegular';
`;

const TeamText = styled.Text`
  color: rgb(62, 69, 74);
	font-size: 12px;
	flex: 5;
	font-family: 'InterRegular';
`;

const TeamLogo = styled.Text`
	width: 20px;
	height: 20px;
	margin-right: 10px;
`;

export default TableHeader;
