from flask import Flask, redirect, make_response, request as req
from urllib import request
import base64


key = ""
app = Flask(__name__)


# "/" で static/index.html にリダイレクト
@app.route("/")
def hello_world():  # put application's code here
    return redirect("/static/index.html")


@app.route("/get-image", methods=["POST"])
def get_image():
    json_data = req.json

    # print(json_data)

    latitude = json_data["latitude"]
    longitude = json_data["longitude"]
    scale = json_data["scale"]

    url = f"https://maps.googleapis.com/maps/api/staticmap?center={latitude},{longitude}&zoom={scale}&size=480x480&key={key}"

    # print(url)

    # URLからファイル読み込み
    response = request.urlopen(url)
    image_data = response.read()
    response.close()

    # バイナリデータをBase64変換
    b64_data = base64.b64encode(image_data).decode('utf-8')

    response = make_response(str("data:image/png;base64," + b64_data))
    response.headers.set("Content-Type", "text/plain")

    return response


@app.route("/test-image")
def test_image():
    url = "https://i.imgur.com/tEsx3kk.png"

    # URLからファイル読み込み
    response = request.urlopen(url)
    image_data = response.read()
    response.close()

    # バイナリデータをBase64変換
    b64_data = base64.b64encode(image_data).decode('utf-8')

    response = make_response(str("data:image/png;base64," + b64_data))
    response.headers.set("Content-Type", "text/plain")

    return response


if __name__ == '__main__':
    key = input("Input Google Map Static API key: ")
    app.run(host="0.0.0.0", port=5000, debug=True)
