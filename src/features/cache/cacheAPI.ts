export function fetchToken() {
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest();
    req.open('POST', "https://findfalcone.herokuapp.com/token");
    req.setRequestHeader("Accept", "application/json")
    req.onload = function () {
      if (req.status === 200) {
        resolve(JSON.parse(req.response));
      } else {
        reject({ errorCode: req.status });
      }
    };
    req.send();
  });
}

export function fetchFindFalcone(paramData: any) {
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest();
    req.open('POST', "https://findfalcone.herokuapp.com/find");
    req.setRequestHeader("Accept", "application/json")
    req.setRequestHeader("Content-Type", "application/json")
    req.onload = function () {
      if (req.status === 200) {
        resolve(JSON.parse(req.response));
      } else {
        reject({ errorCode: req.status });
      }
    };
    req.send(JSON.stringify(paramData));
  });
}

export function fetchPlanets() {
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest();
    req.open('GET', "https://findfalcone.herokuapp.com/planets");
    req.onload = function () {
      if (req.status === 200) {
        resolve(JSON.parse(req.response));
      } else {
        reject({ errorCode: req.status });
      }
    };
    req.send();
  });
}

export function fetchVehicles() {
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest();
    req.open('GET', "https://findfalcone.herokuapp.com/vehicles");
    req.onload = function () {
      if (req.status === 200) {
        resolve(JSON.parse(req.response));
      } else {
        reject({ errorCode: req.status });
      }
    };
    req.send();
  });
}