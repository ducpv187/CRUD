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
          // Note: Click add Value  -> reload page -> render page have new data
            window.location.reload();
         }
      });
    }
    load_ajax_add();
  }); 

  //Note:  $(document).on('click','.js-delete',function(){  }); -> luôn luôn có thể click đến đối tượng mình muốn bắt sự kiện -> không cần quan tâm là đã đc sinh ra  class đó hay chưa (có những class đc sinh ra khi chạy hêt một sự kiện vdu : ajax -> call -> sinh ra class )
  // - $("").click(function() {  } -> chỉ chạy đc khi mà đã có sẵn class cố định(thường là fix cố định ở html ) -> cái đổi tượng mà mình muốn bắt skien 

  // Delete value
  $(document).on('click','.js-delete',function(){
    let idDelete= $(this).attr('id');  
    console.log(idDelete);
    $.ajax({
      url: `https://63a56082318b23efa791bf88.mockapi.io/api/crud/${idDelete}`,
      type: 'DELETE',
      success: function(data) {        
        window.location.reload();     
      }
    });
  });

  // Edit value
  $(document).on('click','.js-change',function(){
    let idChange = $(this).attr('id');
    // console.log(idChange,"change");

    // render data vào lại ô input nhập
    $.ajax({
      type: "GET",
      url: "https://63a56082318b23efa791bf88.mockapi.io/api/crud",
      success: function(data){
          // console.log(idChange);          
          $.each(data, function( index, value ) {
            // console.log(value.id);
            if( idChange == value.id){
              let valueInput = `
              <div class="form_value">
                <div class="fied">
                  <label for="">Ma Sp</label>
                  <input type="text" name="qr" id="qr" value="${value.qr}">
                </div>
                <div class="fied">
                  <label for="">Ten</label>
                  <input type="text" name="name" id="name"  value="${value.name}">
                </div>
                <div class="fied">
                  <label for="">Gia</label>
                  <input type="number" name="price" id="price"  value="${value.price}">
                </div>
              </div>
              <button class="add_item--btn js-add">Add</button>
              `;  
              $(".form_value").empty();                      
              $(".form_value").append(valueInput);            
            }             
          });  
        }
    });
  });

  $(document).on('click','.js-add',function(){ 
    let QrChange = $("#qr").val();
    let NameChange = $("#name").val(); 
    let PriceChange = $("#price").val(); 
    let idBtnChange= $(this).parents(".main_content").find(".list_item .js-change").attr('id'); 
    // console.log(QrChange);
    // console.log(idBtnChange);
    $.ajax({
      type: "PUT",
      url: `https://63a56082318b23efa791bf88.mockapi.io/api/crud/${idBtnChange}`,
      data: {
        qr:  QrChange,
        name: NameChange,
        price: PriceChange
      },
      success: function (data){   
        window.location.reload();                    
      }
    });
   });






  //Call data Api 
  $.ajax({
    type: "GET",
    url: "https://63a56082318b23efa791bf88.mockapi.io/api/crud",
    success: function(data){
      renderData(data);
      // console.log(data);      
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
          <span class="js-change" id="${value.id}">Sửa</span>
          <span class="js-delete" id="${value.id}">Xóa</span>
        </td>                  
      </tr>`;  
      $(".table .tbody").append(dataShow);
    });    
  }
});