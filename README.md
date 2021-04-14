## US-Health-dashboard
# Introduction
This dashboard provides information on the cost of health care treatment for the top 100 diagnoes. The data spans the 51 states in the
united sates and can be futher broken down by the counties within each state. The data was sourced from Kaggle https://www.kaggle.com/speedoheck/inpatient-hospital-charges
and is publicly available on https://www.data.gov/.

# Running the application
**Note:** To run this application you will need python and postgresql installed on your machine. 
Additionally, you will need to install the following python packages using pip:
- Flask
- psycog2
For the dataset, you will need to have a user called cmsc828d created and a database called a3database. You can replace these values with your default settings
within the db_connection.py file

Once this is complete, navigate to the project directory on your local system within the terminal and run python3 Routes.py.
The project will need to generate 10000000 records and populate the database which may take a few minutes. 

Once this is complete, open your browser and use this url to access the dashboard http://127.0.0.1:8000/

#Tasks
You will be allowed to explore the interface for a few minutes. Once complete, please click on start and proceed to answer the questions. When you are done with the tasks, you will be redirected to a google form to complete a short survey.

**Please upload the user_logs.txt file from the root folder through the google form. **
