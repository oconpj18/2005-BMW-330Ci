/*
 * This is the array reference which will hold all open vins
 */
var closeArray = new Array();
var openArray = new Array();

function expandAll(){
addToOpenArray();
	
	
	var x=0;
	for(x; x < openArray.length; x++){
		reportAll = openArray[x];
		addToCloseArray(reportAll);
		var image=reportAll + "I";
		if (document.getElementById && ((layer = document.getElementById(reportAll)) != null))
		{
		layer.style.position = "relative";
		layer.style.visibility = "visible";
		layer.style.display="";
		document.getElementById(image).src="/members/img/minus.gif";
		}
		
	}
	
	openArray = new Array();
	
  	}
  	

/* 
 *  This will close all reports which are "visable" and will then
 *  reset the array back to zero .
 */
function closeAll(){
	var imageKey = "I";
	var x=0;
	var report;
	for(x; x < closeArray.length; x++){
	
		
	    report = closeArray[x];
		hideSubLayers(report.substring(1,report.length), imageKey);
		hideLayer(document.getElementById(report), report + imageKey);
		
	}
	closeArray = new Array();
}


/*
 * This will add the the report to the closeArray to be used
 * by the close all method.  This will not add the report 
 * if the report is already present.
 */
function addToCloseArray(report){

	var add = true;
	var x=0;
	//alert("addToCloseArray:report:" + report);
	for(x; x < closeArray.length; x++){
		//alert("[x]:"+ [x]);
		var foo = closeArray[x];
		if(foo == report){
			add = false;
			break;
		}
	}
	if(add){
		closeArray[x] = report;
	}	
}

function addToOpenArray(){
var x=0;
var y=0;

if(document.printActionForm.multipleFullVins && document.printActionForm.multipleFullVins.length == undefined){
           
       var reportFull="F"+document.printActionForm.multipleFullVins.value;
       openArray[x] = reportFull;
       x++;
}


if(document.printActionForm.multipleSummaryVins && document.printActionForm.multipleSummaryVins.length == undefined  ){
       
       var reportSumm="S"+document.printActionForm.multipleSummaryVins.value;
       openArray[x] = reportSumm;
       x++;
      
}

if(document.printActionForm.multipleAccidentVins && document.printActionForm.multipleAccidentVins.length == undefined){
    
    var reportAccident="A"+document.printActionForm.multipleAccidentVins.value;
    openArray[x] = reportAccident;
}

if(document.printActionForm.multipleFullVins && document.printActionForm.multipleFullVins.length != undefined)
{
for(y;y<document.printActionForm.multipleFullVins.length;y++){
var reportFull="F"+document.printActionForm.multipleFullVins[y].value;
	var add = true;
for(x; x < openArray.length; x++){
		var foo = openArray[x];
		if(foo == reportFull){
			add = false;
			break;
		}
	}
	if(add){
		openArray[x] = reportFull;
	}
	
}
}

var z=0;
//alert("multipleSummaryVins:" + document.printActionForm.multipleSummaryVins);
if(document.printActionForm.multipleSummaryVins && document.printActionForm.multipleSummaryVins.length != undefined)
{

for(z;z<document.printActionForm.multipleSummaryVins.length;z++){
var add = true;
var k=0;
var reportSumm="S"+document.printActionForm.multipleSummaryVins[z].value;
//alert("reportSumm:" + reportSumm);
for(k; k < openArray.length; k++){
		var foo = openArray[k];
		if(foo == reportSumm){
			add = false;
	break;
		}
	}

	if(add){

	
		openArray[k] = reportSumm;

	}
}
}

var c=0;
  if(document.printActionForm.multipleAccidentVins && document.printActionForm.multipleAccidentVins.length != undefined)
  {
 
    for(c;c<document.printActionForm.multipleAccidentVins.length;c++){
      var add = true;
      var r=0;
      var reportAccident="A"+document.printActionForm.multipleAccidentVins[c].value;
      for(r; r < openArray.length; r++){
        var foo = openArray[r];
        if(foo == reportAccident){
		  add = false;
	      break;
		}
	  }
	  
      if(add){
        openArray[r] = reportAccident;
      }
    }
  }


}

/*
 * This will hide/display a layer that corresponds to a +(show) or -(hide) image
 * on the Report Dashboard.  This will hide the "other" layer if visable.  This is used
 * to display the reports
 *
 * @param String key             VIN which will identify the unique layer/image
 * @param String imageType       Indicator for which an image is denoted.
 * @param String reportType      Full or Summary report 
 *
 */
