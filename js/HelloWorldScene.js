'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
	ViroScene,
	ViroMaterials,
	ViroAmbientLight,
	ViroBox,
	Viro3DObject,
	ViroSpotLight,
	ViroOmniLight
} from 'react-viro';

export default class HelloWorldScene extends Component {
	constructor() {
		super();

		this.state = {}; // Set initial state here
	}
	render() {
		ViroMaterials.createMaterials({
			grass: {
				lightingModel: 'Blinn',
				diffuseTexture: require('./res/grass.jpg'),
				specularTexture: require('./res/grass.jpg')
			}
		});
		return (
			<ViroScene>
				<ViroAmbientLight color="#ffffff" />

				<Viro3DObject
					source={require('./res/lowpolytree.obj')}
					materials={[ 'grass' ]}
					position={[ 2.0, 0, -2.0 ]}
					type="OBJ"
				/>
				<Viro3DObject
					source={require('./res/lowpolytree.obj')}
					materials={[ 'grass' ]}
					position={[ 3.0, 0, 0.0 ]}
					type="OBJ"
				/>
				<Viro3DObject
					source={require('./res/lowpolytree.obj')}
					materials={[ 'grass' ]}
					position={[ 4.0, 0, 2.0 ]}
					type="OBJ"
				/>
				<ViroBox height={15} length={100} width={100} position={[ 0.0, -20.0, 0.0 ]} materials={[ 'grass' ]} />
			</ViroScene>
		);
	}
}

var styles = StyleSheet.create({
	helloWorldTextStyle: {
		fontFamily: 'Arial',
		fontSize: 60,
		color: '#ffffff',
		textAlignVertical: 'center',
		textAlign: 'center'
	}
});

module.exports = HelloWorldScene;
