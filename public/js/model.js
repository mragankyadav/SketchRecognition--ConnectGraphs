// Class Definitions

class Node{
	constructor(id, name, value, center, edges, visibility){
		this.id = id
		this.name = name
		this.value = value
		this.edges = edges
		this.visibility = visibility
		this.center = center
	}

	get getId() {
		return this.id
	}

	set setId(value) {
		this.id = value
	}

	get getName() {
		if(!this.name){
			this.name = "A"
		}
		return this.name
	}
	set setName(value) {
		this.name = value
	}

	get getValue() {
		return this.value
	}
	set setValue(value) {
		if(!this.value){
			this.value = 0
		}
		this.value = value
	}

	get getEdges() {
		if(!this.edges){
			this.edges = []
		}
		return this.edges
	}
	set setEdges(value) {
		this.edges = value
	}

	addEdge(value){
		this.getEdges.push(value)
	}

	get getVisibility() {
		if(!this.visibility){
			this.visibility = false
		}

		return this.visibility
	}
	set setVisibility(value) {
		this.visibility = value
	}

	get getCenter() {
		return this.center
	}
	set setCenter(value) {
		this.center = value
	}
}


class Edge{
	constructor(id, start, end, value, type, visibility){
		this.id = id
		this.start = start
		this.end = end
		this.value = value
		this.visibility = visibility
		this.type = type
	}

	get getId() {
		return this.id
	}

	set setId(value){
		this.id = value
	}

	get getStart() {
		return this.start
	}
	set setStart(value) {
		this.start = value
	}

	get getEnd() {
		return this.end
	}
	set setEnd(value) {
		this.end = value
	}

	get getValue() {
		if(!this.value){
			this.value = 0
		}
		return this.value
	}
	set setValue(value) {
		this.value = value
	}

	get getType() {
		if(!this.type){
			this.type = "undirected"
		}

		return this.type
	}
	set setType(value) {
		this.type = value
	}

	get getVisibility() {
		if(!this.visibility){
			this.visibility = false
		}

		return this.visibility
	}
	set setVisibility(value) {
		this.visibility = value
	}
}


class Figure{
	constructor(nodes, undirected, start_node, last_added){
		this.nodes = nodes
		this.undirected = undirected
		this.start_node = start_node
		this.last_added = last_added
	}

	get getNodes() {
		if(!this.nodes){
			this.nodes = []
		}
		return this.nodes
	}
	set setNodes(value) {
		this.nodes = value
	}

	addNode(value){
		this.getNodes.push(value)
	}

	get getLastAdded() {
		if(!this.last_added){
			this.last_added = []
		}
		return this.last_added
	}
	
	set setLastAdded(value) {
		this.last_added = value
	}
	
	addLastAdded(value){
		this.getLastAdded.push(value)
	}
	
	get getUndirected() {
		if(!this.undirected){
			this.undirected = []
		}
		return this.undirected
	}
	set setUndirected(value) {
		this.undirected = value
	}

	addUndirected(value){
		this.getUndirected.push(value)
	}

	get getStartNode(){
		if(!this.start_node){
			this.start_node = 0
		}
		return this.start_node
	}

	set setStartNode(value){
		this.start_node = value
	}
}