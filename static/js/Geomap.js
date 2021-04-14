//This template creates a geomap for the USA. The same approach can be used to create a geomap for the rest of the world.
//This template was made possible by code from http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

var geo_margin = {top: 20, right: 10, bottom: 20, left: 10}
var geodata, svg,zoom, curr_state; 
var width = 450-geo_margin.left - geo_margin.right;
var height = 600 -geo_margin.bottom-geo_margin.top;

var states_shortcode = {
    "Alabama": "AL",
    "Alaska":"AK",
    "American Samoa":"AS",
    "Arizona":"AZ",
    "Arkansas":"AR",
    "California":"CA",
    "Colorado":"CO",
    "Connecticut":"CT",
    "Delaware":"DE",
    "District of Columbia":"DC",
    "Federated States Of Micronesia":"FM",
    "Florida":"FL",
    "Georgia":"GA",
    "Guam":"GU",
    "Hawaii":"HI",
    "Idaho":"ID",
    "Illinois":"IL",
    "Indiana":"IN",
    "Iowa":"IA",
    "Kansas":"KS",
    "Kentucky":"KY",
    "Louisiana":"LA",
    "Maine":"ME",
    "Marshall Islands":"MH",
    "Maryland":"MD",
    "Massachusetts":"MA",
    "Michigan":"MI",
    "Minnesota":"MN",
    "Mississippi":"MS",
    "Missouri":"MO",
    "Montana":"MT",
    "Nebraska":"NE",
    "Nevada":"NV",
    "New Hampshire":"NH",
    "New Jersey":"NJ",
    "New Mexico": "NM",
    "New York":"NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Northern Mariana Islands":"MP",
    "Ohio":"OH",
    "Oklahoma":"OK",
    "Oregon":"OR",
    "Palau":"PW",
    "Pennsylvania":"PA",
    "Puerto Rico":"PR",
    "Rhode Island":"RI",
    "South Carolina":"SC",
    "South Dakota":"SD",
    "Tennessee":"TN",
    "Texas":"TX",
    "Utah":"UT",
    "Vermont":"VT",
    "Virgin Islands":"VI",
    "Virginia":"VA",
    "Washington":"WA",
    "West Virginia":"WV",
    "Wisconsin":"WI",
    "Wyoming":"WY",
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}


// define projecrtion for the united states map
var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2])
  .scale([1050]);          // fit toscreen 

//Declare variable to store path generator
var path = d3.geoPath();
//   .projection(projection); //path will use the projection defined above to draw the paths for the map 


//color gradient scale
// var color = d3.scaleSequential()
//   .interpolator(d3.interpolatePuRd);
var color_mapping={'avg_covered_charges':d3.schemeYlOrRd[9], "avg_total_payments":d3.schemeYlGnBu[9], "avg_medicare_payments":d3.schemeYlOrBr[9] }



format = d => `${d}%`

function drawCounties(result){
    clearNode('geomap');
        
    var s, counties;
    //zoom
    zoom = d3.zoom().scaleExtent([1, 8])
    .on('zoom', (e,d)=>{
        svg.attr('transform', e.transform)
    })
    .on('end', (e,d) => {
        // console.log(e)
    if(e.sourceEvent){
        curr_county = e.sourceEvent.path[0].id
        console.log(curr_county, data['counties'][curr_county],result[curr_county] )
        if(result[curr_county]){
            // console.log(curr_county, result[curr_county])
            state = result[curr_county].state
            if (data['states'][state]){
                drawBars(data['states'][state], states_shortcode[state], curr_county)
            }
            else {drawBars({}, states_shortcode[state])}
        }
        if(e.sourceEvent == "WheelEvent"){
            log({
                'time': Date.now(),
                'event': "Zoom",
                'target': curr_county
            });
        } else if (e.sourceEvent == "MouseEvent"){
            log({
                'time': Date.now(),
                'event': "Pan",
                'target': curr_county
            })
        }
    }
    });

    svg = d3.select('#geomap')
    .append('svg')
    .attr('width', 950+geo_margin.right+geo_margin.left)
    .attr('height', height+geo_margin.bottom+ geo_margin.top)
    .attr('border', '1px solid black')
    .attr('margin-left', '16px')
    .attr('preserveAspectRatio', 'xMinYMin meet')
        // This is for when you zoom on the background, it will zoom
    .call(zoom)
    // This is going to be the country group
    .append('g');

    //button to reset both visualizations zoom
    d3.select("#bar_buttons")
    .selectAll("button")
    .data(['reset'])
    .join("button")
    .text(d => d)
    .on("click", (e, attributeName) => {
        drawBars(data['state_total'], "All States")
        svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity ,d3.zoomTransform(svg.node()).invert([width / 2, height / 2]));

        log({
            'time': Date.now(),
            'event': "Reset",
            'target': null
        });
       
    });
    
    svg.append("text")
    .attr("x", ((width/2)))             
    .attr("y", 50 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "26px") 
    .style("text-decoration", "underline")  
    .text("Health Care Cost by US Counties");
    
    d3.json('static/counties-albers-10m.json').then(function(us){

        //set domain for color
        var color =d3.scaleQuantile(color_mapping[currentAttribute]);
        color.domain(Object.values(result).map(d => d.value));

        //draw legend
        // var legend = d3.legendColor().scale(color).orient('horizontal')
        // svg.append("g")
        // .attr("transform", "translate(700,20)")
        // .call(legend);
        legend({
            color:color,
            title: currentAttribute
          })
        svg.append('g')
        .attr("transform", "translate(780,0)")
        .append(() => legend({
            color:color,
            title: currentAttribute,
            width:260, 
            tickFormat: ".0s"
          }))
          .attr('margin', 20);
        //Map states to corresponding ID
        s = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]))
        
        //map county to corresponding ID
        // counties = new Map(us.objects.counties.geometries.map(d => [d.id, d.properties]))

        //tooltip for details
        // create a tooltip
        var Tooltip = d3.select("#geomap")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

        //draw svg
        svg.append("g")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .join("path")
        .attr("fill", d => {
            county = d.properties.name
            if (result[county])
                return color(result[county].value)
            return color(0)
        })
        .attr('id', (d)=>{
            return d.properties.name
            
        })
        // .attr("stroke", "black")
        // .attr("stroke-linejoin", "round")
        .attr("d", path)
        .style("padding", "25px")
        .on('mouseover', (e,d)=>{
            Tooltip.style("opacity", 1)
        })
        .on('mousemove', (e,d)=>{
            Tooltip
            .html(d.properties.name + "<br> Cost: $" +result[d.properties.name].value.toFixed(2))
            .style("left", d3.pointer(e)[0] +20+ "px")
            .style("top", d3.pointer(e)[1] +20+ "px")
            log({
                'time': Date.now(),
                'event': "Mouse over geomap",
                'target': d.properties.name
            });
        })
        .on('mouseout', (e,d)=>{
            Tooltip.style("opacity", 0)
        });

        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-linejoin", "round")
            .attr("d", path);
    });
}

