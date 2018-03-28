$.ajaxSetup({
  async:false
});

d3.json('/product_quantity', function(error, data){
  $('#product_quantity_chart').empty();
  console.log(data)
  data.forEach(function(d) {
    d.QUANTITY = +d.QUANTITY;
    d.TOT_PRICE = +d.TOT_PRICE;
    d.PRICE = +d.PRICE;
  })

  var xMax = d3.max(data,  function(d) {return d.QUANTITY})
  var xExtent = d3.extent(data, d => d.QUANTITY)
  console.log(xMax, xExtent)

  // console.log(data)
})
