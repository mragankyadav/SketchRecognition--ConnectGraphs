function dfs(root, visited) {
	visited[root.getId] = true;
	var edges = root.getEdges;
	for (var i = 0;i < root.getEdges.length; i++) {
		var edge = root.getEdges[i];
		var othernode;
		if(edge.getStart.getId == root.getId)
			othernode = edge.getEnd
		else{
			othernode = edge.getStart
		}
		if (visited[othernode.getId] == false) {
			dfs(othernode, visited)
		}
	}
}

function connectedGraphs(fig) {
	var nodes = fig.getNodes;
	var edges = fig.getUndirected;
	
	Recognize(fig)
	ClearAnimation()
	
	var visited = new Array(nodes.length);
	for(var i=0;i<nodes.length;i++)
		visited[i] = false;
	var root = nodes[0];
	dfs(root, visited);
	
	var count = 0;
	for (var temp in visited) {
		if (visited[temp])
			count++;
	}
	
	if (count == nodes.length) {
		alert("connected");
		return true;
	}
	alert("not connected");
	return false;
	
}

function separateNodes(color0, color1) {
	animate(color0,0);
/* 		for (var i=0;i<color0.length;i++) {
		color0[i].strokeColor = 'yellow';
		
	} */
}

function isBipartiteUtil(nodes, edges, i, graph, colorArr, color1, color0) {
	colorArr[i] = 1;
	color1.push(nodes[i].path);
	var queue = [];
	queue.push(i);
	while (queue.length != 0) {
		var u = queue.pop();
		if (graph[u][u] == 1) {
			return false;
		}
		for (var v = 0; v< nodes.length; v++) {
			if (graph[u][v] == 1 && colorArr[v] == -1) {
				colorArr[v] = 1 - colorArr[u];
				if (colorArr[v] == 0) {
					color0.push(nodes[v].path);
				}
				else {
					color1.push(nodes[v].path);
				}
				queue.push(v);
			}
			else if (graph[u][v] == 1 && colorArr[v] == colorArr[u]) {
				return false;
			}
		}
	}
	return true;
}

function isBipartite(fig) {
	var nodes = fig.getNodes
	var edges = fig.getUndirected
	Recognize(fig)
	ClearAnimation()
	var graph = new Array(nodes.length);
	for (var i=0;i<graph.length;i++) {
		graph[i] = new Array(nodes.length);
		for (var j = 0; j< nodes.length;j++) {
			graph[i][j] = 0;
		}
	}
	for (var n = 0; n<nodes.length;n++) {
		node = nodes[n];
		for (var i = 0;i < node.getEdges.length; i++) {
			var edge = node.getEdges[i];
			var othernode;
			if(edge.getStart.getId == node.getId)
				othernode = edge.getEnd
			else{
				othernode = edge.getStart
			}
			graph[node.getId][othernode.getId] = 1;
		}
	}
	var colorArr = new Array(nodes.length);
	for (var i=0;i<colorArr.length;i++) {
		colorArr[i] = -1;
	}
	var color0 = [];
	var color1 = [];
	for (var i =0; i< nodes.length;i++) {
		if (colorArr[i] == -1) {
			var value = isBipartiteUtil(nodes, edges, i, graph, colorArr, color1, color0);
			if (value == false) {
				alert('non bipartite');
				return false;
			}
			
		}
	}
	separateNodes(color0,color1);
	alert("bipartite");
	return true;
}

function getClosestDistance(point, nodes){
	if (nodes.length == 0)
		return 500;
	var min = point.distance(nodes[0].getCenter);
	var closest = nodes[0];
	for(var i=1;i<nodes.length;i++){
		if(min > point.distance(nodes[i].getCenter)){
			min = point.distance(nodes[i].getCenter);
			closest = nodes[i];
		}
	}
	return min;
}

function getClosest(point, nodes){
	var min = point.distance(nodes[0].getCenter)
	var closest = nodes[0]
	for(var i=1;i<nodes.length;i++){
		if(min > point.distance(nodes[i].getCenter)){
			min = point.distance(nodes[i].getCenter)
			closest = nodes[i]
		}
	}
	return closest
}