function toggleDashboard(key, imageKey, reportType){

  	var FULL = "F";
  	var SUMMARY = "S";
  	var ACCIDENT = "A";
  
  	//primary layer which is chosen by the user click
  	var report = reportType + key;
  	var image = reportType + key + imageKey;
  
  	// secondary layer
  	var altReport;
  	var altImage; 
  	
  	//third layer
  	var thirdReport;
  	var thirdImage;
  	
  	//altReport, thirdReport are set as the following:
  	//reportType = FULL
  	//		altReport = SUMMARY
  	//		thirdReport = ACCIDENT
  	//reportType = SUMMARY
  	//		altReport = ACCIDENT
  	//		thirdReport = FULL
  	//reportType == ACCIDENT
  	//		altReport = FULL
  	//		thirdReport = SUMMARY
  	
  	//used for AltReport and thirdReport
  	if(reportType == FULL){
    	altReport = SUMMARY + key;
    	altImage = SUMMARY + key + imageKey;
    	
    	thirdReport = ACCIDENT + key;
    	thirdImage = ACCIDENT + key + imageKey;
  	}
  	else if(reportType == SUMMARY){
  	    altReport = ACCIDENT + key;
  	    altImage = ACCIDENT + key + imageKey;
  	    
  	    thirdReport = FULL + key;
  	    thirdImage = FULL + key + imageKey;
  	}
  	else if(reportType == ACCIDENT){
  	    altReport = FULL + key;
  	    altImage = FULL + key + imageKey;
  	    
  	    thirdReport = SUMMARY + key;
  	    thirdImage = SUMMARY + key + imageKey;
  	}
  	else {
    	alert("invalid report type");
  	}
  
  	var layer;
  	//alert("elementById(report)" + document.getElementById(report));
  	//alert("visibility:" + document.getElementById(report));
  	if (document.getElementById && ((layer = document.getElementById(report)) !== null)) {
  		//alert("here going to check visibility");
    	//Hide Layer selected
  		if (layer.style.visibility == "visible") {
  			//alert("visible");
        	//Hide all subreports if closing Full
        	if(reportType == FULL){
        		hideSubLayers(key, imageKey);
 	    	}
 	    	//hide primary layer
        	
 	    	hideLayer(layer, image);
 	    	
 	      
    	} else {
    		//alert("not visible");
	    	//Display Layer Selected
        	showLayer(layer, image);
        	
        	
        	addToCloseArray(report);
       		
        	//alert("going to hide second layer");
        	//hide secondary layer
        	if((document.getElementById(altReport) !== null)){
        		//alert("altReport != null:hideLayert(altReport)" + document.getElementById(altReport));
          		hideLayer(document.getElementById(altReport), altImage);
          		//alert("altReport != null:hideLayer(thirdReport)" + document.getElementById(thirdReport));
          		hideLayer(document.getElementById(thirdReport), thirdReport);
          
          		//alert("hide secondary layer");
          		//close all sub reports if is expanded w/ full present.
          		// ensures the sublayer are reduced.
          		if(reportType == SUMMARY){
          			//alert("report type is SUMMARY: hideSubLayers");
					hideSubLayers(key, imageKey);
 	      		}
        	}
        	
        	//hide third layer
        	if((document.getElementById(thirdReport) !== null)){
          		hideLayer(document.getElementById(thirdReport), thirdImage);
          
          		//alert("hide third layer");
          		//close all sub reports if is expanded w/ full present.
          		// ensures the sublayer are reduced.
          		if(reportType == ACCIDENT){
          			//alert("report type is ACCIDENT: hideSubLayers");
					hideSubLayers(key, imageKey);
 	      		}
        	}
        	
        	
    	}
  	}
}

/*
 * This will hide/display a layer that corresponds to a +(show) or -(hide) image.
 * This will be used for the sub-sections that are associated w/ a Full Report
 *
 * @param String key             VIN which will identify the unique layer/image
 * @param String imageType       Indicator for which an image is denoted.
 * @param String subReportType   Indicator for which the sub-section is denoted.
 *
 */
function toggleDiv(key, imageKey, subReportType){
	var layerId = subReportType + key;
	var imageId = subReportType + key + imageKey;
    var layer;
    if (document.getElementById && ((layer = document.getElementById(layerId)) != null)) {   
     
      	if (layer.style.visibility == "visible") {
        	//Hide selected Layer
 	      	hideLayer(layer, imageId);
      	} else {
	        //Display selected layer
          	showLayer(layer, imageId);
      	}
  	}
  	
}


function toggleDivScore(key, imageKey, subReportType){
	var layerId = subReportType + key;
	var imageId = subReportType + key + imageKey;
    var layer;
    if (document.getElementById && ((layer = document.getElementById(layerId)) != null)) {   
    
      	if (layer.style.visibility == "visible" || layer.style.visibility == "") {
        	//Hide selected Layer
        	
 	      	hideLayerScore(layer, imageId);
      	} else {
	        //Display selected layer
	       
          	showLayerScore(layer, imageId);
      	}
  	}
  	
}

