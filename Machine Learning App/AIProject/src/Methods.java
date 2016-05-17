import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;
import java.util.Map.Entry;
import com.mongodb.*;



public class Methods {
	
	public static double getInformation(ArrayList<Data> myData, int[] catNames){
		double info = 0;
		if(myData.size()<=1){return 0;}
		for(int i = 0; i < catNames.length; i++) {
			int count = 0;
			for(Data curdata:myData) {
				if(curdata.getCategory() == catNames[i]){count++;}
			}
			double prob = (double) count / (double) myData.size();
			if(prob==0){continue;}
			info += -prob * (Math.log(prob) / Math.log(2));
		}
		return info;
	}
	public static double getGain(double currentInfo, int feature, ArrayList<Data> myData, int[] catNames, double splitValue){
		ArrayList<Integer> possibleValues=findPossibleValues(feature,myData);
		//double splitValue = findSplitValue(possibleValues);
		if(splitValue<0){return 0;};
		double infoX = 0;
		
		ArrayList<Data> Ti = new ArrayList<Data>();
		for(int j = 0;j<myData.size();j++){
			if(myData.get(j).getFeatures()[feature]<=splitValue){
				Ti.add(myData.get(j));
			}
		}
		infoX += ((double)Ti.size()/(double)myData.size()) * getInformation(Ti,catNames);
		Ti = new ArrayList<Data>();
		for(int j = 0;j<myData.size();j++){
			if(myData.get(j).getFeatures()[feature]>splitValue){
				Ti.add(myData.get(j));
			}
		}
		infoX += ((double)Ti.size()/(double)myData.size()) * getInformation(Ti,catNames);
		return (currentInfo-infoX);
		
	}

	public static ArrayList<Integer> findPossibleValues(int feature,ArrayList<Data> myData){
			class MyIntegerComparator implements Comparator<Integer>{ 
				@Override
				public int compare(Integer one, Integer two) {
					return one-two;
				}
			}
			ArrayList<Integer> possibleValues=new ArrayList<Integer>();
			for(Data curdata:myData){
				if(!possibleValues.contains(curdata.getFeatures()[feature])){possibleValues.add(curdata.getFeatures()[feature]);}
			}
			possibleValues.sort(new MyIntegerComparator());
			return possibleValues;
	}
	public static double findSplitValue(ArrayList<Integer> possibleValues, double currentInfo, int feature, ArrayList<Data> myData, int[] catNames){
		if(possibleValues.size()<2){
			return -1;
		}else{
			double maxval = -1;
			double maxindex=-1;
			double temp;
			for(int i =0;i<possibleValues.size();i++){
				temp = getGain(currentInfo, feature, myData, catNames,possibleValues.get(i));
				if(temp >maxval){
					maxval = temp;
					maxindex = possibleValues.get(i);
				}
			}
			return maxindex;
		}
	}
	
	public static int getMajorityVote(ArrayList<Data> myData, int[] categories){
		HashMap<Integer,Integer> votes= new HashMap<Integer,Integer>();
		for(Data d: myData){
			int vote = d.getCategory();
			if(votes.containsKey(vote)){
				votes.put(vote, votes.get(vote)+1);
			}else{
				votes.put(vote, 1);
			}
		}
		Iterator<Entry<Integer,Integer>> iter = votes.entrySet().iterator();
		int maxvotes = -1;
		int winningCat = -1;
		while(iter.hasNext()){
			Entry<Integer, Integer> cur =  iter.next();
			if(cur.getValue()>maxvotes){
				maxvotes = cur.getValue();
				winningCat = cur.getKey();
			}
		}
		return winningCat;
		
	}
	
	public static Node createTree(ArrayList<Data> myData, int[] categories, int numFeatures){
		double max=-1;
		int maxfeature =-1;
		double currentInfo = getInformation(myData, categories);
		for(int i = 0;i<numFeatures;i++){
			double splitval = findSplitValue(findPossibleValues(i,myData),currentInfo, i, myData, categories);
			double temp = getGain(currentInfo, i, myData, categories,splitval);
			if(temp>max){
				max = temp;
				maxfeature = i;
			}
		}
		double splitval = findSplitValue(findPossibleValues(maxfeature,myData),currentInfo, maxfeature, myData, categories);
		if(splitval<0){
			int cat = getMajorityVote(myData,categories);
			Node newNode = new Node(cat);
			return newNode;
		}
		Node newNode = new Node(maxfeature, splitval);
		ArrayList<Data> data1 = new ArrayList<Data>();
		ArrayList<Data> data2 = new ArrayList<Data>();
		
		for(Data d:myData){
			if(d.getFeatures()[maxfeature]<=splitval){
				data1.add(d);
			}else{
				data2.add(d);
			}
		}
		if(getInformation(data1,categories)==0){
			int cat = getMajorityVote(data1,categories);
			newNode.setChildOne(new Node(cat));
		}else{
			newNode.setChildOne(createTree(data1,categories,numFeatures));
		}
		if(getInformation(data2,categories)==0){
			int cat = getMajorityVote(data2,categories);
			newNode.setChildTwo(new Node(cat));
		}else{
			//System.out.println(getInformation(data2,categories));
			newNode.setChildTwo(createTree(data2,categories,numFeatures));
		}
		return newNode;
	}
	
