'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
	ViroScene,
	ViroText,
	ViroSkyBox,
	ViroBox,
	ViroMaterials,
	ViroAmbientLight,
	ViroAnimations,
	ViroCamera,
	Viro3DObject,
	ViroNode
} from 'react-viro';

export default class HelloWorldScene extends Component {
	constructor() {
		super();

		this.state = {}; // Set initial state here
	}

	render() {
		var positionTreeRight = [];
		var positionTreeLeft = [];
		for (let index = 0; index < 100; index++) {
			positionTreeRight.push([ 10 + Math.random() * 100, -4, Math.random() * 200 ]);
			positionTreeLeft.push([ -10 - Math.random() * 100, -4, Math.random() * 200 ]);
		}

		return (
			<ViroScene>
				<ViroCamera position={[ 0, 0, 0 ]} active={true} />
				<ViroNode position={[ 0, 7, -200 ]} animation={{ name: 'loopRotateSlow', run: true, loop: true }}>
					{positionTreeRight.map(function(positionTreeRight, index) {
						return (
							<Viro3DObject
								source={require('./res/lowpolytree.obj')}
								key={index}
								resources={[ require('./res/lowpolytree.mtl') ]}
								position={positionTreeRight}
								scale={[ 5, 5, 5 ]}
								type="OBJ"
							/>
						);
					})}

					{positionTreeLeft.map(function(positionTreeLeft, index) {
						return (
							<Viro3DObject
								source={require('./res/lowpolytree.obj')}
								key={index}
								resources={[ require('./res/lowpolytree.mtl') ]}
								position={positionTreeLeft}
								scale={[ 5, 5, 5 ]}
								type="OBJ"
							/>
						);
					})}
				</ViroNode>
				<ViroSkyBox color="#add8e6" />
				<ViroAmbientLight color="#FFFFFF" intensity={3000} />
				<ViroBox position={[ 0, -5, -50 ]} scale={[ 200, 0.5, 200 ]} materials={[ 'grid' ]} />
				<ViroBox
					position={[ 0, -4.5, -200 ]}
					scale={[ 10, 0.5, 200 ]}
					materials={[ 'road' ]}
					animation={{ name: 'loopRotate', run: true, loop: true }}
				/>
				<ViroBox
					position={[ 0, -4.5, -400 ]}
					scale={[ 10, 0.5, 200 ]}
					materials={[ 'road' ]}
					animation={{ name: 'loopRotate', run: true, loop: true }}
				/>
			</ViroScene>
		);
	}

	_onAnimationFinished() {
		console.log('Animation has finished!');
	}
}

var styles = StyleSheet.create({
	helloWorldTextStyle: {
		fontFamily: 'Roboto',
		fontSize: 20,
		color: '#ffffff',
		textAlignVertical: 'center',
		textAlign: 'center'
	}
});

ViroMaterials.createMaterials({
	grid: {
		diffuseTexture: require('./res/grass.jpg')
	},
	road: {
		diffuseTexture: require('./res/road.jpg')
	}
});

ViroAnimations.registerAnimations({
	loopRotate: { properties: { positionZ: '+=1' }, duration: 300 },
	loopRotateSlow: { properties: { positionZ: '+=1' }, duration: 300 }
});

module.exports = HelloWorldScene;
