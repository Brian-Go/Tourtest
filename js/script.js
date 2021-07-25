var addHotSpot = false;
var config = undefined;
var viewer = undefined;

document.addEventListener("DOMContentLoaded",
  function (event) {
    
    function createDynamicHotspot (event) {
        console.log("hello");
        console.log(document.getElementById("item-name").value);
        document.querySelector("#curr-name").textContent = document.querySelector("#item-name").value;
        addHotSpot = true;
    }

    // Unobtrusive event binding
    document.querySelector("#add-hotspot")
      .addEventListener("click", createDynamicHotspot);
    }
);

function getItem(event, args) {
    console.log("clicked");
    console.log(event);
    console.log(args);
}

(function initializeViewer (window, callback) {
    $ajaxUtils.sendGetRequest("../json/initial.json", 
        function (res) {
        config = res;
        for(scene in res.scenes){
            console.log(scene);
            for(hotspot in res.scenes[scene]["hotSpots"]){
                console.log(res.scenes[scene]["hotSpots"][hotspot]);
                res.scenes[scene]["hotSpots"][hotspot].clickHandlerFunc = getItem;
            }
        }
        viewer = pannellum.viewer('panorama', config);
        callback(window);
        }
    );
})(window, dynamicHotspots)

function dynamicHotspots(){
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
            console.log(viewer.getConfig());
        }
    );
}