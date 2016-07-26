
public class Data {
	private int[] features;
	private int category;
	public Data(int[] features, int category){
		this.features = features;
		this.category = category;
	}
	
	public int[] getFeatures(){
		return features;
	}
	public int getCategory(){
		return category;
	}
	
	public String toString(){
		String featurestring = "";
		for(int i = 0; i<features.length;i++){featurestring = featurestring +features[i]+", ";}
		return "Category: "+category+"; Features: "+ featurestring ;
	}
}
