

var penpromise= d3.json("penguins/classData.json")

penpromise.then(
function(data)
{
    var quizdata = quizgrade(data);
    console.log(quizdata);
    seth1("Graph of the Quizes");
    setup(quizdata);
},
    
function(err)
{
    seth1("No penguin");
});

var seth1 = function(message)
{
    d3.select("h1").text(message);
}


var quizgrade = function(classroom)
{
    var quizdata = classroom.map(quizmap)
    return quizdata
}

var quizmap = function(penguin)
{
    var allquiz = penguin.quizes.map(getGrade)
    penguin.qgrade=allquiz
    return penguin
}


var getGrade = function(quiz)
{
    return quiz.grade
}


var screen = {width:800,height:500}
var margins={top:10,right:50,bottom:50,left:50}

var setup=function(classroom)
{
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g")
    .attr("id","graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width=screen.width-margins.left-margins.right
    var height=screen.height-margins.top-margins.bottom
    
    var xScale=d3.scaleLinear()
    .domain([0,37])
    .range([0,width])
    
    var yScale=d3.scaleLinear()
    .domain([0,10])
    .range([height,0])

    var cScale=d3.scaleOrdinal
    
    var xAxis=d3.axisBottom(xScale)
    var yAxis=d3.axisLeft(yScale)
    
    d3.select("svg")
    .append("g")
    .classed("axis",true);
    
    d3.select(".axis")
    .append("g")
    .attr("id","xAxis")
    .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
        d3.select(".axis")
    .append("g")
    .attr("id","yAxis")
    .attr("transform","translate(25,"+margins.top+")")
    .call(yAxis)
    
    drawpath(classroom,xScale,yScale)
    
}

var drawpath=function(classroom,xScale,yScale)
{
    
    
    var arrays=d3.select("#graph")
    .selectAll("g")
    .data(classroom)
    .enter()
    .append("g")
    .attr("id","line")
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width", 2.5)
    .on("mouseover",function(d,index)
    {
                 info(classroom,index)
                 })
    
    var lineGenerator=d3.line()
    .x(function(num,index){return xScale(index)})
    .y(function(num){return yScale(num)})
    .curve(d3.curveNatural)
    
    arrays
    .append('path')
    .datum(function(obj){return obj.qgrade})
    .attr("d",lineGenerator)
}

var info=function(classroom)
{
    d3.select("div")
    .selectAll("img")
    .data(classroom)
    .enter()
    .append("img")
    .attr("src",function(d,i){return d.picture})
}