function toggleDivScoreIC(key, imageKey, subReportType, serverPath){
	var layerId = subReportType + key;
	var imageId = subReportType + key + imageKey;
    var layer;
  
    if (document.getElementById && ((layer = document.getElementById(layerId)) != null)) {   
     
      	if (layer.style.visibility == "hidden" || layer.style.visibility == "") {
      		 //Display selected layer
 	       
          	showLayerScoreIC(layer, imageId,serverPath);
      	} else {
	       
            //Hide selected Layer
        	
 	      	hideLayerScoreIC(layer, imageId,serverPath);
      	}
  	}
  	
}


function toggleDivScoreInfo(key, imageKey, subReportType){
	var layerId = subReportType + key + "A";
	var layerId1 = subReportType + key + "B";
	var imageId = subReportType + key + imageKey;
    var layer;
    var layer1;
    
    if (document.getElementById && ((layer = document.getElementById(layerId)) != null)) {   
     
      	if (layer.style.visibility == "visible" || layer.style.visibility == "") {
        	//Hide selected Layer
 	      	hideLayerScore(layer, imageId);
      	} else {
	        //Display selected layer
          	showLayerScore(layer, imageId);
      	}
  	}
  	
  	if (document.getElementById && ((layer1 = document.getElementById(layerId1)) != null)) {   
     
      	if (layer1.style.visibility == "visible" || layer1.style.visibility == "") {
        	//Hide selected Layer
 	      	hideLayerScore(layer1, imageId);
      	} else {
	        //Display selected layer
          	showLayerScore(layer1, imageId);
      	}
  	}
  	
}


/*
 * this was added for integrated content(ebay) needed to pass in server path for images and default was section
 * hidden
 */

function toggleDivScoreInfoIC(key, imageKey, subReportType, serverPath){
	var layerId = subReportType + key + "A";
	var layerId1 = subReportType + key + "B";
	var imageId = subReportType + key + imageKey;
    var layer;
    var layer1;
    
    if (document.getElementById && ((layer = document.getElementById(layerId)) != null)) {   
     
      	if (layer.style.visibility == "hidden" || layer.style.visibility == "") {
      		 //Display selected layer
          	showLayerScoreIC(layer, imageId, serverPath);
      	} else {
      	//Hide selected Layer
 	      	hideLayerScoreIC(layer, imageId, serverPath);
	       
      	}
  	}
  	
  	if (document.getElementById && ((layer1 = document.getElementById(layerId1)) != null)) {   
     
      	if (layer1.style.visibility == "hidden" || layer1.style.visibility == "") {
      	   //Display selected layer
          	showLayerScoreIC(layer1, imageId, serverPath);
      	} else {
      	   //Hide selected Layer
 	      	hideLayerScoreIC(layer1, imageId, serverPath);
	        
      	}
  	}
  	
}



/**
 * This is used to hide all the sub-sections of a full report 
 * which were expanded and viewed.  This needs to happen otherwise
 * the subsections will remain visiable when you hide the full report.
 * Each layered is called inorder to insure all layers are hidden.
 *
 * @param String key             VIN which will identify the unique layer/image
 * @param String imageType       Indicator for which an image is denoted.
 */
function hideSubLayers(key, imageKey) {
	//
	if((layer = document.getElementById("TC" + key)) != null && 
		layer.style.visibility == "visible"){
		hideLayer(layer, "TC" + key + imageKey);
	}
    if((layer = document.getElementById("PC" + key)) != null && 
		layer.style.visibility == "visible") {
		hideLayer(layer, "PC" + key + imageKey);
	}
	if((layer = document.getElementById("OC" + key)) != null && 
		layer.style.visibility == "visible") {
		hideLayer(layer, "OC" + key + imageKey);
	}
	if((layer = document.getElementById("VI" + key)) != null && 
		layer.style.visibility == "visible") {
		hideLayer(layer, "VI" + key + imageKey);
	}
	if((layer = document.getElementById("FH" + key)) != null && 
		layer.style.visibility == "visible") {
		hideLayer(layer, "FH" + key + imageKey);
	}
}



function hideSubLayersScore(key, imageKey) {
	//
    if((layer = document.getElementById("TC" + key)) != null && 
		layer.style.visibility == "visible"){
		hideLayerScore(layer, "TC" + key + imageKey);
	}
    if((layer = document.getElementById("PC" + key)) != null && 
		layer.style.visibility == "visible") {
		hideLayerScore(layer, "PC" + key + imageKey);
	}
	if((layer = document.getElementById("OC" + key)) != null && 
		layer.style.visibility == "visible") {
		hideLayerScore(layer, "OC" + key + imageKey);
	}
	if((layer = document.getElementById("VI" + key)) != null && 
		layer.style.visibility == "visible") {
		hideLayerScore(layer, "VI" + key + imageKey);
	}
	if((layer = document.getElementById("FH" + key)) != null && 
		layer.style.visibility == "visible") {
		hideLayerScore(layer, "FH" + key + imageKey);
	}
}



