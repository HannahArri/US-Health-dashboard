import csv
from db_connection import DBConn 
import json
from flask import Flask,request,Response,render_template


app = Flask(__name__)

db = DBConn()

@app.route('/')
def renderPage():
  """returns the main page used to run the application"""
  return render_template("index.html")

@app.route('/start')
def evaluationPage():
  """returns the main page used to run the application"""
  return render_template("evaluation.html")

@app.route('/fetchgeodata', methods=['POST', 'GET'])
def fetchGeoData():
  """recieves request from the server with details of the desired data. Interacts with the DBConn class to 
  retrieve data from the DB"""
  if request.method =="POST":
    result = {}
    if request.get_json():
      post_requests = request.get_json()
      print(post_requests)
      result = db.getmapdata(post_requests['attr'])  
  return result

@app.route('/fetchdrgdata', methods=['POST', 'GET'])
def fetchStateData():
  """recieves request from the server with details of the desired data. Interacts with the DBConn class to 
  retrieve data from the DB"""
  if request.method =="POST":
    result = {}
    if request.get_json():
      post_requests = request.get_json()
      print(post_requests)
      result = db.getdrgdata()  
  return {'data':result}

@app.route('/fetchtabledata', methods=['POST', 'GET'])
def fetchColumnData():
  """recieves request from the server with details of the desired data. Interacts with the DBConn class to 
  retrieve data from the DB"""
  if request.method =="GET":  
    return {'data':db.get_columns()  }
  return{}


@app.route('/logger', methods=['POST', 'OPTIONS'])
def logs():
    if request.method =="POST" or request.method =="OPTIONS":
        data = request.get_json()
        if data:
            with open("user_logs.txt", 'a') as file:
                file.write(str(data)+'\n')
    resp= Response('sucessful', status=200)
    return resp

'''
FOR A1 THE SERVER MUST:
1) connect to a local version of psycopg2 with user 'cmsc828d' and database 'a1database'
2) only fetch data from postgresql (you cannot just work with the raw data file using this server.py file)
3) only return aggregated data (you cannot just return the full dataset from postgresql to index.html)
4) The data must be filtered and aggregated using postgresql. This means you have to compute the bins and bin counts using postgresql.
Note: it is fine if you decide to calculate the bins outside of postgresql. But the extrema of the dataset (minimum, maximum) and actual bin counts must be calculated using postgresql.
'''

if __name__ == "__main__":
  app.run(debug=True,port=8000)
