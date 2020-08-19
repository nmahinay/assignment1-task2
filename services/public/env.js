$(document).ready(function(){
    $(".dropdown-trigger").dropdown();
/*
    $('#btnUpPhoto').click(()=>{
      let photo=$('#photo').val()
      let data={
        photo
      }
    $.get('/photo',data,function(){

})

    })
    */
   
      $.get('/photos', function(file){
        $('#photos').empty()
        file.reverse()
        file.forEach((image)=>{
          //console.log(image.path)
          var pattern = "photos/"
          var imagePath = image.path
          var path=imagePath.substr(imagePath.indexOf(pattern), imagePath.length)
          var appendstr = '<div class="row">'
          +'<img src="'+path+'" width="480" height="360">'
          +'<a class="waves-effect waves-light btn">Like</a>'
          +'<div class="input-field col s12">'
          +'<input id="messageBox" type="text" class="validate">'
          +'<label class="active" for="messageBox">Message</label>'
          +'<a id="btnMessage" class="waves-effect waves-light btn">Add a comment</a>'
          +'</div>'
          +'</div>'
          //console.log(appendstr)
          $('#photos').append(appendstr)
      
        })
      })
  

      /*<div class="input-field col s12">
            <input id="messageBox" type="text" class="validate">
            <label class="active" for="messageBox">Message</label>
        </div>
        </div>
        <!--<a id="btnMessage" class="waves-effect waves-light btn">Post a message</a>-->
        <a id="btnMessage" class="waves-effect waves-light btn">Post a message</a>*/
        
        $('.modal').modal();

})