/*
 * This will hide the layer passed to method and will change
 * the corresponding image to it "show" status.
 */
function hideLayer(layer, image) {
	layer.style.position = "absolute";
 	layer.style.visibility = "hidden";
 	layer.style.display ="none";
    document.getElementById(image).src="/members/img/plus.gif";
}


/*
 * This will Show the layer passed to method and will change the 
 * corresponding image to the "hide" status.
 */
function showLayer(layer, image){
	//alert("here in showLayer:" + layer);
    layer.style.position = "relative";
    layer.style.visibility = "visible";
    layer.style.display="";
    document.getElementById(image).src="/members/img/minus.gif";	
}

/*
 * This will hide the layer passed to method and will change
 * the corresponding image to it "show" status.
 */
function hideLayerScore(layer, image) {
    layer.style.position = "absolute";
 	layer.style.visibility = "hidden";
 	layer.style.display ="";
    document.getElementById(image).src="/members/report/scoreReport/img/show_details.jpg";
}


/*
 * This will Show the layer passed to method and will change the 
 * corresponding image to the "hide" status.
 */
function showLayerScore(layer, image){
    layer.style.position = "relative";
    layer.style.visibility = "visible";
    layer.style.display="";
    document.getElementById(image).src="/members/report/scoreReport/img/hide_details.jpg";
}



/*
 * This will hide the layer passed to method and will change
 * the corresponding image to it "show" status.  This is for Integrated content (ebay)
 * this needs to pass the serverpath to find the image change
 */
function hideLayerScoreIC(layer, image, serverPath) {
    layer.style.position = "absolute";
 	layer.style.visibility = "hidden";
 	layer.style.display ="";
    document.getElementById(image).src=serverPath + "report/scoreReport/img/show_details.jpg";
}


/*
 * This will Show the layer passed to method and will change the 
 * corresponding image to the "hide" status.This is for Integrated content (ebay)
 * this needs to pass the serverpath to find the image change
 */
function showLayerScoreIC(layer, image, serverPath){
    layer.style.position = "relative";
    layer.style.visibility = "visible";
    layer.style.display="";
    document.getElementById(image).src=serverPath + "report/scoreReport/img/hide_details.jpg";
}



/*
 *  This will use one button to check all and uncheck all for pages 
 *  that have checkboxes.  This can handle the sending of single 
 *  checkbox object or array of checbox objects.
 *
 *  @param Object Reference (document.nameOfForm.NameOfCheckBox(s)
 *
 */
function selectCheckBoxes(boxes,type) { 
    // If no check boxes are present, this will prevent 
    // a javascript error and eliminates having to add logic
    // to jsp on wheather to show/not show button(s)
    try {
      boxes.length
    } catch(exception){
      return;
    }
    printType=type;
    
    // will check/uncheck the checkbox if only one checkbox 
    // is present.  This is needed because if there is only
    // one checkbox on the page, the javascript call will not 
    // send an Array of checkboxes and the single check box will
    // not be selected. 
    if( boxes.length == undefined){
        if(boxes.checked == true){
          boxes.checked = false;
        } else {
          boxes.checked = true
        }
    }
    
    // Counts the number of checkboxes selected.  This is 
    // used to determin if we should unselect all or select all
    var checked = 0;
    var totalCheckBoxes = boxes.length;
    //alert("boxes length = " + boxes.length);
    for( x=0; x < boxes.length; x++){
      if(boxes[x].checked == true){
        checked = checked + 1;
      }
    }
    //alert("checked = " + checked + "   totalCheckBoxes = " + totalCheckBoxes);
    
    if(checked == totalCheckBoxes){
      //unchecks all checkboxes
      for( x=0; x < boxes.length; x++){
          boxes[x].checked = false;
      }
    } else {
      //checks all checkboxes
      for( x=0; x < boxes.length; x++){
          boxes[x].checked = true;
      }
    }
 
}  
//porsche wants a certificate printed with every full report.
//this checks what full porsche vin is selected and selects the bbp option.
function checkCertIfSpecial(id,specialReport,bbp) {
  
  var count = 0;
  var oneVin="false";
 
 if(specialReport == "POR"){ 
    if(bbp.value == id){
      oneVin="true";
    }
   for( x=0; x < bbp.length; x++){
       if(id == bbp[x].value){
           count = x;
      }
   }
  
//need to use oneVin because passes 1 vin verses array if only 1 vin
    if(oneVin=="false"){
      bbp[count].checked = true;
     }
     else {
     bbp.checked = true;
     }  
  }
 
}
function checkCpoCertIfSpecial(id,specialReport,cpobbp) {
	  
	  var count = 0;
	  var oneVin="false";
	 
	 if(specialReport == "POR"){ 
	    if(cpobbp.value == id){
	      oneVin="true";
	    }
	   for( x=0; x < cpobbp.length; x++){
	       if(id == cpobbp[x].value){
	           count = x;
	      }
	   }
	  
	//need to use oneVin because passes 1 vin verses array if only 1 vin
	    if(oneVin=="false"){
	      cpobbp[count].checked = true;
	     }
	     else {
	     cpobbp.checked = true;
	     }  
	  }
	 
	}


