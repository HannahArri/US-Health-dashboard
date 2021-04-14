var currentAttribute = 'avg_covered_charges';
var current_level = 'state'
var data,svg;

//initial log statement
log({
    'time': Date.now(),
    'event': "Starting exploration",
    'target': null
})

//submit button
document.getElementById('startbutton').addEventListener('click', (d)=>{
    log({
        'time': Date.now(),
        'event': "User starting evaluation",
        'target': null
    })
    location.href='/start'
})

//populate buttons using fetch.
fetch('/fetchtabledata', {
    method:'GET', 
    credentials: "include",
}).then((response) =>{
    if(response.ok){
        response.json().then((result)=>{
            console.log(result)
            addButtons(result['data'])

            //fetch data
            fetch('/fetchgeodata', {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    attr:currentAttribute,
                    state:null, //default value is always 10
                    county:null
                }),
                cache: "no-cache",
                headers: new Headers({
                    "content-type": "application/json"
                })
            }).then((response) =>{
                if(response.ok){
                    response.json().then((counties)=>{
                        data= {'counties': counties['counties'], 'states':counties['states'], 'state_total':counties['state_total']}
                        console.log(data)
                        // drawCounties(counties['counties'], 'AK');
                        if (current_level =='state'){
                            drawStates(counties['state_total'])
                        }
                        else{
                            drawCounties(counties['counties']);
                        }
                        
                        drawBars(counties['state_total'], "All States")
                    })
                }
            }).catch((error)=>{
                console.log('error fetching data', error);
            });
        })
    }
}).catch((error)=>{
    console.log('error fetching data', error);
})

function addButtons(attributes){
    d3.select("#viz_buttons")
    .selectAll("button")
    .data(attributes.slice(9,12))
    .join("button")
    .text(d => d)
    .on("click", (e, attributeName) => {
      currentAttribute = attributeName;
      log({
        'time': Date.now(),
        'event': "changing attribute",
        'target': currentAttribute
        });
      //fetch data
      fetch('/fetchgeodata', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            attr:currentAttribute,
            state:null, //default value is always 10
            county:null
        }),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    }).then((response) =>{
        if(response.ok){
            response.json().then((counties)=>{
                data= {'counties': counties['counties'], 'states':counties['states'], 'state_total':counties['state_total']}
                // console.log(data, counties['state_total'])
                // drawCounties(counties['counties']);
                if (current_level =='state'){
                    drawStates(counties['state_total'])
                }
                else{
                    drawCounties(counties['counties']);
                }
                drawBars(counties['state_total'], "All States")
            })
        }
    }).catch((error)=>{
        console.log('error fetching data', error);
    });
    });
}


//add values and listener for the selectors onclick
var levels_data =['state', 'county']
d3.select('#levels')
.selectAll('myOptions')
    .data(levels_data)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button

d3.select('#levels')
.on('change', (d) =>{
    current_level = document.getElementById("levels").value
    log({
        'time': Date.now(),
        'event': "User changed geomap levels",
        'target': current_level
    })
    if (current_level =='state'){
        drawStates(data['state_total'])
    }
    else{
        drawCounties(data['counties']);
    }
})

  // removes the content inside of the given DOM element 
  function clearNode(identifier) {
    const myNode = document.getElementById(identifier);
    myNode.textContent = '';
  }


function log(data){
    fetch('/logger', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    }).then((response) =>{
        if(response.ok){
            console.log('logged event')
        }
    }).catch((error)=>{
        console.log('error logging event', error);
    });
}

//question
var q_id =1
var question = document.getElementById('question');
var answer = document.getElementById('answerbox')

//submit button
document.getElementById('submit').addEventListener('click', (d)=>{
    log({
        'time': Date.now(),
        'event': "User submitted answer:"+q_id,
        'target': answer.value
    })

    if(q_id ==1){
        q_id =2;
        question.innerHTML = "What is the difference in average medicare payments for the top two counties in your answer to the previous question?"+
         "<br> Please enter the name of the county and the corresponding state in the text box below"
        answer.value =''
        log({
            'time': Date.now(),
            'event': "Starting question 2",
            'target': null
        })
    }
    else if(q_id ==2){
        location.href ='https://docs.google.com/forms/d/e/1FAIpQLSe0O6-C-jVupAWNlDOQ_WZWIj_aiy_Pbt1GupLiyHBJTIPNbA/viewform?usp=sf_link';
    }

})

