// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$('.toggle_history').live('click', function() {
	var history_id = this.id.split("_");
	history_id.shift();
	history_id = '#' + history_id.join("_");

	$(history_id).toggle();

	var isShown = ($(history_id).css("display") == "none" ? false : true);

	this.innerHTML = (isShown ? "Hide History" : "Show History");

	if ( isShown ) {
		$(history_id).data('jsp').reinitialise();
	}
});

$('.toggle_stock').live('click', function() {
	var stock_id = this.id.split("_");
	stock_id.shift();
	stock_id = '#' + stock_id.join("_");

	$(stock_id).toggle();

	var isShown = ($(stock_id).css("display") == "none" ? false : true);

	this.innerHTML = (isShown ? "Hide Stock" : "Show Stock");

	if ( isShown ) {
		$(stock_id).data('jsp').reinitialise();
	}
});

var IBTapp = {};
IBTapp.Charts = {};
IBTapp.ChartData = {};
IBTapp.panels = ['div_req_','div_ass_','div_can_','div_pro_','div_alt_'];

IBTapp.showPanel = function (paneId, panelId) {
	$.each(IBTapp.panels, function(index, value) {
		var id = '#' + value + paneId;
		$(id).hide();
	});

	$('#'+panelId).show(600, function() {
			debugger;
		if (panelId.indexOf('ass') > 0) {

			if (!IBTapp.Charts["stock"+paneId]) {
				IBTapp.Charts["stock"+paneId] = new $jit.BarChart({
				  injectInto: 'chart_ibtr_' + paneId,  
				  animate: true,  
				  orientation: 'vertical',  
				  barsOffset: 1,  
				  Margin: {top:5, left: 5, right: 5,bottom:5},
				  labelOffset: 5,
				  type: 'stacked',  
				  showAggregates:true, 
				  showLabels:true, 
				  Label: {type: 'HTML', size: 10, family: 'Arial', color: 'black'}, 
				  Tips: {enable: true,  
				    onShow: function(tip, elem) {  
				      tip.innerHTML = "<span class='tooltip'><b>  " + elem.name + "</b>: " + elem.value + "  </span>";
				    }  
				  }
				});
			}

			IBTapp.Charts["stock"+paneId].loadJSON(IBTapp.ChartData["infovis"+paneId]);
		}
    
    
	});
	$('#flash_'+paneId).html('');
};

IBTapp.showAltTitle = function (paneId, panelId, titleId, ibtrId) {
  IBTapp.showPanel(paneId, panelId);
  debugger;
  $.get('/titles/qryAltTitle?' + 'queryTitleId=' + titleId+ '&ibtrId=' + ibtrId,
  function(data) {
    $('#'+panelId+' #div_srch').html(data);
  });
}

var IBTStatApp = {};
IBTStatApp.Charts = {};
IBTStatApp.ChartData = {};

IBTStatApp.showChart = function(panelId, bartype, show_aggregate){

  $('#'+panelId).show(600, function() {
			debugger;

  if (!IBTStatApp.Charts["ibtr"+panelId]) {
    IBTStatApp.Charts["ibtr"+panelId] = new $jit.BarChart({
      injectInto: panelId+'_chart_stat',  
      animate: true,  
      orientation: 'vertical',  
      barsOffset: 1,  
      Margin: {top:5, left: 5, right: 5,bottom:5},
      labelOffset: 5,
      type: bartype,  
      showAggregates:show_aggregate, 
      showLabels:true, 
      Label: {type: 'HTML', size: 10, family: 'Arial', color: 'black'}, 
      Tips: {enable: true,  
        onShow: function(tip, elem) {  
          tip.innerHTML = "<span class='tooltip'><b>  " + elem.name + "</b>: " + elem.value + "  </span>";
        }  
      }
    });
  }
  
  IBTStatApp.Charts["ibtr"+panelId].loadJSON(IBTStatApp.ChartData["infovis"+panelId]);
	});	
}

var IBThist ={}
IBThist.hide = function (paneId, panelId) {
		var id = '#' + paneId;
		$(id).hide(600);

}
IBThist.show = function (paneId, panelId) {
		var id = '#' +  paneId;
		$(id).show(600);
}
IBThist.showhide = function (showId, hideId) {

		var hideid = '#' +  hideId;
		$(hideid).hide(600);
    var showid = '#' +  showId;
		$(showid).show(600);
}
IBTapp.initSearchForm = function (option, onload) {
	if (option == 'respondent_id' || option == 'branch_id') {
		$('.ibtrSearch #branchVal').show();
		$('.ibtrSearch #searchText').hide();
	} else {
		$('.ibtrSearch #branchVal').hide();
		$('.ibtrSearch #searchText').show();
	}
};