function clearInputBox(formField, text){
  var x = formField.value;
  if(formField.value == text){
    formField.value="";
  }
}

function newWindow(the_win){
	opener_win = window.open(the_win,"Layout","toolbar=no,location=no,scrollbars=yes,resizable=yes,width=650,height=440");
	opener_win.focus();
	opener_win.moveTo(50,50);
}

function newWindowNav(the_win){
	opener_win = window.open(the_win,"Layout","menubar=1, location=no,scrollbars=yes,resizable=1,width=650,height=440");
	opener_win.focus();
	opener_win.moveTo(50,50);
}

function newBigWindowNav(the_win){
	opener_win = window.open(the_win,"Layout","toolbar=yes,location=no,scrollbars=yes,resizable=yes,width=775,height=440");
	opener_win.focus();
	opener_win.moveTo(50,50);
}

function newMediumWindow(the_win){
	opener_win = window.open(the_win,"Layout","toolbar=no,location=no,scrollbars=no,resizable=yes,width=600,height=275");
	opener_win.focus();
	opener_win.moveTo(50,50);
}


String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };
/*
 *  This is used on the dashboard to change the 
 *  bottom set of language code values (if the top is changed)
 *  and vice versa.
 *
 *
 */
function setRadioField(radioChanged,radioToChange)
{
    var str = radioChanged.value;
	str = str.trim();
	var theLength = str.length;
		
	radioToChange.value = radioChanged.value;

	for(var i = 0; i < theLength; i++) {
	    radioToChange[i].checked = false;
		if(radioToChange[i].value == radioChanged.value) {
		    radioToChange[i].checked = true;
        }
	}   
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; 
  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) 
  x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; 
  if(d.images){ 
    if(!d.MM_p){
       d.MM_p=new Array();
    }
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; 
    for(i=0; i<a.length; i++)
      if (a[i].indexOf("#")!=0){ 
        d.MM_p[j]=new Image; 
        d.MM_p[j++].src=a[i];
      }
    }
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  
  if(!d){
     d=document; 
  }
  if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; 
    n=n.substring(0,p);
  }
  if(!(x=d[n])&&d.all){
     x=d.all[n];
  } 
  for (i=0;!x&&i<d.forms.length;i++)
    x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) 
    x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) 
    x=d.getElementById(n); 
  return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; 
  document.MM_sr=new Array; 
  for(i=0;i<(a.length-2);i+=3)
    if ((x=MM_findObj(a[i]))!=null){
      document.MM_sr[j++]=x; 
      if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];
    }
}

/*
 *  This is used on the POS page
 *
 */
function newWindowPrintNav(the_win){
	opener_win = window.open(the_win,"Layout","menubar=1, location=no,scrollbars=yes,resizable=1,width=650,height=440");
	opener_win.focus();
	opener_win.moveTo(50,50);
}

function printCertificates(posform, porscheImg, autoCheckImg, bothImg) {
	if(posform.isAutoCheckBranded.checked == true && posform.isPorscheBranded.checked == true){
		newWindowPrintNav(bothImg);
	} else if (posform.isAutoCheckBranded.checked == true){
		newWindowPrintNav(autoCheckImg);
	} else if (posform.isPorscheBranded.checked == true){
		newWindowPrintNav(porscheImg);
	} else {
		alert("Please check the box to select the branding of the certificate.");
	}
}

/*
* method is used to check if member has clicked bill usage multiple times
*/
var clicked = true;
function checkClicks(count)
 {
     if (clicked == false)
	{
	     alert("Your request has already been processed.");
	     return false;
	 }
	  
	 if (clicked == true)
	 {
	     clicked = false;
	     return true;
	  }
}

