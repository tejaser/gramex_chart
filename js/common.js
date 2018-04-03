$.ajaxSetup({
  async: false
});

function product_quantity(filters) {
  filter_string = "";
  $.each(filters, function(key, val) {
    filter_string = filter_string + key + "=" + val + "&";
  });
  if (filter_string.length) {
    filter_string = "?" + filter_string.slice(0, -1);
  }
  console.log(filter_string);
  d3.json("/product_quantity" + filter_string, function(error, data) {
    $("#product_quantity_chart").empty();
    // console.log(data);

    data.forEach(function(d) {
      d.QUANTITY = +d.QUANTITY;
      d.TOT_PRICE = +d.TOT_PRICE;
      d.PRICE = +d.PRICE;
    });
    const width = 550;
    const height = 250;
    const xValue = d => +d.QUANTITY;
    const xLabel = "Quantity of Product";
    const yValue = d => d.TOT_PRICE;
    const yLabel = "Total Price";
    const margin = { left: 75, right: 25, top: 10, bottom: 10 };
    const innerHeight = height - margin.top - margin.bottom;
    const svg = d3
      .select("#product_quantity_chart")
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height);
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const xAxisG = g
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`);
    const yAxisG = g.append("g");
    const innerWidth = width - margin.left - margin.right;

    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", 90)
      .text(xLabel);

    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -100)
      .attr("transform", `rotate(-90)`)
      .style("text-anchor", "middle")
      .text(yLabel);

    const xScale = d3.scalePoint();
    const yScale = d3.scaleLinear();
    const xAxis = d3
      .axisBottom()
      .scale(xScale)
      .tickPadding(15)
      .tickSize(-innerHeight);

    const yTicks = 5;
    const yAxis = d3
      .axisLeft()
      .scale(yScale)
      .ticks(yTicks)
      .tickPadding(15)
      .tickFormat(d3.format(".0s"))
      .tickSize(-innerWidth);
    xScale.domain(data.map(xValue)).range([0, innerWidth]);

    yScale
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice(yTicks);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    g
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(xValue(d)))
      .attr("cy", d => yScale(yValue(d)))
      .attr("fill", d => color(d.PPC_TYPE))
      .attr("fill-opacity", 0.6)
      .attr("r", 5);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
  });
}
$("#device-filter").multiselect({
  buttonText: function() {
    return "Device";
  }
});
$("#dow-filter").multiselect({
  buttonText: function() {
    return "Day of Week";
  }
});
filters = {
  device: "DESKTOP",
  dayOfWeek: "Monday",
  default: "false",
  price: [1, 1000]
};

$(".checkbox").on("change", function() {
  var device = [];
  var dayOfWeek = [];

  var selected = $("#testing input:checked");
  $.each(selected, function(i, val) {
    device.push($(val).attr("value"));
  });

  var selectedDay = $("#dayOfWeek input:checked");

  $.each(selectedDay, function(i, val) {
    dayOfWeek.push($(val).attr("value"));
  });

  filters["device"] = "";
  filters["dayOfWeek"] = "";
  filters["device"] = device.join(",");
  filters["dayOfWeek"] = dayOfWeek.join(",");

  // console.log(filters);
  product_quantity(filters);
});
product_quantity(filters);
