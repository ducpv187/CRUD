$(document).ready(function() {
  $(".js-add").click(function() {  
    let valueQr = $("#qr").val();
    let valueName = $("#name").val(); 
    let valuePrice = $("#price").val(); 
    
    //function load_ajax()-> add values in Data api
    function load_ajax_add() {
      //post value ajax api
      $.ajax({
        type: "POST",
        url: "https://63a56082318b23efa791bf88.mockapi.io/api/crud",
        data: {
          qr: valueQr,
          name: valueName,
          price: valuePrice
        },
        success: function (data){
          // Note: Mỗi lần add data-> reload lại trang-> update data mới
            window.location.reload();
         }
      });
    }
    load_ajax_add();
  }); 

  //Note:  $(document).on('click','.js-delete',function(){  }); -> luôn luôn có thể click đến đối tượng mình muốn bắt sự kiện -> không cần quan tâm là đã đc sinh ra  class đó hay chưa (có những class đc sinh ra khi chạy hêt một sự kiện vdu : ajax -> call -> sinh ra class )
  // - $("").click(function() {  } -> chỉ chạy đc khi mà đã có sẵn class cố định(thường là fix cố định ở html ) -> cái đổi tượng mà mình muốn bắt skien 

  
  $(document).on('click','.js-delete',function(){
    let idValue= $('.js-delete').attr('id')    
    $.ajax({
      url: `https://63a56082318b23efa791bf88.mockapi.io/api/crud/${idValue}`,
      type: 'DELETE',
      success: function(data) {        
        window.location.reload();
        // console.log(data)
      }
    });
    // console.log("hih");
  });

  //Call data Api 
  $.ajax({
    type: "GET",
    url: "https://63a56082318b23efa791bf88.mockapi.io/api/crud",
    // data: {"data":"check"},
    success: function(data){
      renderData(data);
      console.log(data);      
    }
  });
  //Render Data in web
  function renderData(data){
    $.each(data, function( index, value ) {
    let dataShow = `
      <tr>
        <td>${value.id}</td>
        <td>${value.qr}</td>
        <td>${value.name}</td>
        <td>${value.price}</td>
        <td class="action">
          <span class="js-change">Sửa</span>
          <span class="js-delete" id="${value.id}" >Xóa</span>
        </td>                  
      </tr>`;  
      $(".table .tbody").append(dataShow);
    });    
  }
});