$('.ibtrSearch #searchBy').live('change', function() {IBTapp.initSearchForm($('.ibtrSearch #searchBy').val(), false);});

IBTStatApp.initStatForm = function (option, onload) {
	if (option == 'On' || option == 'Range') {
		$('.ibtrStat #div_start_date').show();
     
    if (option == 'Range'){
      $('.ibtrStat #div_end_date').show();
		}
    else
    {
      $('.ibtrStat #div_end_date').hide();
    }
	} else {
		$('.ibtrStat #div_start_date').hide();
		$('.ibtrStat #div_end_date').hide();
	}
};

$('.ibtrStat #Created').live('change', function() {IBTStatApp.initStatForm($('.ibtrStat #Created').val(), false);});

$('#authors th a, #authors .pagination a, #authors td a').live('click', function() {
	$.getScript(this.href);
	return false;
});

$('#new_signup input[name="signup[payment_mode]"]:radio').live('change', function() {
	$('#new_signup #signup_check_div').hide();
	$('#new_signup #signup_card_div').hide();
	$('#new_signup #signup_card_no').val('');
	$('#new_signup #signup_check_no').val('');
	$('#new_signup input[name="signup[payment_mode]"]:radio:checked ~ span').show();
});

$('#new_signup #signup_coupon_id').live('change', function() {
	$.get('/signups/compute?' + 'signup_months=' + $('#signup_signup_months').val() + '&plan_id=' + $('#signup_plan_id').val() + '&coupon_id=' + $(this).val(),
		function(data) {
			$('#new_signup #payment_div').html(data);
		});

	if ( $(this).val() != '' )
		$('#new_signup #signup_coupon_no_div').show();
	else {
		$('#new_signup #signup_coupon_no_div').hide();
	};
});

var ConsignmentApp = {};
ConsignmentApp.addGood = function(goodstable) {
	alert('not implemented');
}

ConsignmentApp.removeGood = function(link) {
	$(link).prev("input[type='hidden']").val(true);
	$(link).parents("tr").hide();
};

ConsignmentApp.receiveGood = function(link) {
	$(link).prev("input[type='hidden']").val('deliver');
	$(link).parents("tr").hide();
};


function modifyMode(modeId, branch_id, start_date, end_date){
    var mode = 'T';
    if(modeId.indexOf("Un-Processed") != -1){
        mode = 'U'
    }else if(modeId.indexOf("Processed") != -1){
        mode = 'P'
    }else if(modeId.indexOf("Error") != -1){
        mode = 'E'
    }
    
    $.get('/report_details?' + 'branch_id=' + branch_id + '&modifyMode=' + mode +
        '&start_date=' + start_date + '&end_date=' + end_date,
            function(data){
               $('#signups_report_details').html(data);
            });
}

$('#refresh_signups_report').live('click', function(){
    $('#signups_report').submit();

    return false;
});

$('#signups_report').live('submit', function(){
    // flush msg box
    $('#signups_report_msg').html("");

    var start_date_month = $('#start_date_2i').val();
    if(start_date_month < 10){
        start_date_month = '0' + start_date_month.toString();
    }

    var start_date_yr = $('#start_date_1i').val().substr(2, 4);
    var end_date_yr = $('#end_date_1i').val().substr(2, 4);
        
    var start_date = $('#start_date_3i').val() + '-' +
        start_date_month + '-' + start_date_yr;

    var end_date_month = $('#end_date_2i').val();
    if(end_date_month < 10){
        end_date_month = '0' + end_date_month.toString();
    }
    var end_date = $('#end_date_3i').val() + '-' +
        end_date_month + '-' + end_date_yr;

    // make the report_details js call
    var branch_id = $('#branch_id').val();
    modifyMode('T', branch_id, start_date, end_date);

    return false;
});

$('#memberSearchform').live('submit', function() {
    var branch_id = $('#branch_id').val();
    $.get('/report_details?' + 'branch_id=' + branch_id + '&modifyMode=T' +
        '&query_text=' + $('#query_text').val(),
            function(data){
               $('#signups_report_details').html(data);
            });

            return false;
});

$('#nm_reversal a').live('click', function(){
    var signup_id = $(this).attr('signup_id');
    var nm_reversal = '#nm_reversal_' + signup_id;
    var nm_reversal_confirm = '#nm_reversal_confirm_' + signup_id;
    var nm_reversal_cancel = '#nm_reversal_cancel_' + signup_id;
    $(nm_reversal).hide(400);
    $(nm_reversal_confirm).show(1000);
    $(nm_reversal_cancel).show(1000);

    return false;
});

$('#nm_reversal_confirm a').live('click', function(){
    var report_msg = '<img src="images/ajax-loading.gif" alt="loading ... "/>';
    $('#signups_report_details').html(report_msg);

    var signup_id = $(this).attr('signup_id');
    $.get('/newMemberReversal?' + 'signup_id=' + signup_id,
        function(data){
            $('#memberSearchform').submit();
            $('#signups_report_msg').html(data);
        });       

    return false;
});


