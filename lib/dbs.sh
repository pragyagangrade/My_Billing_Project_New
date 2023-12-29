#!/bin/bash

# Specify the path to your .dbf file
dbf_file_path='/home/kabir/Desktop/dbf file calller /27042023111045_148014470R77.dbf'
upload_folder='upload'

# Create the new upload folder if it doesn't exist
if [ ! -d "$upload_folder" ]; then
    mkdir "$upload_folder"
fi

# Check if the file exists
if [ -f "$dbf_file_path" ]; then
    # Run the Python script and capture the output
    python3 - <<EOF
from dbfread import DBF
import csv
from datetime import date
import json
import os

# Custom encoder to handle date objects
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.isoformat()
        return super().default(obj)

def read_dbf_file(dbf_file_path):
    # Open the DBF file
    table = DBF(dbf_file_path)

    # Create a list to store records
    records = []

    # Print each record in the DBF file
    for record in table:
        record_dict = {}
        for field_name, value in record.items():
            record_dict[field_name] = value
        records.append(record_dict)

    return records

# Call the function with the specified file path
records = read_dbf_file('$dbf_file_path')

# Convert records to CSV format
csv_output = ''
if records:
    # Extract header from the first record
    header = list(records[0].keys())
    
    # Convert records to CSV string
    csv_output += ','.join(header) + '\n'
    for record in records:
        csv_output += ','.join(str(record[field]) for field in header) + '\n'

# Save the CSV data to a file in the upload folder
csv_file_path = os.path.join('$upload_folder', 'output.csv')
with open(csv_file_path, 'w') as csv_file:
    csv_file.write(csv_output)

EOF

    echo "CSV file created at: $csv_file_path"
else
    echo "Error: File not found - $dbf_file_path"
fi
