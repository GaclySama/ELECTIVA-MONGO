from pymongo import MongoClient


try:
  uri = "mongodb://localhost:27017/"
  client = MongoClient(uri)
  database = client["NEMESIS_DB"]

  # client.close()

except Exception as e:
    raise Exception("Unable to find the document due to the following error: ", e)
    