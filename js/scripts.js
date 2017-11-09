var data;
var barData;
var enrollmentData;
var revenueData;

var inStatePercent = [];
var outStatePercent = [];
var uncEnroll = [];
var ucbEnroll = [];
var uvaEnroll = [];
var schoolName = [];
var year = [];
var uncRev = [];
var uvaRev = [];
var ucbRev = [];


// Bar Chart functions
function loadBarData(){
  $.ajax({
    type: "GET",
    url: "data/in-out-ratio.json",
    dataType: "json",
    success: parseBarData
  });

}

function parseBarData(barData){

    for (var i=0; i < barData.length; i++){

      if (i == 0){

      }else{
        schoolName.push(barData[i]["schoolName"]);
      }

      inStatePercent.push(barData[i]["inStatePercent"]);
      outStatePercent.push(barData[i]["outStatePercent"]);
    }
    buildBarChart();
}

function buildBarChart(){
  var inOutStackedBar = c3.generate({
    bindto: '#inOutStackedBar',
    data: {
        columns: [
            inStatePercent,
            outStatePercent,
        ],
        type: 'bar',
        groups: [
            ['% In-State', '% Out-of-State']
        ]
    },
    bar: {
  width: 55
},
    axis: {
         x: {
            type: 'category',
            categories:  schoolName
        },
        y: {
            tick:{
                format: d3.format('%')
            },
            max: 1.0,
            padding: 0
        }
  }
  });
}
// End Bar Chart functions

// Being EnrollmentLine functions

function loadEnrollmentLineData(){
  $.ajax({
    type: "GET",
    url: "data/enrollment-data.json",
    dataType: "json",
    success: parseEnrollmentLineData
  })
}

function parseEnrollmentLineData(enrollmentData){
  for (var i=0; i < enrollmentData.length; i++){

    uncEnroll.push(enrollmentData[i]["UNC"]);
    ucbEnroll.push(enrollmentData[i]["UVA"]);
    uvaEnroll.push(enrollmentData[i]["Berkeley"]);
  }
  buildEnrollmentLine();
}

function buildEnrollmentLine(){
  var enrollmentLine = c3.generate({
    bindto: '#enrollmentLine',
    data: {
        x: 'x',
        xFormat: '%Y',
        columns: [
            ['x', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            uncEnroll,
            uvaEnroll,
            ucbEnroll
        ]
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y'
            }
        },
        y:{
              tick:{
                format: d3.format('%')
            },
            max: 0.5,
            min: 0,
            padding: 0
        }
    }
});
}

// End EnrollmentLine functions

function loadRevLineData(){
  $.ajax({
    type: "GET",
    url: "data/revenue-data.json",
    dataType: "json",
    success: parseRevData
  });
}

function parseRevData(revenueData){
  for (var i=0; i < revenueData.length; i++){
    year.push(revenueData[i]["Year"]);
    uncRev.push(revenueData[i]["UNC"]);
    ucbRev.push(revenueData[i]["UVA"]);
    uvaRev.push(revenueData[i]["Berkeley"]);

  }
  buildRevLine();
}
function buildRevLine(){
  var revenueLine = c3.generate({
      bindto: '#revenueLine',
      data: {
          x: 'x',
          xFormat: '%Y',
          columns: [
              year, uncRev, uvaRev, ucbRev,
          ]
      },
      axis: {
          x: {
              type: 'timeseries',
              tick: {
                  format: '%Y'
              }
          },
          y:{
                tick:{
                  format: d3.format('%')
              },
              max: 0.7,
              min: 0,
              padding: 0.1
          }
      }
  });

}


// Tuition Finder functions - modeled from the wonderful Maegan Clawges' work on America Heard
// found here: https://github.com/mclawges22/AmericanHeard/blob/master/public/83746274/javascript/zip_code_maker.js

function loadData(){
  $.ajax({
    type: "GET",
    url: "data/tuition.json",
    dataType: "json",
    success: parseData
  });
}

function parseData(data){
  var tuitionYear, inState, outState;
  var tuitionByYearDict = {};

for (var i = 0; i < data.length; i++){
    tuitionYear = data[i].Year;
    inState = data[i].In;
    outState = data[i].Out;
    tuitionYear = tuitionYear.toString();


    if(tuitionByYearDict[tuitionYear] == undefined){
      tuitionByYearDict[tuitionYear] = [inState, outState];
    } else{
      tuitionByYearDict[tuitionYear].push(inState, outState);
    }
}


//// Get user input and work the magic
var userYear = document.getElementById("userYear").value;

var tempBtn = document.getElementById("in-state-btn").checked

if (userYear == undefined || userYear == "" || userYear <= 1979){
  console.log(userYear);
  alert("Please enter a valid year between 1980 and 2016.");
}else{
  if (tempBtn == true){
    $('#your-tuition').html(tuitionByYearDict[userYear][0]);
    $('#parents-tuition').html(tuitionByYearDict[userYear - 25][0]);
    $('#gparents-tuition').html(tuitionByYearDict[userYear - 50][0]);
  } else{
      $('#your-tuition').html(tuitionByYearDict[userYear][1]);
      $('#parents-tuition').html(tuitionByYearDict[userYear - 25][1]);
      $('#gparents-tuition').html(tuitionByYearDict[userYear - 50][1]);
  }
}

}



// End Tuition Finder functions
$(document).ready(function() {
  loadBarData();
  loadEnrollmentLineData();
  loadRevLineData();
});

$('.submit_on_enter').keydown(function(event) {
  // enter has keyCode = 13, change it if you want to use another button
  if (event.keyCode == 13) {
    loadData();
    return false;
  }
});
