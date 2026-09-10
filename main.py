from flask import Flask, render_template, redirect
from flask_assets import Environment, Bundle
from jinja2.exceptions import TemplateNotFound
import json
import os

app = Flask(__name__)
with open(os.path.join(app.root_path, 'media.json')) as media_file:
    homepage_media = json.load(media_file)
assets = Environment(app)

css = Bundle(
    "css/reset.css",
    "css/style.css",
    filters="cssmin",
    output="gen/packed.css"
)

assets.register('css_all', css)

@app.route("/<page>/")
def show_page(page):
    try:
        return render_template("pages/{}.html".format(page), page=page, media=homepage_media)
    except TemplateNotFound:
        return redirect("/")

@app.route("/")
def index():
    return show_page("index")

if __name__ == "__main__":
    app.run(debug=True)
