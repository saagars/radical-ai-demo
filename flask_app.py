from flask import Flask

import pymatgen.core as pmg
from flask import Flask, flash, request, redirect, url_for
from chgnet.model import CHGNet


# The entry point for the flask devserver
def create_app():
    # Create and configure the app
    app = Flask(__name__)

    # Load our ML Model
    chgnet = CHGNet.load()

    # We only have one route for this simple app - which expects a post request with a file upload
    # A better way to architect this app for prodution might be to have some kind of async job scheduling
    # mechanism and polling on the front end (the files I've tested with have finished in a reasonable
    # time frame - but I can imagine some take too long to be done in the span of a single request)
    @app.route('/api/submitFile', methods = ['POST'])
    def post_submit_file():
        file = request.files['file']
        # Some files don't have content_type, so we can use the name to determine fileType
        filename = file.filename
        parts = filename.split(".")
        if file.content_type == 'application/json' or parts[-1] == 'json':
            try:
                structure = pmg.Structure.from_str(file.read().decode('utf-8'), "json")
            except Exception:
                return {"error": "Something went wrong parsing the the json file"}
        elif parts[-1] == 'cif':
            try:
                structure = pmg.Structure.from_str(file.read().decode('utf-8'), "cif")
            except ValueError as e:
                return {"error": e.args[0]}
        else:
            return {"error": "Non json/cif passed in."}
        try:
            prediction = chgnet.predict_structure(structure)
            energy = str(prediction['e']) + " eV/atom"
            forces = prediction['f']
            forces_list = []
            for i in range(len(forces)):
                forces_list.append({
                    "name": structure.species[i].name,
                    "x": str(forces[i][0]),
                    "y": str(forces[i][1]),
                    "z": str(forces[i][2])
                })

            return {'prediction': {
                "energy": energy,
                "forces": forces_list
            }}
        except:
            return {"error": "Unable to make predictions about structure"}
            

    return app

if __name__=='__main__':
    create_app().run()
