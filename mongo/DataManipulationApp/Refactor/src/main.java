import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Scanner;

public class main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try{
			File file = new File("/Users/briannaslater/Desktop/death/out.csv");
			OutputStreamWriter os = new OutputStreamWriter(new FileOutputStream(file));
			File names = new File("/Users/briannaslater/Desktop/death/DeathRecords.csv");
			Scanner nameReader = new Scanner(names);
			String line;
			int linenum = 0;
			line = nameReader.nextLine();
			while(nameReader.hasNextLine()&&linenum<10000){
				linenum++;
				line = nameReader.nextLine();
				String[]tempo = line.split(",");
				ArrayList<String> tempo2 = new ArrayList<String>(); 
				/*
				for(int i =0;i<tempo.length-1;i++){
					if(i<19){
						if(i ==2){
							if(tempo[4]=="0"){
								tempo2.add(tempo[2]);
							}else{
								tempo2.add(tempo[3]);
							}
							i =5;
						}else{
							tempo2.add(tempo[i]);
						}
						
					}else{
						tempo2.add(tempo[i+1]);
					}
				}
				*/
				
				if(tempo[4].equals("0")){
					tempo2.add(tempo[2]);
				}else{
					tempo2.add(tempo[3]);
				}
				tempo2.add(tempo[5]);
				if(tempo[6].equals("M")){
					tempo2.add("0");
				}else{
					tempo2.add("1");
				}
				if(tempo[7].equals("2")){
					tempo2.add(String.valueOf((Integer.valueOf(tempo[8])/12)));
				}else{
					tempo2.add(tempo[8]);
				}
				
				if(tempo[15].equals("M")||tempo[15].equals("D")||tempo[15].equals("W")){
					tempo2.add("0");
				}else if(tempo[15].equals("S")){
					tempo2.add("1");
				}
				
				tempo2.add(tempo[35]);
				
				tempo2.add(tempo[19]);
				for(int i = 0; i<tempo2.size();i++){
					if(i!=tempo2.size()-1){
						os.write(tempo2.get(i)+",");
					}else{
						os.write(tempo2.get(i));
					}
				}
				os.write("\n");
			}
		
			os.flush();
			os.close();
			nameReader.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}

}
