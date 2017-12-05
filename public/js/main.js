var mouseMovepath = new Path.Circle({
    center: [0, 0],
    radius: 5,
    fillColor: 'yellow'
});

function onMouseDown(event) {
	// PaperJS add a new Path object and initial starting point
	path = new Path();
	path.strokeColor = 'black';
	path.strokeWidth = 2;
	path.add(event.point);
	
	// SRLlib add a new Stroke object and initial starting point
	stroke = new srlib.core.data.container.Stroke();
	point = new srlib.core.data.container.Point(event.point.x,event.point.y)
	if (typeof sketch == "undefined") {
		sketch = new srlib.core.data.container.Sketch();
	}
	sketch.addStroke(stroke);
	sketch.addPoint(point);
	stroke.addPoint(point);
}

function onMouseDrag(event) {
	// PaperJS add points to Path object on mouse drag
	path.add(event.point);
	mouseMovepath.position = event.point;
	// SRLlib add points to Stroke on mouse drag
	point = new srlib.core.data.container.Point(event.point.x,event.point.y)
	sketch.addPoint(point);
	stroke.addPoint(point);
}

function onMouseMove(event) {
	// Whenever the user moves the mouse, move the path
    // to that position:
	mouseMovepath.position = event.point;
}


function onMouseUp(event) {	
	
	// Add evaluation / recognition functions or whatever you want here!
	var points = stroke.getPoints()
	
	// Scribble detection
	min1 = getClosestDistance(points[0], fig.getNodes);
	min2 = getClosestDistance(points[points.length-1], fig.getNodes);
	if(isCircle(points,path)){
		var BB = new srlib.core.data.container.BoundingBox(stroke);
		var center = new Point( ((BB.getMaxX() + BB.getMinX()  )/2  ) ,( ( BB.getMaxY() + BB.getMinY() )/2 ) )
		var myCircle = new Path.Circle(center, 25);
		myCircle.strokeColor = 'red';
		path.visible = false;

		// <!-- Update model -->
		var node  = new Node(fig.getNodes.length)
		node.setCenter = new srlib.core.data.container.Point(center.x,center.y)
		node.path = myCircle
		node.original = path

// <!-- Add node name -->
		var text = new PointText(center);
		text.fillColor = 'black';
		text.fontSize = 12
		text.justification = 'center'
		node.setName = 	getNextNodeLabel()
		text.content = node.getName
		text.data.nodeId = node.getId

		// Associate node with text
		node.text = text

// <!-- Add node to figure -->
		fig.addNode(node) 
		fig.addLastAdded("node");
	}
	// <!-- Line -->
	else if(isLine(points)){
		var myLine = new Path.Line(points[0],points[points.length-1])
		myLine.strokeColor = 'blue';
		path.visible = false;

		// <!-- Update model -->
		var edge = new Edge(fig.getUndirected.length)
		edge.endpoints = []
		edge.endpoints.push(points[0])
		edge.endpoints.push(points[points.length-1])
		edge.path = myLine
		edge.isDirectedEdge = false
		edge.original = path
		fig.addUndirected(edge)
		fig.addLastAdded("edge");

		// <!-- Edge weight -->
		var center = new Point ((points[0].getX()+points[points.length-1].getX())/2, (points[0].getY()+points[points.length-1].getY())/2)
	}
	
	else if(min1 <=30 && min2 <= 30)
	{
		try{
		var myLine = new Path.Arc(points[0],points[points.length/2], points[points.length-1])
		myLine.strokeColor = 'blue';
		path.visible = false;

		// <!-- Update model -->
		var edge = new Edge(fig.getUndirected.length)
		edge.endpoints = []
		edge.endpoints.push(points[0])
		edge.endpoints.push(points[points.length-1])
		edge.path = myLine
		edge.isDirectedEdge = false
		edge.original = path
		fig.addUndirected(edge)
		fig.addLastAdded("edge");

		// <!-- Edge weight -->
		var center = new Point ((points[0].getX()+points[points.length-1].getX())/2, (points[0].getY()+points[points.length-1].getY())/2)		
		}
		catch(err)
		{
			path.removeSegments();
		}
	}
	// <!-- Not recognized -->
	else{
		path.removeSegments()
	}
}