	public static void printTree(Node n){
		if(n.isGoal()){
			System.out.println("Category:"+n.goalCategory());
		}else{
			System.out.println("Node:"+n.getFeature()+":"+n.getSplitVal());
			printTree(n.getChildOne());
			printTree(n.getChildTwo());
		}
		
	}
	
	public static void printTreeToFile(Node n, String f) throws IOException{
		File file = new File(f);
		OutputStreamWriter os = new OutputStreamWriter(new FileOutputStream(file));
		if(n.isGoal()){
			os.write("Category:"+n.goalCategory());
			os.write("\n");
		}else{
			os.write("Node:"+n.getFeature()+":"+n.getSplitVal());
			os.write("\n");
			printFileHelper(n.getChildOne(), os, 1);
			printFileHelper(n.getChildTwo(), os, 1);
		}
		os.flush();
		os.close();
	}
	private static void printFileHelper(Node n, OutputStreamWriter os, int tabs) throws IOException{
		for(int i = 0; i<tabs;i++){
			os.write("   ");
		}
		if(n.isGoal()){
			os.write("Category:"+n.goalCategory());
			os.write("\n");
		}else{
			os.write("Node:"+n.getFeature()+":"+n.getSplitVal());
			os.write("\n");
			printFileHelper(n.getChildOne(), os, tabs+1);
			printFileHelper(n.getChildTwo(), os, tabs+1);
		}
	}
	
	public static void PrintTreeToMongoDB(Node n) throws UnknownHostException{
		MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
		DB db = mongoClient.getDB( "deathTree" );
		DBCollection col = db.getCollection("tree");
		DFS(n, col);
	}
	static int counter=0;
	private static int DFS(Node n, DBCollection db ){
		if(n.isGoal()){
			int curcounter = counter;
			counter++;
			BasicDBObject doc = new BasicDBObject("_id", curcounter)
			        .append("feature", n.getFeature())
			        .append("splitvalue", n.getSplitVal())
			        .append("goal", n.isGoal())
					.append("lchild", -1)
					.append("rchild", -1)
					.append("goalcategory", n.goalCategory());
			db.insert(doc);
			return curcounter;
		}else{
			int curcounter = counter;
			counter++;
			BasicDBObject doc = new BasicDBObject("_id", curcounter)
			        .append("feature", n.getFeature())
			        .append("splitvalue", n.getSplitVal())
			        .append("goal", n.isGoal())
					.append("lchild",DFS(n.getChildOne(), db))
					.append("rchild",DFS(n.getChildTwo(), db))
					.append("goalcategory", -1);
			db.insert(doc);
			return curcounter;
		}
	}
	
	private static void PrintAnswerHelper(Node n, Data d){
		if(n.isGoal()){
			switch (n.goalCategory()){
			case 1:
				System.out.println("Accident");
				break;
			case 2:
				System.out.println("Suicide");
				break;
			case 3:
				System.out.println("Homicide");
				break;
			case 4:
				System.out.println("Pending Investigation");
				break;
			case 5:
				System.out.println("Could not determine");
				break;
			case 6:
				System.out.println("Self-Inflicted");
				break;
			case 7:
				System.out.println("Natural");
				break;
			}
			return;
		}
		int feature = n.getFeature();
		double splitval = n.getSplitVal();
		if(d.getFeatures()[feature]<=splitval){
			PrintAnswerHelper(n.getChildOne(),d);
		}else{
			PrintAnswerHelper(n.getChildTwo(),d);
		}
	}
	
	public static void PrintAnswer(Node n, String fileName) throws FileNotFoundException{
		File data = new File(fileName);
		Scanner reader = new Scanner(data);
		String line;
		String[] temp;
		int[] tempy;
		ArrayList<Data>evalData = new ArrayList<Data>();
		while(reader.hasNextLine()){
			line = reader.nextLine();
			temp = line.split(",");
			tempy = new int[temp.length];
			for(int i =0;i<temp.length;i++){
				tempy[i]=Integer.valueOf(temp[i].trim());
			}
			evalData.add(new Data(tempy, 0));
		}
		reader.close();
		PrintAnswerHelper(n, evalData.get(0));
	}
	
	public static int alwaysBenign(ArrayList<Data> data){
		int counter = 0;
		for(Data d: data){
			if(d.getCategory()==2){counter++;}
		}
		return counter;
	}
	
	
	public static void print2LayersOfTree(Node n){
		
			System.out.println("Node:"+n.getFeature()+":"+n.getSplitVal());
			System.out.println("Child1:"+n.getChildOne().getFeature()+":"+n.getChildOne().getSplitVal());
			System.out.println("Child2:"+n.getChildTwo().getFeature()+":"+n.getChildTwo().getSplitVal());
		
		
	}
	
	
}