$('#nm_reversal_cancel a').live('click', function(){
    var signup_id = $(this).attr('signup_id');
    var nm_reversal = '#nm_reversal_' + signup_id;
    var nm_reversal_confirm = '#nm_reversal_confirm_' + signup_id;
    var nm_reversal_cancel = '#nm_reversal_cancel_' + signup_id;
    $(nm_reversal_confirm).hide(400);
    $(nm_reversal_cancel).hide(400);
    $(nm_reversal).show(1000);

    return false;
});


$('#nm_resend_wmail a').live('click', function(){
    var signup_id = $(this).attr('signup_id');
    var nm_resend_wmail = '#nm_resend_wmail_' + signup_id;
    var nm_resend_wmail_confirm = '#nm_resend_wmail_confirm_' + signup_id;
    var nm_resend_wmail_cancel = '#nm_resend_wmail_cancel_' + signup_id;
    $(nm_resend_wmail).hide(400);
    $(nm_resend_wmail_confirm).show(1000);
    $(nm_resend_wmail_cancel).show(1000);

    return false;
});

$('#nm_resend_wmail_confirm a').live('click', function(){    
    var report_msg = '<img src="images/ajax-loading.gif" alt="loading ... "/>';
    $('#signups_report_details').html(report_msg);
    
    var signup_id = $(this).attr('signup_id');
    $.get('/reSendWelcomeMail?' + 'signup_id=' + signup_id,
        function(data){
            $('#memberSearchform').submit();
            $('#signups_report_msg').html(data);
        });

    return false;
});


$('#nm_resend_wmail_cancel a').live('click', function(){
    var signup_id = $(this).attr('signup_id');
    var nm_resend_wmail = '#nm_resend_wmail_' + signup_id;
    var nm_resend_wmail_confirm = '#nm_resend_wmail_confirm_' + signup_id;
    var nm_resend_wmail_cancel = '#nm_resend_wmail_cancel_' + signup_id;
    $(nm_resend_wmail_confirm).hide(400);
    $(nm_resend_wmail_cancel).hide(400);
    $(nm_resend_wmail).show(1000);

    return false;
});

$('#nm_reprint_receipt a').live('click', function(){
    var signup_id = $(this).attr('signup_id');
    $.get('/rePrintReceipt?' + 'signup_id=' + signup_id,
        function(data){
            $('#re_print_receipt').html(data);
            $('#re_print_receipt').show();
            
            $('#re_print_receipt').printElement({
                overrideElementCSS:['stylesheets/print.css', { href:'stylesheets/print.css', media:'print'}],
                leaveOpen:true,
                printMode:'popup'
            });
            
            $('#re_print_receipt').hide();
        });

    return false;
});


    function computePlanTotal(){
      var sd = 0; var reg_fee = 0; var read_fee = 0; var mag_fee = 0;

      var temp = parseFloat($('#plan_security_deposit').val());
      if(!isNaN(temp))
        sd = temp;

      temp = parseFloat($('#plan_registration_fee').val());
      if(!isNaN(temp))
        reg_fee = temp;

      temp = parseFloat($('#plan_reading_fee').val());
      if(!isNaN(temp))
        read_fee = temp;

      temp = parseFloat($('#plan_magazine_fee').val());
      if(!isNaN(temp))
        mag_fee = temp;

      temp = sd + reg_fee + read_fee + mag_fee;
      $('#plan_total').html('<b>' + temp + '</b>');
    }

  $('#plan_security_deposit').live('blur', function(){
    computePlanTotal();
  });

  $('#plan_registration_fee').live('blur', function(){
    computePlanTotal();
  });

  $('#plan_reading_fee').live('blur', function(){
    computePlanTotal();
  });

  $('#plan_magazine_fee').live('blur', function(){
    computePlanTotal();
  });


$('#plans_div a').live('click', function(){

    var plan_id = $(this).attr('plan_id');
    $.get('/planDetails?' + 'plan_id=' + plan_id,
        function(data){
            $('#plan_details_div').html(data);
        });
      
      $(plans_div).hide(400);
    return false;
});

$('#duration_div a').live('click', function(){
    var plan_id = $(this).attr('plan_id');
    var signup_months = $(this).attr('signup_months');

    $.get('/totalDetails?' + 'plan_id=' + plan_id + '&signup_months=' + signup_months,
        function(data){
            $('#plan_details_div').html(data);
        });

    return false;
});


$('#backtoplans_div a').live('click', function(){
    $(backtoplans_div).hide(400);
    $(duration_div).hide(400);
    $(details_div).hide(400);
    $(plans_div).show(600);    

    return false;
});
