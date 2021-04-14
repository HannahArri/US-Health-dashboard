"""This class is responsible for handling all query requests to the server"""
import psycopg2
from psycopg2 import Error
from collections import defaultdict
import math
import os
class DBConn:
    def __init__(self):
        #using this dictionary to handle storage of past queries performed on the system
        self.used_queries = {}

        # connect to the database
        try:
            #start up postgresql pg_ctl -D /usr/local/var/postgres -l logfile start
            #connect to the DB with the necessary credentials
            self.conn = psycopg2.connect(
                user='cmsc828d',
                # password='a1database',
                password='',
                port='5432',
                database='a3database'
            )
            self.cursor = self.conn.cursor()

            #verify connection to the db
            print('postgresql server info')
            print(self.conn.get_dsn_parameters(), '\n')

            self.cursor.execute('SELECT version();')
            record = self.cursor.fetchone()
            print('you are connected to -', record)

        except (Exception, Error) as error:
            print('error connecting to postgres sql', error)

        # Load the data
        #comment this line out to prevent the dataset reloading on changes to the file while debugging
        self.loadData()

    def loadData(self):
        #generate 10,000,000 random tuples to be used to populate the dataset
        # os.system("python Randomizer.py input_data.csv 100000")
        
        #create  inpatients table with the necessary columns.
        try:
            table ="""
                CREATE TABLE inpatients(
                    drg_definition text,
                    provider_id numeric,
                    provider_name text,
                    provider_street_address text,
                    provider_city text,
                    provider_state text,
                    provider_zip_code numeric,
                    h_r_r_description text,
                    total_discharges text,
                    avg_covered_charges numeric,
                    avg_total_payments numeric,
                    avg_medicare_payments numeric,
                    zipcode numeric,
                    countyname text
                );
            """
            self.cursor = self.conn.cursor()
            self.cursor.execute(table)
            self.conn.commit()
        except Exception as e:
            print('error creating table', e)
    
        #load csv data into table
        try:
            with open('./output_data.csv', 'r') as f:
                # Notice that we don't need the `csv` module.
                next(f) # Skip the header row.
                # print(next(f))
                self.cursor.copy_from(f, 'inpatients', sep=',')
            self.conn.commit()
        except Exception as e:
            print('error adding data to table', e)
        

        #create index
        query = "create index mappings on inpatients (provider_state, countyname)"
        try:
            self.cursor = self.conn.cursor()
            self.cursor.execute(query)
            self.conn.commit()
        except Exception as e:
            print('error creating index', e)
    
    def get_columns(self):
        """Fetches the list of all columns of a particular table from the DB. Right now it's hardcoded for 
        the movies dataset but can easily be adjusted to take in a number of variables"""
        query = """SELECT column_name
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                    AND table_name   = 'inpatients';"""

        try:
            self.cursor = self.conn.cursor()
            self.cursor.execute(query)
            records  = self.cursor.fetchall()
            res = []
            for row in records:
                res.append(row[0])
            self.conn.commit()
            return res
        except (Exception, Error) as error:
            print('error connecting to postgres sql', error, query)
            self.conn.commit()
        return []

    def getmapdata(self, attr=None, state=None):
        """Handles the fetching the data that drives the geomap visualization on the front end"""
        if((attr,state) in self.used_queries.keys()):
            return self.used_queries[(attr,state)]

        query="""
                select SUM(inpatients.avg_covered_charges) as total_charges, inpatients.countyname, inpatients.provider_state
                from inpatients
                group by inpatients.countyname,inpatients.provider_state
                order by inpatients.provider_state
                
            """
        if attr:
            query = """
                select SUM(inpatients.{})as total_charges, inpatients.countyname, inpatients.provider_state
                from inpatients
                group by inpatients.countyname,inpatients.provider_state
                order by inpatients.provider_state
            """.format(attr)

        county_data = defaultdict(dict)
        state_data = defaultdict(dict)
        try:
            self.cursor = self.conn.cursor()
            self.cursor.execute(query)
            result = self.cursor.fetchall()
            
            for row in result:
                # data[row[4]]={
                #     'attr': float(row[0]),
                #     'state': row[1],
                #     'city': row[2],
                #     'zipcode': int(row[3]),
                #     'county': row[4]
                # }

                county_data[row[1].split(' ')[0]]={
                    'value': float(row[0]),
                    'state':row[2]
                }
                state_data[row[2]][row[1].split(' ')[0]]={
                    'value': float(row[0])
                }
            self.conn.commit()
        except Exception as e:
            print('error fetching from table', e)
            self.conn.commit()


        # get state data
        query="""
                select SUM(inpatients.avg_covered_charges) as total_charges, inpatients.provider_state
                from inpatients
                group by inpatients.provider_state
                order by inpatients.provider_state
                
            """
        if attr:
            query = """
                select SUM(inpatients.{})as total_charges, inpatients.provider_state
                from inpatients
                group by inpatients.provider_state
                order by inpatients.provider_state
            """.format(attr)

        if state:
            query="""
                select SUM(inpatients.avg_covered_charges) as total_charges, uszipcodes.countyname, inpatients.provider_state
                from inpatients, uszipcodes
				where inpatients.provider_state ='{}'
                group by uszipcodes.countyname,inpatients.provider_state
                order by inpatients.provider_state
            """.format(state)
        
        state_total_data = defaultdict(dict)
        
        try:
            self.cursor = self.conn.cursor()
            self.cursor.execute(query)
            result = self.cursor.fetchall()
            
            for row in result:
                state_total_data[row[1]]={
                    'value': float(row[0]),
                }
            self.conn.commit()
        except Exception as e:
            print('error fetching from table', e)
            self.conn.commit()
        
        res ={'counties': county_data, 'states': state_data, 'state_total':state_total_data}
        
        #add result to queries list
        self.used_queries[(attr, state)] = res
        
        return res

    def getdrgdata(self):
        """Handles the fetching the data that drives the geomap visualization on the front end"""
        query="""select distinct inpatients.drg_definition from inpatients """
        
        data = []
        
        try:
            self.cursor = self.conn.cursor()
            self.cursor.execute(query)
            result = self.cursor.fetchall()
            # print(result)
            for row in result:
                data.append(row[0])
            self.conn.commit()
            # print(data)
        except Exception as e:
            print('error fetching drg from table', e)
            self.conn.commit()
        return data

# DBConn()
# DBConn().getmapdata('avg_covered_charges', 'AZ', 'Pima County')
