

var penpromise= d3.json("penguins/classData.json")

penpromise.then(
function(penguin)
{
    console.log("penguin",penguin);
    seth1("Graph of the Quizes");
    setup(penguin);
},
function(err)
{
    seth1("No penguin");
});

var seth1 = function(message)
{
    d3.select("h1").text(message);
}


var getquiz=function(quiz)
{
    return quiz.grade
}

var getQuiz=function(penguin)
 {
     return penguin.quizes.map(getquiz)
 }

var screen = {width:800,height:500}
var margins={top:10,right:50,bottom:50,left:50}

var setup=function(penguin)
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
    

    drawpath(penguin,xScale,yScale,cScale)
    
}

var drawpath=function(penguin,xScale,yScale,cScale)
{
    
    var quizes = penguin.map(function(penguin){
        return penguin.quizes;
    })
    var quizGrades = quizes.map(function(quiz){
        return quiz.grade;
    })
    
    
    var arrays=d3.select("#graph")
    .selectAll("g")
    .data(penguin)
    .enter()
    .append("g")
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width", 3)
    .attr("stroke",function(quizes)
       {
        return cScale(quizes.name);
    })
    .attr("stroke-width",3)
    
    var lineGenerator=d3.line()
    .x(function(num,index){return xScale(index)})
    .y(function(num){return yScale(num)})
    .curve(d3.curveNatural)
    
    arrays
    .append('path')
    .datum(function(obj){return obj.quizes})
    .attr("d",lineGenerator)
    
}