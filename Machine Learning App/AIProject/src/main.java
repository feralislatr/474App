import java.io.FileNotFoundException;
import java.util.ArrayList;


public class main {
	static final String NAME_FILE="death.names";
	static final String TRIAL_FILE="out.csv";
	static final String TEST_FILE="pen-test.csv";
	
	public static void main(String[] args) {
		try {
			TrainingSetHandler tsh = new TrainingSetHandler(NAME_FILE,TRIAL_FILE);
			//ArrayList<Data> mydata = tsh.getTrainingData();
			//double info = Methods.getInformation(mydata, tsh.getCategories());
			//System.out.println(info);
			Node n = Methods.createTree(tsh.getTrainingData(), tsh.getCategories(), tsh.featNames.length);
			//Methods.printTree(n);
			try{
				Methods.printTreeToFile(n, "tree.txt");
				Methods.PrintAnswer(n, "ryan.txt");
			}catch(Exception e){
				e.printStackTrace();
			}
			//Methods.print2LayersOfTree(n);
			//EvaluationSetHandler esh= new EvaluationSetHandler(TEST_FILE);
			//esh.testTree(n);
			//System.out.println("Right:"+esh.gotright);
			//System.out.println("Wrong:"+esh.gotwrong);
			
			//int truebenign=Methods.alwaysBenign(esh.evalData);
			//System.out.println("truebenign:"+truebenign+"; Total Entries:"+esh.evalData.size());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
