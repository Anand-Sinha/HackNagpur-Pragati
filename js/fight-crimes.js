let latitude = 0;
let longitude = 0;

window.localStorage.setItem('crime-reported', false);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {

    }
}

function showPosition(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

getLocation()


window.onload = function () {
     
    document.getElementById("submit-btn").addEventListener("click", () => {

            var age = document.getElementById("agecategoryList").value;
            var crime = document.getElementById("crimecategoryList").value;
            var desc = document.getElementById("prodDesc").value;

            let status = [];

            if (desc.length < 1) {
                document.getElementById("prodDesc").style.borderColor = "red";
                document.getElementById("prodDesc").value = "";
                document.getElementById("labelDesc").innerHTML =
                    "Please enter valid description";
                status.push("false");
            } else {
                status.push("true");
            }

            if (status.includes("false")) {

                return false;
            } else {


                //Fetch call to be added

                if(!Boolean(window.localStorage.getItem("crime-report"))){
                    fetch('https://streamrhack.herokuapp.com/register/complaints', {
                        method: 'POST',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            latitude: latitude,
                            longitude: longitude,
                            age: age ,
                            type: crime,
                            description: desc
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if(data.message){
                                console.log(data)
                                window.localStorage.setItem('crime-reported', true);
                            } else {
                                console.log('Got some error ', data.error)
                            }
                        })
                        .catch(err => {
                            // some error
                        })
                }


            }
    });
};

function logout(event) {
    localStorage.removeItem("token");
}
