class myPlanet {//AJ Williams 4-22-2020
	constructor(planetMesh, sunMesh){
		this.sunMesh = sunMesh;//reference to the sun
		this.mesh = planetMesh;//reference to this planet's mesh
		this.distance = 0;//from sun
		this.velocity = 0;//from sun- both set later
		this.moonList = [];//holds orbiting objects
		this.moonDistanceList = [];//holds each orbiting object's distance from planet-important for orbit formula
    	this.angle = 0;//increments to orbit planet around sun
		this.moonAngle = 0;//same but for moon --> planet
		this.persList = [];//an offset for the y dimension.
		this.sidewaysList = [];//objects that orbit Uranus. decided not to do any moons after Jupiter
		this.ringList = [];//if object is a ring- doesnt orbit- more of a bound thing
		this.offsetList = [];//makes moon orbit more interesting, they arent all at the same angle location
		this.yModList = [];//lets orbits vary in y dimension
		this.destroyed = false;//is the planet destroyed?
	}
	get planetMesh(){
		return this.mesh;
	}

  	set planetMesh(input){
    	this.mesh = input;
  	}
	
  	get distanceFromSun(){
    	return this.distance;
  	}
	set distanceFromSun(dist){
		this.distance = dist;
    	this.mesh.position.x = dist;//needed to update the actual mesh position
	}
	
	set angularVelocity(vel){//degrees per second
		this.velocity = vel;
	}
	
	setPositionX(number){
		this.mesh.position.x = number;
	}
	getDestroyed(){
		return this.destroyed;
	}
	setDestroyed(tf){
		this.destroyed = tf;
	}

	getMoon(){
		return this.moonList[0];
	}
	//collects details about what is being bound to the planet
	addMoon(moonMesh, distance, radius, pers, sideways, ring, off, yMod){
		this.persList.push(pers);
		this.mesh.add(moonMesh);
		this.moonList.push(moonMesh);
		moonMesh.position.x = distance + radius;
		if(!sideways){
			moonMesh.rotation.x = -0.5 * Math.PI;
		}
		else{
			moonMesh.rotation.y = -0.4 * Math.PI;
		}
		var mid = distance + radius;
		this.moonDistanceList.push(mid);
		this.sidewaysList.push(sideways);
		this.ringList.push(ring);
		this.offsetList.push(off);
		this.yModList.push(yMod);
	}
	//called frame by frame to orbit planets AND moons
	orbitFrame(elapsedSec){
    	this.angle += this.velocity * elapsedSec / 5;
		this.mesh.position.x = this.distance * Math.sin(this.angle);
		this.mesh.position.z = this.distance * Math.cos(this.angle);
		this.moonAngle += this.velocity * elapsedSec;
		for(var i = 0; i < this.moonList.length; i++){
			if(!this.sidewaysList[i]){
				this.moonList[i].position.x = this.moonDistanceList[i] * Math.sin(this.moonAngle + this.offsetList[i]);
				this.moonList[i].position.z = this.moonDistanceList[i] * Math.cos(this.moonAngle + this.offsetList[i]);
				if(this.persList[i] != 0){
					this.moonList[i].position.y = this.moonDistanceList[i] * Math.cos(this.moonAngle+ this.offsetList[i]) / this.persList[i] * this.yModList[i];
				}
			}
			else{
				if(this.persList[i] != 0){
					this.moonList[i].position.x = this.moonDistanceList[i] * Math.sin(this.moonAngle+ this.offsetList[i]) / this.persList[i] * this.yModList[i];
				}
				this.moonList[i].position.z = this.moonDistanceList[i] * Math.cos(this.moonAngle + this.offsetList[i]);
				this.moonList[i].position.y = this.moonDistanceList[i] * Math.cos(this.moonAngle + this.offsetList[i]);
			}
		}
		
	}
	//called frame by frame to keep moons orbiting when inspecting a planet
	orbitMoon(elapsedSec){
		this.moonAngle += 0.01;
		//this.moonList[0].position.x = 30 * Math.sin(this.moonAngle);
		for(var i = 0; i < this.moonList.length; i++){
			if(!this.sidewaysList[i] || !this.ringList[i]){
				this.moonList[i].position.x = this.moonDistanceList[i] * Math.sin(this.moonAngle + this.offsetList[i]);
				this.moonList[i].position.z = this.moonDistanceList[i] * Math.cos(this.moonAngle + this.offsetList[i]);
				if(this.persList[i] != 0){
					this.moonList[i].position.y = this.moonDistanceList[i] * Math.cos(this.moonAngle+ this.offsetList[i]) / this.persList[i] * this.yModList[i];
				}
			}
			else if(!this.ringList[i]){
				if(this.persList[i] != 0){
					this.moonList[i].position.x = this.moonDistanceList[i] * Math.sin(this.moonAngle+ this.offsetList[i]) / this.persList[i] * this.yModList[i];
				}
				this.moonList[i].position.z = this.moonDistanceList[i] * Math.cos(this.moonAngle + this.offsetList[i]);
				this.moonList[i].position.y = this.moonDistanceList[i] * Math.cos(this.moonAngle + this.offsetList[i]);
			}
		}
	}
	
}