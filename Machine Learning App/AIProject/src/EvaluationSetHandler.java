import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;


public class EvaluationSetHandler {
	ArrayList<Data> evalData;
	int gotright;
	int gotwrong;
	public EvaluationSetHandler(String fileName) throws FileNotFoundException{
		gotright = 0;
		gotwrong = 0;
		File data = new File(fileName);
		Scanner reader = new Scanner(data);
		String line;
		String[] temp;
		int[] tempy;
		evalData = new ArrayList<Data>();
		while(reader.hasNextLine()){
			line = reader.nextLine();
			temp = line.split(",");
			tempy = new int[temp.length-1];
			for(int i =0;i<temp.length-1;i++){
				tempy[i]=Integer.valueOf(temp[i].trim());
			}
			evalData.add(new Data(tempy,Integer.valueOf(temp[temp.length-1].trim())));
		}
		reader.close();
	}
	
	public void testTree(Node n){
		for(Data d:evalData){
			testEntryInTree(n,d);
		}
	}
	
	private void testEntryInTree(Node n, Data d){
		if(n.isGoal()){
			if(n.goalCategory()==d.getCategory()){
				//celebrate
				gotright++;
			}else{
				//aww
				gotwrong++;
			}
			return;
		}
		int feature = n.getFeature();
		double splitval = n.getSplitVal();
		if(d.getFeatures()[feature]<=splitval){
			testEntryInTree(n.getChildOne(),d);
		}else{
			testEntryInTree(n.getChildTwo(),d);
		}
	}
}
