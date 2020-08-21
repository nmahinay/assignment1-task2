$(document).ready(function(){
    $(".dropdown-trigger").dropdown()

    //initialize modal window
    $('.modal').modal();

    let username='Guest';
    
    $('#login').click(()=>{
      let user=$('#nameBox').val()
      
      if (user.length <= 0) {
        user = 'Guest'
        username = 'Guest'
        console.log('guest')
      } else {
        username = user
        console.log('Welcome '+username)
      }
      $('#user').html(username)
      let data={
        name:user
      }

      $.ajax({
        url:'/login',
        contentType:'application/json',
        data:JSON.stringify(data),
        type:'POST',
        success:function(result){
          console.log(result)
        }
      })
      alert('Welcome ' + user + '!')

    })

    $.get('/photos', function(file){
      $('#photos').empty()
      file.reverse()
      file.forEach((image)=>{
        var commentsTag = '';
        image.comment.forEach((com) =>{
          commentsTag += com.username + ': '+ com.message + '<br>'
       })


        var pattern = "photos/"
        var photoid = image._id
        console.log(photoid)
        var imagePath = image.path
        var path=imagePath.substr(imagePath.indexOf(pattern), imagePath.length)
        var appendstr = '<div class="row">'
        +'<h6 class="username">'+image.username+'</h6>'
        +'<img class="photoPost" src="'+path+'" width="480" height="360" id="'+ photoid +'">'
        +'<div class="likeCommentbtn">'
        +'<a class="waves-effect waves-light btn">Like</a>'
        +'<a id="btnCommentModal" href="#addCommentModal" data-photo-id="'+photoid+'" class="waves-effect waves-light btn modal-trigger">Add a comment</a>'
        +'</div>'
        +'<div class="Comment" id="comments" data-comment-id="'+photoid+'">'+commentsTag+'</div>'
        +'</div>'
        $('#photos').append(appendstr)
        
      })
    })

    $('#btnComment').click((e)=>{
      let message=$('#messageBox').val()
      if (username){
        let photoid = $(e.target).data('photo-id')
      let data={
          username,
          message,
          photoid
      }

      $.ajax({
        url:'/comments',
        contentType:'application/json',
        data:JSON.stringify(data),
        type:'POST',
        success:function(result){
          console.log(result)
          $('#addCommentModal').modal('close');
          $('#messageBox').val('');
          $("div[data-comment-id='"+ photoid +"']").append(result.username + ': '+ result.message + '<br>')

        }
      })
      } else {
        alert('Please log in')
      }
      
    })

    $.get('/comments', function(messages){
      $('#messages').empty()
      messages.forEach((message)=>{
        $('#messages').append('<div class="row">'+message.message+'</div>')
        
      })
    })

})

$(document).on('click', '#btnCommentModal',(e) => {
  $('#btnComment').attr('data-photo-id',$(e.target).data('photo-id'))
})