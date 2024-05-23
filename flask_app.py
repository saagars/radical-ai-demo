import os

from flask import Flask

import pymatgen.core as pmg
import time
from flask import Flask, flash, request, redirect, url_for
from chgnet.model import CHGNet

def test():
    structure = pmg.Structure.from_file("SiO2.json")
    chgnet = CHGNet.load()
    prediction = chgnet.predict_structure(structure)

    for key, unit in [
        ("energy", "eV/atom"),
        ("forces", "eV/A"),
        ("stress", "GPa"),
        ("magmom", "mu_B"),
    ]:
        print(f"CHGNet-predicted {key} ({unit}):\n{prediction[key[0]]}\n")
    x=1





def create_app():
    # create and configure the app
    app = Flask(__name__)

    # Load our ML Model
    chgnet = CHGNet.load()

    @app.route('/api/submitFile', methods = ['GET', 'POST'])
    def post_submit_file():
        if request.method == 'POST':
            file = request.files['file']
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
            
        return {'error': 'Non-POST method somehow sent.'}

    return app

if __name__=='__main__':
    create_app().run()