function Recognize(fig){
	console.log("Num of nodes : " + fig.getNodes.length)
	console.log("Num of edges : " + fig.getUndirected.length)
	var nodes = fig.getNodes
	var edges = fig.getUndirected

	if(nodes.length == 0 || edges.length > combinations(nodes.length,2)){
		alert("Not a graph")
		return
	}
	// Clear edge-node relationship
	for(var i = 0; i < nodes.length; i++){
		nodes[i].setEdges = []
	}

	for(var i = 0; i < edges.length; i++){
		var edge = edges[i]

		var node = getClosest(edge.endpoints[0], nodes)
		edge.setStart = node
		node.addEdge(edge)

		node = getClosest(edge.endpoints[1], nodes)
		edge.setEnd = node
		node.addEdge(edge)
	}

	var matrix = new Array(nodes.length)
	for(var i = 0; i < nodes.length; i++){
		matrix[i] = new Array(nodes.length)
		for(var j = 0; j < nodes.length; j++)
			matrix[i][j] = 0
	}

	for(var i = 0; i < edges.length; i++){
		var edge = edges[i]
		
		matrix[edge.getStart.getId][edge.getEnd.getId] = 1
		//if(document.getElementById("undirectedgraph").checked){
			matrix[edge.getEnd.getId][edge.getStart.getId] = 1
	//	}
	}

	// fig.setGraphMatrix(matrix)
	console.log(JSON.stringify(matrix))
	
}

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function animate(paths,index){
// Usage!
if(index == paths.length)
		return
sleep(10).then(() => {
	// Do something after the sleep!
	paths[index].data.originalStrokeColor = paths[index].strokeColor
	paths[index].strokeColor = 'yellow'
	paths[index].data.originalStrokeWidth = paths[index].strokeWidth
	paths[index].strokeWidth = 5
	animate(paths,index+1)
});
}

function product_Range(a,b) {  
  var prd = a,i = a;  
   
  while (i++< b) {  
	prd*=i;  
  }  
  return prd;  
}  


function combinations(n, r)   
{  

  if(r>n)
	return 0;
  if (n==r)   
  {  
	return 1;  
  }   
  else   
  {  
	r=(r < n-r) ? n-r : r;  
	return product_Range(r+1, n)/product_Range(1,n-r);  
  }  
}

function isCircle(points,path){
	var BB = new srlib.core.data.container.BoundingBox(stroke);
	var radius = BB.getCenterPoint().distance(BB.getTopCenterPoint())
	var center = new srlib.core.data.container.Point( ((BB.getMaxX() + BB.getMinX()  )/2  ) ,( ( BB.getMaxY() + BB.getMinY() )/2 ) )
	var maxDeviation = 0
	var totalDeviation = 0
	var containsCenter = path.contains(center)
	var strokeLength = feature_f8(points)
	var density = strokeLength/BB.getArea()

	for(var i=0;i < points.length;i++){
		var dist = points[i].distance(center)
		var deviation = dist - radius
		totalDeviation += deviation
		if(maxDeviation < deviation)
			maxDeviation = deviation
	}

	return density<0.30 && points.length > 50 && feature_f5(points)<=25 && Math.abs(totalDeviation) < 1000 && containsCenter
}  

//Find Direction change ratio DCR value
function DCR(p){
	var maxChange = 0
	var avgChange = 0
	
	for(var i=1;i<p.length-1;i++){
		var angle = 0
		deltaxp = p[i+1].x - p[i].x;
		deltayp = p[i+1].y - p[i].y;
		deltaxp1 = p[i].x - p[i-1].x;
		deltayp1 = p[i].y - p[i-1].y;
		var1 = deltaxp * deltayp1 - deltaxp1 * deltayp;
		var2 = deltaxp * deltaxp1 + deltayp * deltayp1;
		if(var2 == 0){
			if (var1>0)
				angle = Math.atan(Infinity);
			else
				angle = Math.atan(-Infinity);
		}
		else{
			angle += Math.atan(var1 / var2);
		}
		angle = Math.abs(angle)
		avgChange += angle
		if(Math.abs(angle)>maxChange)
			maxChange = Math.abs(angle)
	}
	avgChange = avgChange/p.length

	return maxChange/avgChange
}

function isLine(points){
	return feature_f5(points)/feature_f8(points) > 0.9 && points[0].distance(points[points.length-1]) > 15
}

