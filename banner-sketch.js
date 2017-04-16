var s = function( p ) {

  var img;
  var particles = [];
  var numParticles = 200;
  var pixDensity;
  var i=0;

  p.setup = function() {
    var canvas = p.createCanvas(p.select('#banner-sketch').width, p.select('#banner-sketch').width);
    canvas.parent('banner-sketch');
    // console.log(img.width * img.height);
    //numParticles = int(img.width * img.height / 800);
    //imageMode(CENTER);
    img = p.loadImage('../images/portrait.jpg', function(img) {
      img.resize(p.width,0);
      img.loadPixels();
      pixDensity = p.pixelDensity();
    });
    
    p.noStroke();
    //colorMode(HSB,100);
    for (var k=0; k<numParticles; k++) {
      particles[k] = new Particle();
    }

    p.frameRate(15); // Limit framerate for cross-device consistency

  }

  p.draw = function() {
    if (i >= numParticles/2) {
      for (var k=0; k<numParticles; k++) {
        particles[k] = new Particle();
      }
      i = 0;
    } else if (pixDensity != null) {
      var x1 = particles[i].x;
      var y1 = particles[i].y;
      //background(255);
      for (var j=i+1; j<numParticles; j++) {
        var x2 = particles[j].x;
        var y2 = particles[j].y;
        //particles[j].move();
        for (var k=j+1; k<numParticles; k++) {
          var x3 = particles[k].x;
          var y3 = particles[k].y;
          //particles[k].move();
          if (i!=j && i!=k && j!=k) {
            // Check if particles are nearby and draw triangle if they are
            var d = (p.width+p.height)/20; //width/6;
            if (p.dist(x1,y1,x2,y2)<d && p.dist(x1,y1,x3,y3)<d && p.dist(x2,y2,x3,y3)<d) {
              var aveX = (x1+x2+x3)/3;
              var aveY = (y1+y2+y3)/3;

              var c = img.get(aveX,aveY);
              p.fill(c[0],c[1],c[2],128);
              //stroke(255);
              //strokeWeight(0.5);
              p.triangle(x1,y1,x2,y2,x3,y3);  
            } 
          }

        }
      }  
    }
    i++;
  }

  function Particle(index) {
    this.x = p.random(p.width);
    this.y = p.random(p.height);
    this.velX = p.random(-2,2);
    this.velY = p.random(-2,2);
    this.diameter = 5;
    
    p.colorMode(p.HSB,100);
    this.c = p.color(0, 10, 70); 
    p.colorMode(p.RGB,255);

    this.display = function() {
      //var pix = img.get(this.x, this.y);
      //fill(pix, 128);
      p.fill(this.c, 128);
      p.ellipse(this.x, this.y, this.diameter, this.diameter);
    }

  }
}

var myp5 = new p5(s);
