var addHotSpot = false;
var config = undefined;
var viewer = undefined;
var itemMap = new Map();

// document.addEventListener("DOMContentLoaded",
//   function (event) {
    
//     function createDynamicHotspot (event) {
//         console.log("hello");
//         console.log(document.getElementById("item-name").value);
//         document.querySelector("#curr-name").textContent = document.querySelector("#item-name").value;
//         addHotSpot = true;
//     }

//     // Unobtrusive event binding
//     document.querySelector("#add-hotspot")
//       .addEventListener("click", createDynamicHotspot);
//     }
// );


function getItem(event, args) {
    console.log("clicked");
    console.log(event);
    console.log(args);
    var itemInfo = itemMap.get(args);
    console.log(itemInfo);
    document.querySelector("#item-title").textContent = itemInfo.name;
    document.querySelector("#item-image").src = "items/"+itemInfo.image;
}

(function initializeViewer (window, callback) {
    $ajaxUtils.sendGetRequest("json/initial.json", 
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
        }
    );
    $ajaxUtils.sendGetRequest("items/items.json", 
        function (res) {
            console.log(res);
            for(item in res){
                console.log("haha" + item);
                console.log(res[item]);
                itemMap.set(item, res[item]);
            }
            console.log(itemMap);
        }
    );
    
})(window)