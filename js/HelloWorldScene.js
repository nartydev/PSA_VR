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
	ViroNode,
	ViroParticleEmitter,
	Viro360Image
} from 'react-viro';

export default class HelloWorldScene extends Component {
	constructor(props) {
		super(props);

		this.state = {
			positionRoad: [ 0, 0, 0 ]
		};

		this.intensity = 3000; // default light level.

		this.positionTreeRight = [];
		this.positionTreeLeft = [];
		this.loop = () => {
			requestAnimationFrame(this.loop);
		};
		this.loop();
	}

	componentWillMount() {
		for (let index = 0; index < 100; index++) {
			this.positionTreeRight.push([ 10 + Math.random() * 100, 5, -Math.random() * 600 ]);
			this.positionTreeLeft.push([ -10 - Math.random() * 100, 5, -Math.random() * 600 ]);
		}
		return fetch('http://api.openweathermap.org/data/2.5/weather?q=Paris&APPID=39c3420f3fd6e4cdce13dcf3c1c1d7a0') // Call the fetch function passing the url of the API as a parameter
			.then(function(res) {
				// Your code for handling the data you get from the API
				console.warn(res);
				console.warn('coucou');
			})
			.catch(function() {
				// This is where you run code if the server returns any errors
				console.warn('hello');
			});
	}

	render() {
		return (
			<ViroScene>
				<ViroCamera position={[ 0, 0, 0 ]} active={true} />
				<ViroNode position={[ 0, 0, 0 ]} animation={{ name: 'loopRotateSlow', run: true, loop: true }}>
					{this.positionTreeRight.map(function(positionTreeRight, index) {
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

					{this.positionTreeLeft.map(function(positionTreeLeft, index) {
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
					<ViroBox position={this.state.positionRoad} scale={[ 200, 0.5, 200 ]} materials={[ 'grid' ]} />
					<ViroBox position={[ 0, -5, -200 ]} scale={[ 200, 0.5, 200 ]} materials={[ 'grid' ]} />
					<ViroBox position={[ 0, -5, -400 ]} scale={[ 200, 0.5, 200 ]} materials={[ 'grid' ]} />
					<ViroBox position={[ 0, -5, -600 ]} scale={[ 200, 0.5, 200 ]} materials={[ 'grid' ]} />
					<ViroBox position={[ 0, -5, -800 ]} scale={[ 200, 0.5, 200 ]} materials={[ 'grid' ]} />
					<ViroBox position={[ 0, -4.5, 0 ]} scale={[ 10, 0.5, 200 ]} materials={[ 'road' ]} />
					<ViroBox position={[ 0, -4.5, -200 ]} scale={[ 10, 0.5, 200 ]} materials={[ 'road' ]} />
					<ViroBox position={[ 0, -4.5, -400 ]} scale={[ 10, 0.5, 200 ]} materials={[ 'road' ]} />
					<ViroBox position={[ 0, -4.5, -600 ]} scale={[ 10, 0.5, 200 ]} materials={[ 'road' ]} />
				</ViroNode>
				<ViroSkyBox color="#add8e6" />
				<ViroAmbientLight color="#FFFFFF" intensity={this.intensity} />

				<ViroParticleEmitter
					position={[ 0, 4.5, 0 ]}
					duration={2000}
					visible={true}
					delay={0}
					run={true}
					loop={true}
					fixedToEmitter={true}
					image={{
						source: require('./res/rain.png'),
						height: 0.1,
						width: 0.1,
						bloomThreshold: 1.0
					}}
					spawnBehavior={{
						particleLifetime: [ 4000, 4000 ],
						emissionRatePerSecond: [ 150, 200 ],
						spawnVolume: {
							shape: 'box',
							params: [ 20, 1, 20 ],
							spawnOnSurface: false
						},
						maxParticles: 2000
					}}
					particlePhysics={{
						velocity: {
							initialRange: [ [ 0, -0.5, 0 ], [ 0, -3.5, 0 ] ]
						},
						acceleration: {
							initialRange: [ [ 0, -9.98, 0 ], [ 0, -9.98, 0 ] ]
						}
					}}
				/>
			</ViroScene>
		);
	}

	_onAnimationFinished() {
		console.log('Animation has finished!');
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
	loopRotate: { properties: { positionZ: '+=3' }, duration: 300 },
	loopRotateSlow: { properties: { positionZ: '+=6' }, duration: 300 }
});

module.exports = HelloWorldScene;