function isScribble(points,path){
	var BB = new srlib.core.data.container.BoundingBox(stroke)
	var strokeLength = feature_f8(points)
	var density = strokeLength/BB.getArea()
	
	var maxIntersections = 0
	var maxIntersectionComponentId = -1
	var maxInterType

	var edges = fig.getUndirected
	for(var i=0;i<edges.length;i++){
		var edge = edges[i]
		var intersections = edge.path.getIntersections(path)
		if(maxIntersections < intersections.length){
			maxIntersectionComponentId = edge.getId
			maxIntersections = intersections.length
			maxInterType = 'edge'
		}
	}

	var nodes = fig.getNodes
	for(var i=0;i<nodes.length;i++){
		var node = nodes[i]
		var intersections = node.path.getIntersections(path)
		if(maxIntersections < intersections.length){
			maxIntersectionComponentId = node.getId
			maxIntersections = intersections.length
			maxInterType = 'node'
		}
	}

	console.log("number of intersections of scribble : " + maxIntersections)
	console.log("Density of scribble " + density)

	if ((nodes.length == 0 && edges.length == 0) || density < 0.1 || maxIntersections<=2){
		return {"isScribble" : false,"componentId" : null,"type" : null} // not scribble
	}

	return {"isScribble" : true,"componentId" : maxIntersectionComponentId,"type" : maxInterType}
}

function removeEdge(edgeId){
	var edges = fig.getUndirected
	if(edgeId >= 0 && edgeId < edges.length){
		var edgeToRemove = edges[edgeId]
		edges.splice(edgeId,1)
		for(var i = edgeId;i < edges.length;i++){
			var edge = edges[i]
			edge.setId = i
			edge.text.data.edgeId = i
		}
		edgeToRemove.setId = -1
		edgeToRemove.text.remove()
		edgeToRemove.original.remove()
		edgeToRemove.path.remove()
		if(typeof edgeToRemove.arrowPath != 'undefined')
			edgeToRemove.arrowPath.remove()
		console.log(edges)
	}
}

function removeNode(nodeId){
	Recognize(fig)
	var nodes = fig.getNodes
	var nodeToRemove = nodes[nodeId]
	nodes.splice(nodeId,1)
	for(var i = nodeId;i < nodes.length;i++){
		var node = nodes[i]
		node.setId = i
		node.text.data.nodeId = i
	}

	// Remove associated edges
	var edges = nodeToRemove.getEdges
	for(var i=0;i<edges.length;i++){
		var edge = edges[i]
		removeEdge(edge.getId)
	}

	// Remove node from all dropdowns
	document.getElementById("startnodes").remove(nodeToRemove.getId)
	document.getElementById("sourcenode").remove(nodeToRemove.getId)
	document.getElementById("destnode").remove(nodeToRemove.getId)

	// Remove node,text,original
	nodeToRemove.text.remove()
	nodeToRemove.original.remove()
	nodeToRemove.path.remove()
	console.log(nodes)
}

function getNextNodeLabel(){
	var label = String.fromCharCode('A'.charCodeAt() + (fig.totalNodeCount%26))
	if(fig.totalNodeCount >= 26){
		label = 'A' + label
	}
	fig.totalNodeCount = fig.totalNodeCount + 1
	return label
}

function Original(fig){
	var nodes = fig.getNodes
	var edges = fig.getUndirected
	if(document.getElementById('original').value == "Show Original"){
		document.getElementById('original').value = "Hide Original"
		for(var i = 0; i < nodes.length; i++)
			nodes[i].original.visible = true
		for(var i = 0; i < edges.length; i++)
			edges[i].original.visible = true
	}else{
		document.getElementById('original').value = "Show Original"
		for(var i = 0; i < nodes.length; i++)
			nodes[i].original.visible = false
		for(var i = 0; i < edges.length; i++)
			edges[i].original.visible = false
	}
}

function ClearAnimation(){
	for(var i=0;i<fig.oldpaths.length;i++){
			fig.oldpaths[i].strokeColor = fig.oldpaths[i].data.originalStrokeColor
			fig.oldpaths[i].strokeWidth = fig.oldpaths[i].data.originalStrokeWidth
		}
}

function toggleMenu() {
  var menuBox = document.getElementById('menu');    
  if(menuBox.style.display == "block") { // if is menuBox displayed, hide it
	menuBox.style.display = "none"
	document.getElementById('showmenubtn').style.display = "block"
  }
  else { // if is menuBox hidden, display it
	menuBox.style.display = "block"
	document.getElementById('showmenubtn').style.display = "none"
  }
}

//For selecting the graph types
function directedGraph(fig){
	// location.reload(true)
	document.getElementById("directedgraph").checked = true;
}

function undirectedGraph(fig){
	// location.reload(true)
	document.getElementById("undirectedgraph").checked = true;
}
