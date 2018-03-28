$.ajaxSetup({
  async:false
});

d3.json('/product_quantity', function(data){
  $('#product_quantity_chart').empty();
  $('#product_quantity_chart').html(_.templateFromUrl('/snippets.html', '#product_quantity_block')(
    {'result': data}));
})