function drawStates(result){
    clearNode('geomap');
        
    //zoom
    zoom = d3.zoom().scaleExtent([1, 8])
    .on('zoom', (e,d)=>{
        // drawCounties(data['counties'], e)
        svg.attr('transform', e.transform)
    })
    .on('end', (e,d) => {
        curr_state = e.sourceEvent.path[0].id
        if (data['states'][states_shortcode[curr_state]]){
            drawBars(data['states'][states_shortcode[curr_state]], curr_state)
        }
        else {drawBars({}, states_shortcode[curr_state])}
        
        if(e.sourceEvent == "WheelEvent"){
            log({
                'time': Date.now(),
                'event': "Zoom",
                'target': curr_state
            });
        } else if (e.sourceEvent == "MouseEvent"){
            log({
                'time': Date.now(),
                'event': "Pan",
                'target': curr_state
            })
        }
    });

    svg = d3.select('#geomap')
    .append('svg')
    .attr('width', 1050+geo_margin.right+geo_margin.left)
    .attr('height', height+geo_margin.bottom+ geo_margin.top)
    .attr('border', '1px solid black')
    .attr('margin-left', '16px')
    .attr('preserveAspectRatio', 'xMinYMin meet')
        // This is for when you zoom on the background, it will zoom
    .call(zoom)
    // This is going to be the country group
    .append('g');
    
    //button to reset both visualizations zoom
    d3.select("#bar_buttons")
    .selectAll("button")
    .data(['reset'])
    .join("button")
    .text(d => d)
    .on("click", (e, attributeName) => {
        drawBars(data['state_total'], "All States")
        svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity ,d3.zoomTransform(svg.node()).invert([width / 2, height / 2]));
    });
    
    svg.append("text")
    .attr("x", ((width/2)))             
    .attr("y", 30 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "26px") 
    .style("text-decoration", "underline") 
    .style("margin", 20) 
    .text("Health Care Cost by US States");

    //load data for geomap
    d3.json('static/counties-albers-10m.json').then(function(us){

        //set domain for color
        var color =d3.scaleQuantile(color_mapping[currentAttribute]);
        color.domain(Object.values(result).map(d => d.value));

        //draw legend
        legend({
            color:color,
            title: currentAttribute
          })
        svg.append('g')
        .attr("transform", "translate(780,0)")
        .append(() => legend({
            color:color,
            title: currentAttribute,
            width:260, 
            tickFormat: ".0s"
          }))
          .attr('margin', 20);
      
        
        //Map states to corresponding ID
        var s = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]))
        
        //tooltip for details
        // create a tooltip
        var Tooltip = d3.select("#geomap")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style('position', 'absolute')
        .style('opacity', 0)


        //draw svg
        svg.append("g")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .join("path")
        .attr("fill", d => {
            state = s.get(d.id).name
            if (result[states_shortcode[state]])
                return color(result[states_shortcode[state]].value)
            return '#aaa'
        })
        .attr('id', (d)=>{
            return s.get(d.id).name
        })
        .attr("d", path)
        .style("padding", "25px")
        .on('mouseover', (e,d)=>{
            Tooltip.transition().style("opacity", 1)
        })
        .on('mousemove', (e,d)=>{
            Tooltip
            .html(d.properties.name + "<br>" + "State " + d.properties.name + "<br> Cost: $" +result[states_shortcode[d.properties.name]].value.toFixed(2))
            .style("left", d3.pointer(e)[0] +20+ "px")
            .style("top", d3.pointer(e)[1] +20+ "px")

            log({
                'time': Date.now(),
                'event': "Mouse over geomap",
                'target': d.properties.name
            });
        })
        .on('mouseout', (e,d)=>{
            Tooltip.transition().style("opacity", 0)
        });;

        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-linejoin", "round")
            .attr("d", path);

    });
}

