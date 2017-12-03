	// helper functions
	function findDistance(pt1, pt2) {
		return Math.sqrt((pt1["x"] - pt2["x"])*(pt1["x"] - pt2["x"]) + (pt1["y"] - pt2["y"])*(pt1["y"] - pt2["y"]));
	}
	
	function findAngle(pt1, pt2, pt3) {
		var y = (pt3["x"] - pt2["x"])*(pt2["y"] - pt1["y"]) - (pt2["x"] - pt1["x"])*(pt3["y"] - pt2["y"]);
		var x = (pt3["x"] - pt2["x"])*(pt2["x"] - pt1["x"]) + (pt3["y"] - pt2["y"])*(pt2["y"] - pt1["y"]);
		return Math.atan2(y, x);
	}
	
	//Start and EndPoint distance
	function feature_f5(p){
		var pt1 = p[0];
		var pt2 = p[p.length - 1];
		return findDistance(pt1, pt2);
	}

	//Stroke Length
	function feature_f8(sketch){
		var dist = 0;
		for (var i = 1; i < sketch.length; i++)
		{
			dist = dist + findDistance(sketch[i - 1], sketch[i]);
		}
		return dist;
	}
	
// Need to check accuracy
	function feature_f9(sketch){
		var ang = 0;
		for (var i = 2; i < sketch.length; i++)
		{
			ang = ang + findAngle(sketch[i - 2], sketch[i - 1], sketch[i]);
		}
		return ang;
	}	

