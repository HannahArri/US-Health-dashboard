# Project Writeup

## Set Up Instructions
1. Install Psycog2 by typing _Italic pip install psycopg2_
2. Run the application using _Italic python Routes.py_
3. Open http://localhost:8000/ in the browser to view the dashboard

## Set Up Instructions Radomizer
To run the randomizer file use the following command in the shell
**python Randomizer.py <-input file name-> <-size of dataset->**
e.g to run randomizer on teh input_data.csv file to create 10000 data points, i would type **Ranomizer.py input_data.csv 1000*

## How does the visualization work?</h4>

The geomap is the primay visualization with a group of buttons through which the user could select what attrubtes they are interested in exploring (default is average covered charges).
Once an attribute is selected, the visualization and updates, a user can hover over every county to see the individual value. The supplementary bar chart will display the aggregate
value for all states in the US. Users can zoom into a specific state to view data for a specific state. The bar chart will update to show the data for that specific state by county.
Both visualizations can be reset by clicking on the reset button. To switch the geomap from a state level encoding to county level encoding, use the dropdown on the top right of the 
page.
    
## Design Rationale Visualization
    
For my dashboard, I used a dataset sourced from kaggle on hosiptal charges in over 3000 hospitals in the US. 
The data shows the cost of inpatient care for the top 100 diagnosis related groups. As this dataset contains geographical information, 
I felt it would be important to encode the geographical data in a manner that it will be easy for users to uderstand hence the choice to use a geographical map
as the primary visualization. 

One of the designs I originally considered was a geomap at the state level of granularity and on zoom the visualization would display the county data for that state.
This design however was not possible as due to D3 complications it was hard to implement such behaviour. I settled on creating the geomap at the county level of granularity.
For the supplementary visualization, I considered creating a scatter plot to display the current attribute a user is viewing, state/county and the correlation with another attribute
of the users choice. This form of ecoding allows the visualizaton to adhere to **Tufte's principles** of graphical excellence as we are present several layers of data in a
reasonable amount of space to revel information to the user. However this visualization was poorly designed. Even though it encoded more information, it was not an effective visualization as it doesn't do a good job of 
telling the user anything about the data. As such I settled on using a stacked bar chart of the current attribute a user was viewing.

In order to decide what color pallete to use while encoding attributes in the visualization, I applied principles from the results of 
**Szafir et. al. work (Modeling color difference for visualization design)** and selected YlOrRd color pallete.
This will allow users to discriminate what colors they are viewing. To ensure that users would not have issues understanding the magnitude of the values
represented using the colors, I used binned the currently viewed attribute and used a sequential scale to represent the color in line with recommendations from 
**Silvia et.al. Using Color in Visualization: A survey**.

## Design Rationale Server & DBMS Randomizer
The randomizer for this tool takes in a csv file and a target number of rows. It generates a repeats tuples from the original dataset for each attribute while maintaing the original
distribution of the dataset. The new dataset is written to an output_data.csv file which can then be used to populate a dataset

## Design Rationale Server & DBMS Optimization
To optimize my backend of the system, my first intution was to reuse the results of past queries to limit how often I had to send requests to the database. Since the data I am fetching
is static and serializability is not a criteria I have to ensure **Garcia-Molina in Database Systems the complete Handbook (Chapter 6)**, it makes sense to re use past results since the results will be exactly the same all the time. However, this optimization 
alone would not be sufficient. To improve the system performance further, I also explored using data cubes a technique used by **Liu & Heer in imMens: Real‐time Visual Querying of Big Data** to represent the data on multiple dimensions to enable fast querying. However, I had a lot of difficulty implementing and conceptualizing this structure. I instead used indexes as described by **Garcia-Molina in Database Systems the complete Handbook (Chapter 8)** on my table. I created a new index called mapping that indexes based on the state and then the county for the inpatients table. This was chosen because these two attributes are used most frequently as groupings and filters in my visualization. This way when querying for data for a particular state or county, the data would by using these indexes. 

I would like to highlight that due to the way I structured my queries from A2, the data groupings and filtering are performed in one query. In this way I am able to fetch most of the data I need from the database and only make new query requests when I am visualizing a new attribute ( I believe this counts as batching queries together). 



## Development Process
Over the course of 2 weeks, I developed this dashboard using python, flask, JS and D3. The entire development process took upwards of 10 hours with the bulk of that time spent on 
figuring out the right way to optimize my data fetching. 

## Designs considered
* Sub [TheMapSmith](http://bl.ocks.org/TheMapSmith/bd3ef04e33483e671601c753856273cb)
* Sub [D3 Choropleth](https://observablehq.com/@d3/choropleth)
* Sub [Michelle Chandra](http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922)
* Sub[MBostock Example](https://gist.github.com/mbostock/4108203)

