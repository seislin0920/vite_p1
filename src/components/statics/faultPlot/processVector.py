import requests

filename = input("Enter filename: ").strip()
vectortype = input("Enter vectortype: ").strip()

if vectortype not in ["lines", "vector", "seismic", "stations"]:
    exit()

if "../" not in filename and "../../data/" not in filename:
    exit()

if vectortype == "lines":
    filecontents = requests.get(filename).text.split("X")
    tempArray = []
    
    error = 0
    for content in filecontents:
        lines = content.split("\n")
        tempArray.append(lines)
        if not lines[0].replace(".", "").isdigit():
            error += 1
        if not lines[1].replace(".", "").isdigit():
            error += 1
    
    if error == 0:
        print(tempArray)