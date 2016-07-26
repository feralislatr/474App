import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;


public class TrainingSetHandler {
	int[] catNames;
	String[] featNames;
	ArrayList<Data> inputData = new ArrayList<Data>();
	public TrainingSetHandler(String nameFile, String dataFile) throws FileNotFoundException{
		File names = new File(nameFile);
		File data = new File(dataFile);
		
		Scanner nameReader = new Scanner(names);
		String line;
		line = nameReader.nextLine();
		String[]tempo = line.split(",");
		catNames = new int[tempo.length];
		for(int i =0;i<tempo.length;i++){
			catNames[i]=Integer.valueOf(tempo[i].trim());
		}
		line = nameReader.nextLine();
		featNames = line.split(",");
		
		Scanner dataReader = new Scanner(data);
		String[] temp;
		int[] tempy;
		while(dataReader.hasNextLine()){
			line = dataReader.nextLine();
			temp = line.split(",");
			tempy = new int[temp.length-1];
			for(int i =0;i<temp.length-1;i++){
				tempy[i]=Integer.valueOf(temp[i].trim());
			}
			inputData.add(new Data(tempy,Integer.valueOf(temp[temp.length-1].trim())));
		}
		
		nameReader.close();
		dataReader.close();
	}
	public ArrayList<Data> getTrainingData(){
		return inputData;
	}
	public String[] getFeatureNames(){
		return featNames;
	}
	public int[] getCategories(){
		return catNames;
	}
	
	
	
}
