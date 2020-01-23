import os

from flask import Flask, jsonify, render_template, json

app = Flask(__name__, static_url_path="/static")

# Passing data from the server-side to html using Jinja
@app.route("/")
def graphs():
    return render_template("index.html")

@app.route("/graphs")
def map():
    return render_template("graphs.html")

@app.route("/top")
def top():
    return render_template("topCountries.html")    

@app.route("/api/gdp")
def gdp_data():
  with open('./data/gdp.json') as f:
    json_data = json.load(f)
  return jsonify(json_data)

@app.route("/api/gdp_pc")
def gdp_pc_data():
  with open('./data/gdp_ppp.json') as f:
    json_data = json.load(f)
  return jsonify(json_data)

@app.route("/api/labor_force")
def labor_data():
  with open('./data/labor_force.json') as f:
    json_data = json.load(f)
  return jsonify(json_data)

@app.route("/api/literacy_rate")
def literacy_data():
  with open('./data/literacy_rate.json') as f:
    json_data = json.load(f)
  return jsonify(json_data)

@app.route("/api/rural_population")
def rural_data():
  with open('./data/rural_population.json') as f:
    json_data = json.load(f)
  return jsonify(json_data)


if __name__ == "__main__":
    app.run(debug=True)