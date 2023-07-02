$(function() {
    const latitudeInput = $("#latitude");
    const longitudeInput = $("#longitude");
    const scaleInput = $("#scale");
    const getLocationButton = $("#get-location-button");
    const applyButton = $("#apply-button");

    // Geolocation APIをサポートしていない場合の処理
    if (!navigator.geolocation)
        getLocationButton.addClass("disabled");

    // input にちゃんと入力されているか //
    latitudeInput.on("input", function () {
        check();
    });

    longitudeInput.on("input", function () {
        check();
    });

    scaleInput.on("input", function () {
        check();
    });

    // 「位置情報を取得」 ボタンが押された時 //
    getLocationButton.on("click", function () {
        getLocation();
    });

    // 「適用」 ボタンが押された時 //
    applyButton.on("click", function () {
        getImage(latitudeInput.val(), longitudeInput.val(), scaleInput.val())
    });
});

// 入力されているかチェック //
function check() {
    const applyButton = $("#apply-button")

    const latitude = $("#latitude");
    const longitude = $("#longitude");
    const scale = $("#scale");

    const b1 = latitude.val().length > 0;
    const b2 = longitude.val().length > 0;
    const b3 = scale.val().length > 0;

    if (b1 && b2 && b3) {
        applyButton.removeClass("disabled");
    } else {
        applyButton.addClass("disabled");
    }
}

// 位置を取得 //
function getLocation() {
    navigator.geolocation.getCurrentPosition(process);
}

// 詳細処理 //
function process(position) {
    const latitudeInput = $("#latitude");
    const longitudeInput = $("#longitude");

    latitudeInput.val(position.coords.latitude);
    longitudeInput.val(position.coords.longitude);
}

// サーバー（Flask）から画像を取得 //
function getImage(latitude, longitude, scale) {
    const result = $("#result");

    const array = {
        latitude: latitude,
        longitude: longitude,
        scale: scale
    };

    const json = JSON.stringify(array);

    /*
    $.ajax({
        url: "/test-image",
        type: "GET"
    }).done(function(response) {
        console.log(`Response: ${response}`);
        result.attr("src", response);
    }).fail(function() {
        console.log("400 Bad Request");
    });
     */

    $.ajax({
        url: "/get-image",
        type: "POST",
        datatype: "json",
        data: json,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function(response) {
        // console.log(`Response: ${response}`);
        result.attr("src", response);
    }).fail(function() {
        console.log("400 Bad Request");
    });
}