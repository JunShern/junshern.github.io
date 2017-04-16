---
layout: post
title: Explorables
---

<div id="sketch" style="width:100%;height:250px;"></div>
<script>
function setup() {
	var canvas = createCanvas(select('#sketch').width, select('#sketch').height);
	canvas.parent('sketch');
	fill(0);
}
function draw() {
	background(255);
	ellipse(50,50,100,100);
	ellipse(mouseX,mouseY,100,100);
}
</script>

