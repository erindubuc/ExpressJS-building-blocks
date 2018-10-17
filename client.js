$(function(){
    
    // ajax call - request to /blocks (returns blocks in JSON)
    $.get('/blocks', appendToList);
    
    function appendToList(blocks) {
        // creates an empty array list and an li element for each one
        var list = [];
        for (var i in blocks){
            list.push($('<li>', { text: blocks[i] }));
            }
            $('.block-list').append(list);
        }
    });