/*
* Method is used to check if member has clcked any vins prior to printing. It is called
* from the report dashboard or from the usage dashboard.  The report dashboard
* may pass full, summary, certificate (bbp), or window sticker. The usage dashboard
* will only pass full or summary.  
* 
*/
function checkVinPrint(fullBoxes, summaryBoxes, certBoxes, stickerBoxes, accidentBoxes, cpoCertBoxes)
{
	  
	    var numFullVins = 0;
	    var numSummaryVins = 0;
	    var numCertVins = 0;
	    var numStickerVins = 0;
	    var fullChecked = "unchecked";
	    var summaryChecked = "unchecked";
	    var certChecked = "unchecked";
	    var stickerChecked = "unchecked";
	    var accidentChecked = "unchecked";
	    var cpoCertChecked = "unchecked";
	   
	   //check to make sure the array of vins is not null. If it's not
	   //then set the number of vins to the length. Finally,
	   //call checkBoxes to see if any of the boxes are actually checked.
	    if (fullBoxes != null)
	    {
	        numFullVins = fullBoxes.length;
	        fullChecked = checkBoxes(numFullVins, fullBoxes);
	    }
	  
	    
	    if (summaryBoxes != null)
	    {
	        numSummaryVins = summaryBoxes.length;
	        summaryChecked = checkBoxes(numSummaryVins, summaryBoxes);
	    }
	  
	    if (certBoxes != null)
	    {
	        numCertVins = certBoxes.length;
	        certChecked = checkBoxes(numCertVins, certBoxes);
	    }
	   
	    if (stickerBoxes != null)
	    {
	        numStickerVins = stickerBoxes.length;
	        stickerChecked = checkBoxes(numStickerVins, stickerBoxes);
	    }
	    
	    if (accidentBoxes != null)
	    {
	    	numAccidentVins = accidentBoxes.length;
	    	accidentChecked = checkBoxes(numAccidentVins, accidentBoxes);
	    }
	    
	    //check cpo cert boxes
	    if (cpoCertBoxes != null)
	    {
	        numCertVins = cpoCertBoxes.length;
	        cpoCertChecked = checkBoxes(numCertVins, cpoCertBoxes);
	    }
	    
	    
	    //when they are all set to unchecked, put out a message 
	    if (fullChecked == "unchecked" &&
	        summaryChecked == "unchecked" &&
	        certChecked == "unchecked" &&
	        stickerChecked == "unchecked" &&
	        accidentChecked == "unchecked" &&
	        cpoCertChecked == "unchecked")
	    {
	        alert("Please select what you would like to print.");
	        return false;
	    }
	    else
	    {
	        return true;
	    }	  
}

/*
*  Method called from checkVinPrint to see if any of the multiple print check boxes
*  are actually checked.
*
*/	  
 function checkBoxes(vinCount, boxes)
{
    var checked = 0;
    //if there is only 1 checkbox passed, it will show up as undefined
    //this will take care of checking the single box
     if( boxes.length == undefined)
	{
	     if (boxes.checked == true)
	     {
	         checked = checked + 1;
	     }
	 }
	 
	 //the loop will take care of multiple boxes 
     for( x=0; x < vinCount; x++)
     {
         if(boxes[x].checked == true)
         {
             checked = checked + 1;
         }
     }    
             
             
     //verify at least 1 box was checked 
	 if (checked == 0)
	 {
	     return "unchecked";  
	 }
	 else
	 {
	      return "checked";
	 }
}



function checkDealerProfileForm(form) {

	var flag = 0;
	
	
	for(var i = 0; i < form.salesRptTypeCd.length; i++) { 	
		if(form.salesRptTypeCd[i].checked == true){
			flag = 1;
			break;
		} 
	}	
	if(flag == 0) {
		alert("Please select your dealer type.");
		return false;	
	}
	
	
	if(form.salesRptTypeCd[0].checked == true) {
		var franFlag = 0;
		for (var i = 1; i < form.franchises.length; i++) {
			if (form.franchises[i].selected ) {
				franFlag = 1;
				break;
			}
		}
		
		if(franFlag == 0){	
			alert("Please select your associate franchises.");
			return false;
		}
			
	}
	
	if(form.salesRptTypeCd[2].checked == true) {
		if(form.salesRptOtherTypeCd.value == "" || form.salesRptOtherTypeCd.value < 1)	{
			alert("Please choose your other sales report type.");
			return false;
		}
	}
	
	
	if(form.dealershipGrpCd.value == form.dealershipGrpOtherCdValue.value && 
		( form.salesRptTypeCd[2].checked == false ||
			!(form.salesRptOtherTypeCd.value == form.auctionValue.value || form.salesRptOtherTypeCd.value == form.insuranceValue.value || 
						form.salesRptOtherTypeCd.value == form.lenderValue.value ||
						form.salesRptOtherTypeCd.value == form.creditUnionValue.value))) {
		if(form.dealershipGrpOtherTx.value == "" || form.dealershipGrpOtherTx.value.length < 1 || 
							trim(form.dealershipGrpOtherTx.value.toLowerCase()) == "Add your group name".toLowerCase()){	
			alert("Please enter your other dealership group name.");
			return false;
		}
	}
	
	
	for (var i = 0; i < form.webProviders.length; i++) {
		if (form.webProviders[i].selected && form.webProviders[i].value == form.webProviderOtherCdValue.value) {
			if(form.webProviderOtherTx.value == "" || form.webProviderOtherTx.value.length < 1 ||
								trim(form.webProviderOtherTx.value.toLowerCase()) == "Add your web provider".toLowerCase()){	
				alert("Please enter your other web provider group name.");
				return false;
			}
			break;
		}			
	}	
	
	emptyNewEmailText(form);
	
	return true;
}


