var margin = {top: 20, right: 20, bottom: 70, left: 40},
  b_width = 900 - margin.left - margin.right,
  b_height = 600 - margin.top - margin.bottom;
// Parse the date time to the Y-m format if needed 
var	parseDate = d3.timeParse('%Y-%m'); 

//create the scale and range for the x axis 
var x = d3.scaleBand().rangeRound([0, b_width]).padding(.05); 

//create the scale and range for the y axis 
//currently set to scaleLinear for a numeric value 
var y = d3.scaleLinear().range([b_height, 0]); 
//set the position of the x axis and the tic; format 
// var xAxis = d; 

//set the position of the y axis and the tick range 
// var yAxis = ); 
//append the svg object to the html page body with the dimensions for b_width and b_height 
//append a group element to the svg 
 //move the group element to the top left margin

function drawBars(data, text_val, county=null){
  clearNode('bar')
  // console.log(Object.keys(data))
    var bar_svg = d3.select('#bar').append('svg') 
    .attr('width', b_width + margin.left + margin.right) 
    .attr('height', b_height + margin.top + margin.bottom) 
    .append('g')
    .attr('transform','translate(20,20)');
  //scale the range of the data in the domains for the axis 
  x.domain(Object.keys(data)); //TODO: update with name of field for X axis 
  y.domain([0, d3.max(Object.values(data).map(d => d.value))]); 
  
  //append the x axis to the svg 
  xAxis = bar_svg.append('g') 
    .attr('class', 'x axis') 
    .attr('transform', 'translate(0,' + b_height + ')') 
    .call(d3.axisBottom(x)) //calls the axis and lets it know its position 
  .selectAll('text') 
    .style('text-anchor', 'end') 
    .attr('dx', '-.8em') 
    .attr('dy', '-.55em') 
    .attr('transform', 'rotate(-90)' ); 
    
  //append the x axis to the svg 
  yAxis = bar_svg.append('g') 
    .attr('class', 'y axis') 
    .call(d3.axisLeft(y).ticks(20).tickFormat(d3.format(".0s")))//calls the axis
  .append('text')  
    .attr('transform', 'rotate(-90)') 
    .attr('y', 6) 
    .attr('dy', '.71em') 
    .style('text-anchor', 'end') 
    .attr('fill', 'black')
    .text('Value ($)'); 

  //tooltip for details
    // create a tooltip
    var bar_Tooltip = d3.select("#bar")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style('opacity', 0)

  //append the rectangles for the bar chart 
  bar_svg.selectAll('bar') 
    .data(Object.keys(data)) 
  .enter().append('rect') 
    .style('fill', (d)=>{
      if(d === county)
        return 'salmon'
      return 'steelblue'
    }) 
    .attr('x', function(d) { 
      return x(d); //set the its position on the X axis 
    }) 
    .attr('width', x.bandwidth()) //set b_width of the rectangle change to b_width if not using categorical variable 
    .attr('y', function(d) { 
      return y(data[d].value); //set the position on the Y axis 
    }) 
    .attr('height', function(d) { 
      return b_height - y(data[d].value);  //calculate b_height of the bar 
    })
    .on('mouseover', (e,d)=>{
      bar_Tooltip.transition().style("opacity", 1)
    })
    .on('mousemove', (e,d)=>{
        bar_Tooltip.html(d + "<br> Cost: $" +data[d].value)
        .style("left", d3.pointer(e)[0]+ "px")
        .style("top", d3.pointer(e)[1] +20+ "px")

        log({
          'time': Date.now(),
          'event': "Mouse over bar",
          'target': d
      });
    })
    .on('mouseout', (e,d)=>{
        bar_Tooltip.transition().style("opacity", 0)
    }); 

    bar_svg.append("text")
        .attr("x", ((width/2)+70))             
        .attr("y", 50 - (margin.top / 2))
        .attr("text-anchor", "right")  
        .style("font-size", "26px") 
        .style("text-decoration", "underline")  
        .text(text_val);
}
