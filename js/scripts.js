var data;



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

$('#in-state-btn').change(function(){
  $('#your-tuition').html(tuitionByYearDict[userYear][0]);
  $('#parents-tuition').html(tuitionByYearDict[userYear - 25][0]);
  $('#gparents-tuition').html(tuitionByYearDict[userYear - 50][0]);
});

$('#out-state-btn').change(function(){
  $('#your-tuition').html(tuitionByYearDict[userYear][1]);
  $('#parents-tuition').html(tuitionByYearDict[userYear - 25][1]);
  $('#gparents-tuition').html(tuitionByYearDict[userYear - 50][1]);
});


}

$(document).ready(function() {
  var inOutStackedBar = c3.generate({
    bindto: '#inOutStackedBar',
    data: {
        columns: [
            ['% In-State', .82, .76, .7],
            ['% Out-of-State', .18, .24, .3],
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
            categories: ['UNC-Chapel Hill', 'U-Va.', 'UC-Berkeley']
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

  var enrollmentLine = c3.generate({
    bindto: '#enrollmentLine',
    data: {
        x: 'x',
        xFormat: '%Y',
        columns: [
            ['x', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            ['UNC-Chapel Hill', .17, .18, .17, .17, .19, .19, .19, .19, .19, .19, .19, .18],
            ['U-Va.', .3, .33, .33, .33, .34, .34, .33, .34, .33, .33, .33, .30],
            ['UC-Berkeley', .09, .09, .09, .09, .1, .13, .17, .19, .23, .24, .24, .24],
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


var revenueLine = c3.generate({
    bindto: '#revenueLine',
    data: {
        x: 'x',
        xFormat: '%Y',
        columns: [
            ['x', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            ['UNC-Chapel Hill', .46, .46, .45, .47, .49, .47, .48, .47, .46, .49, .47, .46],
            ['U-Va.', .59, .62, .62, .61, .63, .61, .60, .61, .61, .61, .59, .55],
            ['UC-Berkeley', .26, .25, .24, .25, .27, .29, .34, .38, .43, .44, .45, .46],
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

} );