function enableDisableDropDown(id, franId, form) {
	var e = document.getElementById(id);  
	var fran = document.getElementById(franId); 
	
	if(form.salesRptTypeCd[2].checked == true) {
		form.salesRptOtherTypeCd.disabled=false;
		 if(form.salesRptOtherTypeCd.value == form.auctionValue.value || form.salesRptOtherTypeCd.value == form.insuranceValue.value || 
						form.salesRptOtherTypeCd.value == form.lenderValue.value || 
						form.salesRptOtherTypeCd.value == form.creditUnionValue.value) {       
       	 	e.style.display = 'none';
         }
	} else {
		form.salesRptOtherTypeCd.disabled=true;
		e.style.display = 'block';
	}
	
	if(form.salesRptTypeCd[1].checked == true) {		
        fran.style.display = 'none';         
	} else {	
		fran.style.display = 'block';
	}

}


function showHideTextBox(form) {

	if(form.dealershipGrpCd.value == form.dealershipGrpOtherCdValue.value) {
		if(form.dealershipGrpOtherTx.value == "" || form.dealershipGrpOtherTx.value.length < 1 || 
							trim(form.dealershipGrpOtherTx.value.toLowerCase()) == "Add your group name".toLowerCase()){
			form.dealershipGrpOtherTx.value = "Add your group name";
		}		
		form.dealershipGrpOtherTx.style.visibility = "visible";
	} else {
		form.dealershipGrpOtherTx.style.visibility = "hidden";
	}
	
}


function showHideWebProvidersTextBox(form) {


	form.webProviderOtherTx.style.visibility = "hidden";	
	for (var i = 0; i < form.webProviders.length; i++) {	
		if (form.webProviders[ i ].selected && form.webProviders[ i ].value == form.webProviderOtherCdValue.value) {	
		if(form.webProviderOtherTx.value == "" || form.webProviderOtherTx.value.length < 1 ||
								trim(form.webProviderOtherTx.value.toLowerCase()) == "Add your web provider".toLowerCase()){					
				form.webProviderOtherTx.value = "Add your web provider";
			} 			
			form.webProviderOtherTx.style.visibility = "visible";
			break;
		}			
	}	
	
}

function toggle_visibility(id, webId, form) {

       var e = document.getElementById(id);  
       var web = document.getElementById(webId);
       
       if(form.salesRptOtherTypeCd.value == form.auctionValue.value || form.salesRptOtherTypeCd.value == form.insuranceValue.value || 
						form.salesRptOtherTypeCd.value == form.lenderValue.value ||
						form.salesRptOtherTypeCd.value == form.creditUnionValue.value) {          
       	 e.style.display = 'none';
       } else {
	       e.style.display = 'block';
       }
       
       if(form.salesRptOtherTypeCd.value == form.lenderValue.value ||
				form.salesRptOtherTypeCd.value == form.creditUnionValue.value) {          
    	   web.style.display = 'none';
       } else {
    	   web.style.display = 'block';
       }
     
}


function showHideTextBox_OnLoad(id, franId, webId, form){


	var e = document.getElementById(id);  
	var fran = document.getElementById(franId); 
	var web = document.getElementById(webId); 
	
	form.dealershipGrpOtherTx.style.visibility = "hidden";
	form.webProviderOtherTx.style.visibility = "hidden";
	
	if(form.salesRptOtherTypeCd.value == form.auctionValue.value || form.salesRptOtherTypeCd.value == form.insuranceValue.value || 
						form.salesRptOtherTypeCd.value == form.lenderValue.value || 
						form.salesRptOtherTypeCd.value == form.creditUnionValue.value) {      
       	 e.style.display = 'none';
    } else {
	     e.style.display = 'block';
    }

	if(form.salesRptOtherTypeCd.value == form.lenderValue.value || 
			form.salesRptOtherTypeCd.value == form.creditUnionValue.value) {      
		web.style.display = 'none';
	} 
	else 
	{
		web.style.display = 'block';
	}	
       
    if(form.salesRptTypeCd[1].checked == true) {		
        fran.style.display = 'none';         
	} else {	
		fran.style.display = 'block';
	}
	
 
	
	if(form.dealershipGrpCd.value == form.dealershipGrpOtherCdValue.value){
		form.dealershipGrpOtherTx.style.visibility = "visible";
	} 	
	
	for (var i = 0; i < form.webProviders.length; i++) {
		if (form.webProviders[ i ].selected && form.webProviders[ i ].value == form.webProviderOtherCdValue.value) {
			form.webProviderOtherTx.style.visibility = "visible";
			break;
		}			
	}	
	showNewEmailText(form);		
	
}



