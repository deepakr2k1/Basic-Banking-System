function tab0() {
    window.sessionStorage.setItem("tab", "0");
    document.getElementById("pills-home-tab").style.background = "green";
    document.getElementById("pills-home-tab").style.color = "white";
    document.getElementById("pills-home-tab").style.borderTopLeftRadius = "8px";
    document.getElementById("pills-home-tab").style.borderTopRightRadius = "8px";
    document.getElementById("pills-profile-tab").style.background = "white";
    document.getElementById("pills-profile-tab").style.color = "black";
    document.getElementById("pills-profile-tab").style.borderBottomColor = "green";
    var element = document.getElementById("pills-home");
    element.classList.add("active");
    element.classList.add("show");
    element = document.getElementById("pills-profile");
    element.classList.remove("active");
    element.classList.remove("show");
}

function tab1() {
    window.sessionStorage.setItem("tab", "1");
    document.getElementById("pills-profile-tab").style.background = "green";
    document.getElementById("pills-profile-tab").style.color = "white";
    document.getElementById("pills-profile-tab").style.borderTopLeftRadius = "8px";
    document.getElementById("pills-profile-tab").style.borderTopRightRadius = "8px";
    document.getElementById("pills-home-tab").style.background = "white";
    document.getElementById("pills-home-tab").style.color = "black";
    document.getElementById("pills-home-tab").style.borderBottomColor = "green";
    var element = document.getElementById("pills-profile");
    element.classList.add("active");
    element.classList.add("show");
    var element2 = document.getElementById("pills-home");
    element2.classList.remove("active");
    element2.classList.remove("show");
}

function clk0() {
    window.sessionStorage.setItem("email", document.getElementById("email2").value);
}

function clk1() {
    window.sessionStorage.setItem("name", document.getElementById("name2").value);
    window.sessionStorage.setItem("email", document.getElementById("email2").value);
}

if (window.sessionStorage.getItem("tab") == "1") {
    tab1();
} else {
    tab0();
}