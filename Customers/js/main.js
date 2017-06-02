$(document).ready(function() { // wait for document to be ready

  $.getJSON('./js/customers.js')
    .error(function(err) {
      console.log(err);
    })
    .done(function(data) {
      // console.log($(".results").innerHTML);
      // console.log(JSON.stringify(data)) // <<- log data to console
      // const CompanyData = JSON.stringify(data["title"]);
      var myData = data.fs_DATABROWSE_F0101.data.gridData.rowset.map(
        function(record) {
          return {
            alphaName: record.F0101_ALPH,
            type: record.F0101_AT1

          }
        });

      var newData = [];
      for (var i = 0; i < myData.length; i++) {
        var customerData = myData[i];
        var resultingData = customerData.type;
        if (resultingData.includes('O')) {
          newData.push(customerData);
        }
        if (resultingData.includes('C')) {
          newData.push(customerData);
        }
        if (resultingData.includes('P')) {
          newData.push(customerData);
        }
        if (resultingData.includes('V')) {
          newData.push(customerData);
        }
        if (resultingData.includes('D')) {
          newData.push(customerData);
        }
        if (resultingData.includes('W')) {
          newData.push(customerData);
        }
      }




      var tempScript = document.querySelector('.alphaAt1');
      var compTemp = Handlebars.compile(tempScript.innerHTML);
      var tempResults = compTemp({
        myData: newData
      });
      var resultsElem = document.querySelector('.results'); // <<- handle for results
      resultsElem.innerHTML = tempResults; // <<-  add data to DOM
      console.log(newData);

      var filter = function(evt) {
        var companyRelation = evt.target.value;
        console.log(companyRelation);
        var filteredData = [];
        for (var i = 0; i < newData.length; i++) {
          var optionSelected = newData[i];
          if (newData[i].type === companyRelation) {
            filteredData.push(optionSelected);
            var tempResults = compTemp({
              myData: filteredData
            });
          }else if (companyRelation === 'All') {
            var tempResults = compTemp({
              myData: newData
            });
          }
        }
        resultsElem.innerHTML = tempResults; // <<-  add data to DOM
      }

      var op = document.querySelector('.opportunity');
      var cu = document.querySelector('.customer');
      var pr = document.querySelector('.prospect');
      var su = document.querySelector('.supplier');
      var co = document.querySelector('.competitor');
      var wa = document.querySelector('.warehouse');
      var all = document.querySelector('.All');


      op.addEventListener('click', filter);
      cu.addEventListener('click', filter);
      pr.addEventListener('click', filter);
      su.addEventListener('click', filter);
      co.addEventListener('click', filter);
      wa.addEventListener('click', filter);
      all.addEventListener('click', filter);


      var opportunity = [];
      var customer = [];
      var prospect = [];
      var supplier = [];
      var competitor = [];
      var warehouse = [];

      for (var i = 0; i < newData.length; i++) {
        var partnerShip = newData[i];
        if (partnerShip.type === 'O') {
          opportunity.push(partnerShip);
        } else if (partnerShip.type === 'C') {
          customer.push(partnerShip);
        } else if (partnerShip.type === 'P') {
          prospect.push(partnerShip);
        } else if (partnerShip.type === 'V') {
          supplier.push(partnerShip);
        } else if (partnerShip.type === 'D') {
          competitor.push(partnerShip);
        } else if (partnerShip.type === 'W') {
          warehouse.push(partnerShip);
        }
      }

      // var array = [opportunity.length, customer.length, prospect.length,
      //   supplier.length, competitor.length, warehouse.length
      // ];

      window.onload = function() {
        var chart = new CanvasJS.Chart("chartContainer", {
          title: {
            text: "Graphical represantation of relationship type",
            fontFamily: "Impact",
            fontWeight: "normal"
          },

          legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center"
          },
          data: [{
            //startAngle: 45,
            indexLabelFontSize: 20,
            indexLabelFontFamily: "Garamond",
            indexLabelFontColor: "darkgrey",
            indexLabelLineColor: "darkgrey",
            indexLabelPlacement: "outside",
            type: "pie",
            showInLegend: true,
            toolTipContent: "{y} - <strong>#percent%</strong>",
            dataPoints: [{
                y: opportunity.length,
                legendText: "Opportunity(O)",
                indexLabel: "O"
              },
              {
                y: customer.length,
                legendText: "Customer(C)",
                indexLabel: "C"
              },
              {
                y: prospect.length,
                legendText: "Prospect(P)",
                indexLabel: "P"
              },
              {
                y: supplier.length,
                legendText: "Supplier(V)",
                indexLabel: "V"
              },
              {
                y: competitor.length,
                legendText: "Competitor(D)",
                indexLabel: "D"
              },
              {
                y: warehouse.length,
                legendText: "Warehouse(W)",
                indexLabel: "W"
              }
            ]
          }]
        });

        chart.render();
      }
      // console.log(array);

    })


  // var req = {}; // empty object to hold our http request
  // req.deviceName = 'aisTester'; // <<---- here change to a unique name
  // req.username = "demo";
  // req.password = "demo";
  //
  // // authenticate with the system by getting a token
  // $.ajax({
  //     url: "http://demo.steltix.com/jderest/tokenrequest", // <<- JD Edwards API token service
  //     type: 'post', // <<- the method that we using
  //     data: JSON.stringify(req), // <<- JSON of our request obj
  //     contentType: 'application/json', // <<- telling server how we are going to communicate
  //     fail: function (xhr, textStatus, errorThrown) {
  //
  //         console.log(errorThrown, textStatus, xhr) //  <<- log any http errors to the console
  //
  //     }
  // }).done(function (data, textStatus, xhr) {
  //
  //     if (data.hasOwnProperty('userInfo')) {  // <<- see example response below
  //
  //         var token = data.userInfo.token;
  //
  //         // build a request obj to fetch data
  //         var reqData = {
  //                 "deviceName" : "SiyaRenda01",
  //                 "targetName" : "F0101",
  //                 "targetType" : "table",
  //                 "outputType":"GRID_DATA",
  //                 "dataServiceType" : "BROWSE",
  //                 "maxPageSize" : "100",
  //                 "query" : {
  //                     "autoFind" : true,
  //                     "condition" : []
  //                     }
  //                 }
  //
  //
  //         reqData.token = token;  // <<- add our token from 1st request
  //
  //         $.ajax({
  //             url: "http://demo.steltix.com/jderest/dataservice", // <<- can also try http://demo.steltix.com/jderest/formservice with example request object below"
  //             type: "post",
  //             contentType: "application/json",
  //             data: JSON.stringify(reqData)
  //         }).done(function (data) {
  //
  //             console.log(JSON.stringify(data)) // <<- log data to console
  //             const resultsElem = document.querySelector('.results');  // <<- handle for results
  //             resultsElem.textContent = JSON.stringify(data,null,3);  // <<-  add data to DOM
  //
  //         })
  //
  //     }
  //
  // })

});



