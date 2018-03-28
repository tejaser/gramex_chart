$.ajaxSetup({
  async:false
});

d3.json('/product_quantity', function(data){
  $('#product_quantity_chart').empty();
  console.log(data)
})
