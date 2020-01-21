import os

from flask import Flask, jsonify, render_template, json

app = Flask(__name__, static_url_path="/static")

# Passing data from the server-side to html using Jinja
@app.route("/")
def graphs():
    with open('data/gdp.json') as f:
      gdp_data = json.load(f)
    with open('data/gdp_ppp.json') as f:
      gdp_ppp_data = json.load(f)
    return render_template("index.html", gdp_data=gdp_data, gdp_ppp_data=gdp_ppp_data)

@app.route("/worldmap")
def map():
    return render_template("worldmap.html")

@app.route("/api/gdp")
def gdp_data():
  with open('./data/gdp.json') as f:
    json_data = json.load(f)
  return jsonify(json_data)


if __name__ == "__main__":
    app.run(debug=True)