// Token request response example
// {
//   "username": "DEMO",
//   "environment": "JDV920",
//   "role": "*ALL",
//   "jasserver": "http://e1srv:7020",
//   "userInfo": {
//     "token": "044v2SEf1SZK9xhb/Say3dkrNzm43TUDkvtVBvPe8X08XQ=MDE4MDA5OTM5NTM0ODA4MTg2MTY3MzY1YWlzVGVzdGVyMTQ5NDk2NTI1OTg0Nw==",
//     "langPref": "  ",
//     "locale": "en",
//     "dateFormat": "MDE",
//     "dateSeperator": "/",
//     "simpleDateFormat": "MM/dd/yyyy",
//     "decimalFormat": ".",
//     "addressNumber": 0,
//     "alphaName": "DEMO",
//     "appsRelease": "E920",
//     "country": " ",
//     "username": "DEMO"
//   },
//   "userAuthorized": false,
//   "version": null,
//   "poStringJSON": null,
//   "altPoStringJSON": null,
//   "aisSessionCookie": "negS345IlfkoLIS3aLD2mO4uM35_uX0LzNVTbtemxEy-AhVMLdO1!1643583743!1494965259848",
//   "adminAuthorized": false,
//   "deprecated": true
// }



//  extra credit to play around with Form Services
// form service
//   var reqData = {
//                 "version": "ZJDE0001",
//                 "formActions": [],
//                 "deviceName": "aisTester",
//                 "formName": "P4101_W4101A"
//   }
