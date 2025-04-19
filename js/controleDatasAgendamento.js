$(document).ready(function() {
    $('#data').datepicker({
      format: 'yyyy-mm-dd',
      daysOfWeekDisabled: [0],
      autoclose: true,
      todayHighlight: true,
      startDate: '0d' 
    });
  });