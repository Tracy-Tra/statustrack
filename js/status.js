// "statusTrack" application - WDIM355 SP13 Final Project
// coded by Tracy N. Trathen (WITH LOTS OF HELP) from Tory Adams

function task_place() {
  var tasks = JSON.parse(localStorage.tasks);
  var headers = $('#tasks-head');
  $('#tasks-table').html(headers);

  for(var task in tasks) {
    var currentitem = tasks[task];
    var row = '<tr class="'+currentitem[0].value+'">';
      for (var values in currentitem) {
        if (currentitem[values].name != 'priority') {
          //time to add values into td cells
          row += '<td>' + currentitem[values].value + '</td>';
        }
      }
    row += "<td><button class='delete'>Delete</td>";
    row += "<td style='display:none;'>" + task + "</td>";
    row += '</tr>';
    $('#tasks-table').append(row);
  }
}

function task_delete(row) {
  var key = $(row).parent().siblings('td')[9].innerText;

  var global = JSON.parse(localStorage.tasks);
  var remove = global.splice(key, 1);

  localStorage.tasks = JSON.stringify(global);
  task_place();

  document.location.reload();
}

$(document).ready(function() {

  var globalTasks = [];

  if(localStorage.tasks !== undefined) {
    globalTasks = JSON.parse(localStorage.tasks);
    task_place();
  }
  // click to delete the row - refers to task_delete function
  $('.delete').click(function() {
    task_delete(this);
  });

  $('form').submit(function(event) {
    event.preventDefault();

    // prepare form fields for saving to localStorage
    globalTasks.push($(":input").serializeArray());

    // save array 'data' to localStorage
    window.localStorage.setItem('tasks',JSON.stringify(globalTasks));

    task_place();

    // resets the form after submitted to defaults
    function clearForm() {
      $('#tasks')[0].reset();
    }

  clearForm();
  
  document.location.reload();

  });

  // keeps from refreshing the page allows jquery submission only
  $('#add').submit(function() {
    return false;
  });
  
  $(function() {
    $("#daterec").datepicker();
    $("#datedue").datepicker();
  });

});
