class ParticleSystem {//AJ Williams 4-22-2020
	constructor(planetMesh, sunMesh){
		this.planet = planetMesh;
		this.sun = sunMesh;
		this.particleList = [];
		this.lifetimeSec = 4;
		this.speed = 150; //units per second
		this.xRand = [];//these hold amounts to travel
		this.yRand = [];
		this.zRand = [];
	}
	addParticle(particle, radius){
		this.sun.add(particle);//****put on sun instead of planet because planet is going bye bye
		particle.position.x = this.planet.position.x;
		particle.position.y = this.planet.position.y;
		particle.position.z = this.planet.position.z; //+ (radius ) * Math.cos(Math.random() * 3.14);//set to random position inside planet
		this.particleList.push(particle);
		
		
		var x = ((Math.random() - .5) * 10);//get random vector
		var y = ((Math.random() - .5) * 10);
		var z = ((Math.random() - .5) * 10);
		//normalize vector to keep a circle shape
		var n = Math.sqrt((x * x + y * y + z * z));
		this.xRand.push(x * Math.random() / n);//times random to rough the circle up a bit
		this.yRand.push(y * Math.random() / n);
		this.zRand.push(z * Math.random() / n);//Thats nice
	}
	getLifetime(){//the get method getter wasn't working well earlier
		return this.lifetimeSec;
	}
	activateParticleSystem(elapsedSec){
		//move particles for duration of lifetime frame by frame
		this.lifetimeSec -= elapsedSec;
		this.planet.position.x = 0;//don't see a way to remove objects unless they are garbage collected
		this.planet.position.z = 0;

		for( var i = 0; i < this.particleList.length; i++){//moves particles in vector direction at the selected units per second
			this.particleList[i].position.x += elapsedSec * this.speed * this.xRand[i];
			this.particleList[i].position.y += elapsedSec * this.speed * this.yRand[i];
			this.particleList[i].position.z += elapsedSec * this.speed * this.zRand[i];
		}
		if (this.lifetimeSec <= 0){//makes particles go away(into the sun)
			for( var i = 0; i < this.particleList.length; i++){
				this.particleList[i].position.x = 0;
				this.particleList[i].position.z = 0;
			}
		}
		
	}
}