var addHotSpot = false;

document.addEventListener("DOMContentLoaded",
  function (event) {
    
    function sayHello (event) {
        console.log("hello");
        console.log(document.getElementById("item-name").value);
        document.querySelector("#curr-name").textContent = document.querySelector("#item-name").value;
        addHotSpot = true;
    }

    // Unobtrusive event binding
    document.querySelector("button")
      .addEventListener("click", sayHello);

  }
);

viewer = pannellum.viewer('panorama', {   
    "default": {
        "firstScene": "living",
        "author": "ajin",
    },
    "hotSpotDebug": true,
    "autoLoad": true,
    "compass": false,

    "scenes": {
        "living": {
            "title": "living room",
            "hfov": 110,
            "pitch": -3,
            "yaw": 117,
            "type": "equirectangular",
            "panorama": "images/lion0.jpeg",
            "hotSpots": [
                {
                    "pitch": -8.71,
                    "yaw": -15.4,
                    "type": "scene",
                    "text": "kitchen",
                    "sceneId": "kitch"
                },
                {
                    "pitch": -26.06,
                    "yaw": -151.42,
                    "type": "info",
                    "text": "Its a Bear!",
                    "URL": "https://en.wikipedia.org/wiki/Teddy_bear"
                },
            ]
        },

        "kitch": {
            "title": "kitchen",
            "hfov": 110,
            "yaw": 5,
            "type": "equirectangular",
            "panorama": "images/kitch.jpeg",
            "hotSpots": [
                {
                    "pitch": -14.5,
                    "yaw": -94.9,
                    "type": "scene",
                    "text": "living",
                    "sceneId": "living",
                    "targetYaw": -23,
                    "targetPitch": 2
                }
            ]
        }
    }
});

viewer.on('mousedown', 
    function(event) {
        // coords[0] is pitch, coords[1] is yaw
        var coords = viewer.mouseEventToCoords(event);
        // Do something with the coordinates here...
        var name = document.querySelector("#item-name").value;
        if (addHotSpot){
            viewer.addHotSpot({"pitch":coords[0], "yaw":coords[1], "type":"info", "text":name});
            addHotSpot = false;
        }
    }
);