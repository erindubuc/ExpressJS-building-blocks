
/*global $*/
$(function(){
    
    // ajax call - request to /blocks (returns blocks in JSON)
    $.get('/blocks', appendToList);
    
    // need to add an event listener to submit event on form element
    $('form').on('submit', function(event) {
        event.preventDefault();
        
        var form = $(this);
        var blockData = form.serialize();
        // serialize transforms form data to URL encoded notation so Express app can parse it back to javascript
        
        // we send this data in the data property of ajax call
        $.ajax({
            type: 'POST', url: '/blocks', data: blockData
            }).done(function(blockName){
                appendToList([blockName]);
                // expects an array 
                form.trigger('reset');
                // this function cleans up form text input fields
                });
        });
    
    function appendToList(blocks) {
        // creates an empty array list and an li element for each one
        var list
        var content, block;
        for (var i in blocks){
            block = blocks[i];
            // replacing text block name with a link element
            // when we click the link we'll be taken to the page which displays the block description
            content = '<a href="/blocks/'+block+'">'+block+'</a> '+'<a href="#" data-block="'+block+'"><img src="del.jpg" width="15px"></a>';
            list.push($('<li>', { html: content }));
            }
            $('.block-list').append(list)
            
        }
        
        
        $('.block-list').on('click', 'a[data-block]', function(event) {
        // confirm delete request
       if (!confirm('Are you sure?')) {
           return false;
       } 
       
       // link that triggered delete event, wrap in jquery object,
       // then assign to variable target
       var target = $(event.currentTarget);
       
       // make ajax delete request
       $.ajax({
          type: 'DELETE', 
          url: '/blocks/' + target.data('block') 
       }).done(function() {
           // remove li containing lisnk
           target.parents('li').remove();
       });
    });
    

});