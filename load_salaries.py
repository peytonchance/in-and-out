# This file written with the help of the stellar Peter Andringa - peterandringa.com

import json
import requests
salaries = []

def removeFields(data):
  if 'exemptStatus' in data: del data['exemptStatus']
  if 'monthsWork' in data: del data['monthsWork']
  if 'campus' in data: del data['campus']
  if 'fte' in data: del data['fte']
  if 'hireDate' in data: del data['hireDate']
  if 'id' in data: del data['id']
  if 'asOfDate' in data: del data['asOfDate']
  if 'position' in data: del data['position']
  return data

page = 1
while True:
  url = "https://api.sacbeelabs.com/v1-bca1a5a/datavis/data/search/dsid=nCUniversitySyst/n=100/s=name/p=" + str(page) + "/d=1/f=campus%3DUNC-CH.json"
  r = requests.get(url, headers={'Origin': 'http://www.newsobserver.com'})
  data = r.json()['result']['data']

  salaries += map(removeFields, data)
  print "Loaded page "+str(page)
  page += 1
  if len(data) != 100:
      break;

with open('data/salaries.json', 'w') as jsonfile:
  json.dump(salaries, jsonfile)
