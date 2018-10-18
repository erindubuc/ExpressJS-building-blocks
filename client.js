$(function(){
    
    // ajax call - request to /blocks (returns blocks in JSON)
    $.get('/blocks', appendToList);
    
    function appendToList(blocks) {
        // creates an empty array list and an li element for each one
        var list
        var content, block;
        for (var i in blocks){
            block = blocks[i];
            // replacing text block name with a link element
            // when we click the link we'll be taken to the page which displays the block description
            content = '<a href="/blocks/'+block+'">'+block+'</a>';
            list.push($('<li>', { html: content }));
            }
            $('.block-list').append(list);
        }
    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize();
        // serialize transforms form data to URL encoded notation so Express app can parse it back to javascript
        
        // we send this data in the data property of ajax call
        $.ajax({
            type: 'POST', url: '/blocks', data: blockData}).done(function(blockName){
                appendToList([blockName]);
                // expects an array 
                form.trigger('reset');
                // this function cleans up form text input fields
                });
        }
    });