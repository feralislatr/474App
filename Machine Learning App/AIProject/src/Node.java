import java.util.ArrayList;


public class Node {
	private Node[] children;
	private int feature;
	private double splitvalue;
	private boolean goalnode;
	private int category;
	
	public Node(int feature, double splitvalue){
		this.splitvalue = splitvalue;
		this.feature = feature;
		children = new Node[2];
		goalnode = false;
	}
	
	public Node(int category){
		goalnode = true;
		this.category = category;
	}
	public void setChildOne(Node n){
		children[0]=n;
	}
	public void setChildTwo(Node n){
		children[1]=n;
	}
	public boolean isGoal(){
		return goalnode;
	}
	public int goalCategory(){
		return category;
	}
	public int getFeature(){
		return feature;
	}
	public double getSplitVal(){
		return splitvalue;
	}
	public Node getChildOne(){
		return children[0];
	}
	public Node getChildTwo(){
		return children[1];
	}
}