function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function emptyNewEmailText(form){
	if(trim(form.emailAddress.value.toLowerCase()) == "Enter new email address".toLowerCase()){
		form.emailAddress.value="";
	}
	if(trim(form.emailAddress2.value.toLowerCase()) == "Enter new email address".toLowerCase()){
		form.emailAddress2.value="";
	}
	if(trim(form.emailAddress3.value.toLowerCase()) == "Enter new email address".toLowerCase()){
		form.emailAddress3.value="";
	}
}

function showNewEmailText(form){
	if(form.emailAddress.value == "" || form.emailAddress.value.length < 1){
		form.emailAddress.value="Enter new email address";
	}
	if(form.emailAddress2.value == "" || form.emailAddress2.value.length < 1){
		form.emailAddress2.value="Enter new email address";
	}
	if(form.emailAddress3.value == "" || form.emailAddress3.value.length < 1){
		form.emailAddress3.value="Enter new email address";
	}
}



function flashFullscreen(url){
	window.open(url, '', "menubar=no, status=no, scroll=no, titlebar=yes, toolbar=no, height=" + screen.height + ", width=" + screen.width + ", left=0, top=0, scrolling=yes", true);
}


function newWhitePaperWindowNav(the_win){
	opener_win = window.open(the_win,"Layout","toolbar=yes,location=no,scrollbars=yes,resizable=yes,width=775,height=440");

}



function showHideLeadFormOtherLearnTextBox(form) {

	if(form.learnCode.value == form.learnTypeOtherValue.value) {		
		form.otherLearn.disabled=false;
	} else {
		form.otherLearn.value="";
		form.otherLearn.disabled=true;
	}	
}

function showHideLeadFormOtherDMSTextBox(form) {

	var selectedText = form.dmsCode.options[form.dmsCode.selectedIndex].text;
	form.dmsText.value= selectedText; 
	
	if(selectedText == "Other") {		
		form.otherDMS.disabled=false;
	} else {
		form.otherDMS.value="";
		form.otherDMS.disabled=true;
	}	
}

function enableDisableTextBox_OnLoad(form){

	var selectedText = form.dmsCode.options[form.dmsCode.selectedIndex].text;
	form.dmsText.value= selectedText; 
	
	if(selectedText == "Other") {		
		form.otherDMS.disabled=false;
	} else {
		form.otherDMS.disabled=true;
	}	
	
	if(form.learnCode.value == form.learnTypeOtherValue.value) {		
		form.otherLearn.disabled=false;
	} else {
		form.otherLearn.disabled=true;
	}	
}


//v1.7
// Flash Player Version Detection
// Detect Client Browser type
// Copyright 2005-2008 Adobe Systems Incorporated.  All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
function ControlVersion()
{
	var version;
	var axo;
	var e;
	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry
	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}
	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";
			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";
			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}
	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}
	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}
	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}
// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}
// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];
        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}
function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}
function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
  var str = '';
  if (isIE && isWin && !isOpera)
  {
    str += '<object ';
    for (var i in objAttrs)
    {
      str += i + '="' + objAttrs[i] + '" ';
    }
    str += '>';
    for (var i in params)
    {
      str += '<param name="' + i + '" value="' + params[i] + '" /> ';
    }
    str += '</object>';
  }
  else
  {
    str += '<embed ';
    for (var i in embedAttrs)
    {
      str += i + '="' + embedAttrs[i] + '" ';
    }
    str += '> </embed>';
  }
  document.write(str);
}
function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}
function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}
function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    
    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblclick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
      case "id":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

function flashTraining(url){

	window.location.href=url;

}


function trimAll(sString)
{
	while (sString.substring(0,1) == ' ')
	{
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' ')
	{
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}

function validate_dealer_retention_required(form)
{

 if((form.referredEmailAddress.value == "" || form.referredEmailAddress.value == null ) &&
		( (form.referredPhoneNumber.value == "" || form.referredPhoneNumber.value == null ) || 
			(form.referredPhoneNumber.value != "" && trimAll(form.referredPhoneNumber.value) == "###-###-####" ))) {							
				
			alert("Please enter either a phone number or an email address for Referred Dealer.");
			return false;
	}
	
	return true;

}



