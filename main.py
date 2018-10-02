from flask import Flask, render_template, redirect
from flask_assets import Environment, Bundle
from jinja2.exceptions import TemplateNotFound

app = Flask(__name__)
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
        return render_template("pages/{}.html".format(page), page=page)
    except TemplateNotFound:
        return redirect("/")

@app.route("/")
def index():
    return show_page("index")

if __name__ == "__main__":
    app.run(debug=True)
