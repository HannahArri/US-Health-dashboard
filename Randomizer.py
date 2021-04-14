"""This file takes in a dataset, target number of records and an output file to write to. 
It randomizes the dataset to generate x number of records written to the output file """

import sys
import random
import pandas as pd
from collections import Counter, defaultdict
import csv

# get arguments
args = sys.argv[1:]

#read in data as dataframe
data = pd.read_csv('./'+args[0])

#get distribution for each column
dist = {}
unique_values = defaultdict(list)
uv=[]
for column in data.columns:
    count = Counter(data[column])
    l = len(data[column])
    for c in count.keys():
        unique_values[column].append(c)
        dist[c] = count[c]/l

# optimizing randomization for numeric columns
for key in unique_values.keys():
    if isinstance(unique_values[key][0], str) or key in ['zipcode', 'provider_zip_code', 'provider_id']:
        continue
    row = pd.DataFrame(unique_values[key], columns=[key,])
    bins = pd.cut(row[key], bins=20)
    intervals = Counter(bins)
    unique_values[key]=[]
    for c in intervals.keys():
        unique_values[key].append(c)
        dist[c] = intervals[c]/len(bins)

#randomize dataset but maintain dist for each column
new_data = defaultdict(list)
for c in unique_values.keys():
    #generate a new dataframe containing x values for each value in the column
    row =[]
    if isinstance(unique_values[c][0], str) or c in ['zipcode', 'provider_zip_code', 'provider_id']:
        for v in unique_values[c]:
            row = pd.DataFrame(
                data=[v,],
                columns=[c,]
            ) 
            sample = row.sample(n=int(dist[v]*int(args[1])), replace=True)
            new_data[c].extend(sample[c].to_numpy())
        
        # print(dist[v], args[1], len(new_data[c]))
    else:
        for v in unique_values[c]:
            row=pd.DataFrame(
                data= [random.uniform(v.left, v.right) for i in range(100)],
                columns=[c,]
            )
            sample = row.sample(n=int(dist[v]*int(args[1])), replace=True)
            new_data[c].extend(sample[c].to_numpy())
    #ensure we have specified records   
    if len(new_data[c]) != args[1]:
        if isinstance(unique_values[c][0], str) or c in ['zipcode', 'provider_zip_code', 'provider_id']:
            #create df
            r_data = pd.DataFrame([unq for unq in unique_values[c]], columns=[c,])
            
        else:
            r_data = pd.DataFrame([random.uniform(v.left, v.right) for i in range(100)], columns=[c,])
            
        # get samples
        check =r_data.sample(
            n=int(int(args[1])-len(new_data[c])),
            replace=True
            ).to_numpy()
           
        #add to list
        for i in check:
            new_data[c].extend(
                [j for j in i]
            )
    

#write to new file
output = pd.DataFrame.from_dict(new_data)
output.to_csv('output_data.csv', index=False)
