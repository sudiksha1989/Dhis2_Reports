/**
 * Created by harsh on 28/11/16.
 */
//http://localhost:8080/fpai/api/dataValueSets.json?dataSet=S11S5cvcCkR&period=2016&orgUnit=oCL6lUtM3bB&paging=false
//http://localhost:8080/fpai/api/audits/dataValue.json?de=Qn3Yf4iOy63
msfReportsApp.directive('calendar', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(dateText);
                    });
                }
            });
        }
    };
});

msfReportsApp.controller('AuditController', function( $rootScope,$scope,$timeout,MetadataService){

// const SQLVIEW_TEI_PS = "nBCleImsp8E";
// const SQLVIEW_TEI_ATTR = "NJKQr9q6kOO";
// const SQLVIEW_TEI_PS =  "EX2dsz6vmES";
// const SQLVIEW_TEI_ATTR = "pUiDfNYflvv";

    const SQLVIEW_TEI_PS =  "FcXYoEGIQIR";
    const SQLVIEW_TEI_ATTR = "WMIMrJEYUxl";
    const SQLVIEW_EVENT = "IQ78273FQtF";

    jQuery(document).ready(function () {
        hideLoad();
    })
    $timeout(function(){
        $scope.date = {};
        $scope.date.startDate = new Date();
        $scope.date.endDate = new Date();
    },0);

//initially load tree
    selection.load();

// Listen for OU changes
    selection.setListenerFunction(function(){
//getAllPrograms();
        $scope.selectedOrgUnitUid = selection.getSelected();
        loadPrograms();
    },false);

    loadPrograms = function(){
        MetadataService.getOrgUnit($scope.selectedOrgUnitUid).then(function(orgUnit){
            $timeout(function(){
                $scope.selectedOrgUnit = orgUnit;
                $scope.programs=[];
//console.log(programs.name);
//alert(programs.name);
                for(var i=0;i<orgUnit.dataSets.length;i++)
                {
                    $scope.programs.push(orgUnit.dataSets[i]);

                }

// getAllPrograms(orgUnit);
            });
        });
    }

    /** $scope.update=function(selectedProgram)
     {

     alert(selectedProgram.id);

     }**/

    $scope.getAllPrograms = function(selectedProgram){


        $scope.DataSet=selectedProgram.id;

        generatePeriods($scope.DataSet);

    }


    generatePeriods = function(DataSet){

        if( DataSet != "" )
        {
            $.getJSON("../../dataSets/" + DataSet + ".json?fields=periodType", function (d) {
//alert("data");
//var url = "../../dataSets/" + DataSet + ".json?fields=periodType";
//$.get(url, function(d){

//printing periods ------------------
                var periodType = d.periodType;
                var today = new Date();
//console.log(today);
//var stDate = "01/01/" + today.getFullYear();
                var stDate = "01/01/" + "2014";
//console.log("start"+stDate);
                var endDate = "01/01/" + (today.getFullYear() + 1);
//console.log("end"+endDate);
//console.log("full year"+today.getFullYear());
                var periods = "";

                if (periodType == "Daily")
                    periods = daily(stDate, endDate);
                else if (periodType == "Weekly")
                    periods = weeklynew(stDate, endDate);
                else if (periodType == "Monthly")
                    periods = monthly(stDate, endDate);
                else if (periodType == "Yearly")
                    periods = yearly(stDate, endDate);
                else if (periodType == "Quarterly")
                    periods = quartly();
                else if (periodType == "SixMonthly")
                    periods = SixMnthly();
                else if (periodType == "SixMonthlyApril")
                    periods = SixMnthlyApril();


                $("#importPeriod").html("");
                periods.split(";").forEach(function(p){

                    if(periodType == 'Monthly')
                    {
                        var ps= $scope.monthString(p);
                        var h1 = "<option value='"+ p +"'>" + ps + "</option>";
                        $("#importPeriod").append(h1);
                    }
                    else if(periodType=="Quarterly")
                    {
                        var ps1=$scope.quater(p);
                        var h2 = "<option value='"+ p +"'>" + ps1 + "</option>";
                        $("#importPeriod").append(h2);
                    }
                    else if(periodType=="SixMonthly")
                    {
                        var ps2=$scope.SixMonthly(p);
                        var h4 = "<option value='"+ p +"'>" + ps2 + "</option>";
                        $("#importPeriod").append(h4);
                    }
                    else if(periodType=="SixMonthlyApril")
                    {
                        var ps2=$scope.SixMonthlyApril(p);
                        var h4 = "<option value='"+ p +"'>" + ps2 + "</option>";
                        $("#importPeriod").append(h4);
                    }
                    else if(periodType=="Daily")
                    {
                        var ps2=$scope.daily(p);
                        var h4 = "<option value='"+ p +"'>" + ps2 + "</option>";
                        $("#importPeriod").append(h4);
                    }
                    else if(periodType=="Weekly")
                    {
                        var ps2=$scope.weekly(p);
                        var h4 = "<option value='"+ p +"'>" + ps2 + "</option>";
                        $("#importPeriod").append(h4);
                    }
                    else
                    {
                        var h3 = "<option value='"+ p +"'>" + p + "</option>";
                        $("#importPeriod").append(h3);
                    }

                });


            });
        }
    };
    $scope.weekly=function (period) {
        var newp;
        if (period == "Select Period") {
            newp = "Select Period";
        }
        else {


            var week = period.substring(4, 7);
            var prd = period.substring(0, 4);


            if (week == "W1" || week == "W2" || week == "W3" || week == "W4" || week == "W5") {
                newp = week + "-" + "January" + " " + prd;
            }
            else if (week == "W6" || week == "W7" || week == "W8" || week == "W9") {
                newp = week + "-" + "February" + " " + prd;
            }
            else if (week == "W10" || week == "W11" || week == "W12" || week == "W13" || week == "W14") {
                newp = week + "-" + "March" + " " + prd;
            }
            else if (week == "W15" || week == "W16" || week == "W17" || week == "W18") {
                newp = week + "-" + "April" + " " + prd;
            }
            else if (week == "W19" || week == "W20" || week == "W21" || week == "W22") {
                newp = week + "-" + "May" + " " + prd;
            }
            else if (week == "W23" || week == "W24" || week == "W25" || week == "W26" || week == "W27") {
                newp = week + "-" + "June" + " " + prd;
            }
            else if (week == "W28" || week == "W29" || week == "W30" || week == "W31") {
                newp = week + "-" + "July" + " " + prd;
            }
            else if (week == "W32" || week == "W33" || week == "W34" || week == "W35") {
                newp = week + "-" + "August" + " " + prd;
            }
            else if (week == "W36" || week == "W37" || week == "W38" || week == "W39" || week == "W40") {
                newp = week + "-" + "September" + " " + prd;
            }
            else if (week == "W41" || week == "W42" || week == "W43" || week == "W44") {
                newp = week + "-" + "October" + " " + prd;
            }
            else if (week == "W45" || week == "W46" || week == "W47" || week == "W48") {
                newp = week + "-" + "November" + " " + prd;
            }
            else if (week == "W49" || week == "W50" || week == "W51" || week == "W52" || week == "W53") {
                newp = week + "-" + "December" + " " + prd;
            }



        }
        return newp;
    }
    $scope.daily=function (period) {
            var newp;
        if (period == "Select Period") {
            newp = "Select Period";
        }else {
            var d1 = period.substring(0, 4);
            var d2 = period.substring(4, 6);
            var d3 = period.substring(6, 8);

             newp = d3 + "-" + d3 + "-" + d1;
        }
        return newp;
    }

    $scope.SixMonthlyApril=function(period) {
        var ms = [], ms1 = [], ms2 = [], newp;
        if (period == "Select Period") {
            newp = "Select Period";
        }else
        {
        var month = period.substring(4, 11);

        if (month == "AprilS1") {
            ms = "April - September ";
            newp = ms + " " + period.substring(0, 4);
        }
        else if (month == "AprilS2") {
            ms2 = "October ";
            ms1 = " - March ";
            var m=parseInt(period.substring(0, 4))+1;
            newp = ms2 + " " + (period.substring(0, 4) ) + ms1 + " " + m;
        }

        }
        return newp;
    }




    $scope.SixMonthly=function (period) {
        var ms = [], newp;
        if (period == "Select Period") {
            newp = "Select Period";
        }else
        {
        var month = period.substring(4, 6);

        if (month == "S1")
            ms = "January - June";
        else if (month == "S2")
            ms = "July - December";
        newp=ms + " " + period.substring(0, 4);
       }
        return newp;


    }
    $scope.quater=function (period) {
        var ms = [],newp;
        if(period=="Select Period")
        {
            newp="Select Period";
        }
        else {
            var month = period.substring(4, 6);

            if (month == "Q1")
                ms = "January - March";
            else if (month == "Q2")
                ms = "April - June ";
            else if (month == "Q3")
                ms = "July - September ";
            else if (month == "Q4")
                ms = "October - December";

             newp=ms + " " + period.substring(0, 4);
        }
        return newp;

    };

    $scope.monthString = function(pst) {
        var newp;
        if (pst == "Select Period") {
            newp= "Select Period";

        }
        else
        {
        var month = pst.substring(4, 6);
        var ms = [];

        if (month == "01")
            ms = "Jan";
        else if (month == "02")
            ms = "Feb";
        else if (month == "03")
            ms = "Mar";
        else if (month == "04")
            ms = "Apr";
        else if (month == "05")
            ms = "May";
        else if (month == "06")
            ms = "Jun";
        else if (month == "07")
            ms = "Jul";
        else if (month == "08")
            ms = "Aug";
        else if (month == "09")
            ms = "Sep";
        else if (month == "10")
            ms = "Oct";
        else if (month == "11")
            ms = "Nov";
        else if (month == "12")
            ms = "Dec";

        newp = ms + " " + pst.substring(0, 4);
    }
         return newp;
    };

    $.ajaxSetup({
        async:false
    });
    /** $scope.printcontent=function(){

window.print();

};**/
    $scope.ExportToExcel=function(mydata)
    {
        var htmltable= document.getElementById('tabledata');
        var html = htmltable.outerHTML;
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));

    }

    $scope.printDiv = function (div) {
        var docHead = document.head.outerHTML;
        var printContents = document.getElementById("tabledata").outerHTML;
        var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no,alig toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

        var newWin = window.open("", "_blank", winAttr);
        var writeDoc = newWin.document;
        writeDoc.open();
        writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()"><div style="margin-top:-250px">' + printContents + '</div></body></html>');
        writeDoc.close();
        newWin.focus();
    }




    $scope.generateReport=function(x,y,z) {

        var orgUnit=x.id;
        var date=y.name;
        var dataset=z.dataset.id;
        var periodType=z.dataset.periodType;

        $.getJSON("../../audits/dataValue.json?ds="+dataset+"&ou="+orgUnit+"&skipPaging=true", function (data) {
            var v=data.dataValueAudits;
            if(v.length==0)
                    {
                        var row2 = $(
                            "<tr style='text-align: left;' ><td colspan='1' style='font-size: 20px;background-color: white; height:100px ;color: black;font-weight: bold '>No Data Found</td></tr>");
                        $("#reporttable").append(row2);

                    }
                    else {




                var valnew = [];

               // console.log(valnew);


                for (var i = 0; i < data.dataValueAudits.length; i++) {
                    var u = 0;

                    var val = data.dataValueAudits[i].period;

                    if (val.id == date) {

                        var tt = i;
                        //console.log(tt);

                        valnew.push(data.dataValueAudits[i]);
                    }

                }


                if (valnew.length == 0) {

                    var row2 = $(
                        "<tr style='text-align: left;' ><td colspan='1' style='font-size: 20px;background-color: white; height:100px ;color: black;font-weight: bold '>No Data Found</td></tr>");
                    $("#reporttable").append(row2);

                }
                else {
                    var ps;
                    if (periodType == 'Monthly') {
                        ps = $scope.monthString(date);

                    }
                    else if (periodType == "Quarterly") {
                        ps = $scope.quater(date);

                    }
                    else if (periodType == "SixMonthly") {
                        ps = $scope.SixMonthly(date);

                    }
                    else if (periodType == "SixMonthlyApril") {
                        ps = $scope.SixMonthlyApril(date);

                    }
                    else if (periodType == "Daily") {
                        ps = $scope.daily(date);

                    }
                    else if (periodType == "Daily") {
                        ps = $scope.daily(date);

                    }
                    else if (periodType == "Weekly") {
                        ps = $scope.weekly(date);

                    }
                    else {
                        ps = date;
                    }

                    var rowm = $(
                        "<thead><tr style='border:1px solid black'><td COLSPAN='2' style='background-color: #8fadc1;height:30px  ;color: #1B4F72;text-align: left; '><font style='font-size: 15px'>Organization Unit :</font> " + x.name + "</td>" +
                        "<td COLSPAN='2' style='background-color: #8fadc1;height:30px ;color: #1B4F72;text-align: left; '><font style='font-size: 15px'>Data Set :</font> " + z.dataset.name + "</td>" +
                        "<td COLSPAN='2' style='background-color: #8fadc1;height:30px  ;color: #1B4F72;text-align: left; '><font style='font-size: 15px'>Period :</font> " + ps + "</td></tr>"+
                        "<tr ><td COLSPAN='6' style='border:1px solid black;background-color: #1B4F72;height:30px  ;color: white;text-align: center;font-weight: bold ' >Data Set Audit Report" + "</td></tr>"+
                        "<tr ><th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold;position: relative;' >Updated" +"&nbsp;&nbsp;&nbsp;<span style='color: #1B4F72;margin-top: -15px;text-align: right;text-decoration: none;font-weight: normal;'> &#8693;</span></th>"+
                        "<th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold ' >Modified By" +"&nbsp;&nbsp;&nbsp;<span  style='color: #1B4F72;margin-top: -15px;text-align:right;text-decoration: none;font-weight: normal;'> &#8693;</span></th>"+
                        "<th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold ' >Audit Type" + "&nbsp;&nbsp;&nbsp;<span style='color:  #1B4F72;margin-top: -15px;text-align:right ;text-decoration: none;font-weight: normal;'> &#8693;</span></th>" +
                        "<th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold ' >Value" + "&nbsp;&nbsp;&nbsp;<span style='color:  #1B4F72;margin-top: -15px;text-align:right;text-decoration: none;font-weight: normal;'> &#8693;</span></th>" +
                        "<th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold ' >Data Element" + "&nbsp;&nbsp;&nbsp;<span style='color:  #1B4F72;margin-top: -15px;text-align:right;text-decoration: none;font-weight: normal;'> &#8693;</span></th>" +
                        "<th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold '>Category Option Combos"+"&nbsp;&nbsp;&nbsp;<span style='color:  #1B4F72;margin-top: -15px;text-align:right;text-decoration: none;font-weight: normal;'> &#8693;</span></th></tr></thead>"
                    );
                    $("#reporttable").append(rowm);

                    for (var i = 0; i < valnew.length; i++) {

                        //Get data Element
                        var m = valnew[i].dataElement;
                        var Delemnt = getDataElement(m.id);

                        //get Category Combination name
                        var h = valnew[i].categoryOptionCombo;
                        var CatCombi = getcategoryOptionCombo(h.id);

                        //get data values
                        var dval = valnew[i].value;
                        var dvalue = "";

                        // get period
                        var val = valnew[i].period;

                        if (val.id != date) {

                            var row2 = $(
                                "<tr style='text-align: left;' ><td colspan='1' style='text-align:left;font-size: 20px;background-color: white; height:100px ;color: black;font-weight: bold '>No Data Found</td></tr>");
                            $("#report").append(row2);

                        }
                        else {

                            if (dval == undefined) {

                                var rowx = $(
                                    "<tbody><tr><td  style='border:1px solid black;'> " + valnew[i].created +//
                                    "</td><td  style='border:1px solid black;'> " + valnew[i].modifiedBy +//
                                    "</td><td  style='border:1px solid black;'>" + valnew[i].auditType +//////
                                    "</td><td  style='border:1px solid black;'>" + dvalue +
                                    "</td><td  style='border:1px solid black;'>" + Delemnt +
                                    "</td><td  style='border:1px solid black;'>" + CatCombi +
                                    "</td></tr>");
                                $("#reporttable").append(rowx);

                            } else {


                                var rowf = $(
                                    "<tr><td  style='border:1px solid black;'> " +valnew[i].created +//
                                    "</td><td  style='border:1px solid black;'> " + valnew[i].modifiedBy +//
                                    "</td><td  style='border:1px solid black;'>" + valnew[i].auditType +//////
                                    "</td><td  style='border:1px solid black;'>" + valnew[i].value +
                                    "</td><td  style='border:1px solid black;'>" + Delemnt +
                                    "</td><td  style='border:1px solid black;'>" + CatCombi +
                                    "</td></tr></tbody>");
                                $("#reporttable").append(rowf);


                                $(document).ready(function()
                                    {
                                        $(".tablesorter").tablesorter();
                                    }
                                );
                            }



                        }
                    }


                }
            }


        });
    };

 /**   LOOP1: do {
        if (x >= 10) break LOOP1;
        if (!Ok) break LOOP1;
        z = 0;
        LOOP2: do {
            if (z >= 10) break LOOP2;
            if (!DoStuff()) {
                Ok = FALSE;
                break LOOP2;
            }
            z++;
        } while (1);// Note While (1) I can just skip saying continue LOOP2!
        x++;
        continue LOOP1;// Again can skip this line and just say do {} while (1)
    } while(0)
    /**
     *
     *
  for (var i = 0; i < data.dataValueAudits.length; i++) {

                    //Get data Element
                    var m = data.dataValueAudits[i].dataElement;
                    var Delemnt = getDataElement(m.id);

                    //get Category Combination name
                    var h = data.dataValueAudits[i].categoryOptionCombo;
                    var CatCombi = getcategoryOptionCombo(h.id);

                    //get data values
                    var dval=data.dataValueAudits[i].value;
                    var dvalue="";

                    // get period
                    var val = data.dataValueAudits[i].period;

                    if (val.id != date) {
                        var row2 = $(
                            "<tr style='text-align: left;' ><td colspan='1' style='text-align:left;font-size: 20px;background-color: white; height:100px ;color: black;font-weight: bold '>No Data Found</td></tr>");
                        $("#report").append(row2);

                    }
                    else{

                    if(dval==undefined) {

                        var rowx = $(
                            "<tr><td  style='border:1px solid black;'> " + data.dataValueAudits[i].created +///////
                            "</td><td  style='border:1px solid black;'> " + data.dataValueAudits[i].modifiedBy +//
                            "</td><td  style='border:1px solid black;'>" + data.dataValueAudits[i].auditType +//////
                            "</td><td  style='border:1px solid black;'>" + dvalue +
                            "</td><td  style='border:1px solid black;'>" + Delemnt +
                            "</td><td  style='border:1px solid black;'>" + CatCombi +
                            "</td></tr>");
                        $("#reporttable").append(rowx);

                    }else
                    {


                        var rowf = $(
                            "<tr><td  style='border:1px solid black;'> " + data.dataValueAudits[i].created +///////
                            "</td><td  style='border:1px solid black;'> " + data.dataValueAudits[i].modifiedBy +//
                            "</td><td  style='border:1px solid black;'>" + data.dataValueAudits[i].auditType +//////
                            "</td><td  style='border:1px solid black;'>" + data.dataValueAudits[i].value +
                            "</td><td  style='border:1px solid black;'>" + Delemnt +
                            "</td><td  style='border:1px solid black;'>" + CatCombi +
                            "</td></tr>");
                        $("#reporttable").append(rowf);
                    }

                }
                }
     * @param value
     * @returns {Array}
     */




    getcategoryOptionCombo=function (value) {
        var matched = [];
        $.getJSON("../../categoryOptionCombos/"+value+".json?fields=id,name&paging=false", function (d) {
            var daelemt=d.name;
            matched.push(daelemt);
            //console.log(d.name);
            // val=data.name;
            //return val1;

        });
        return matched;


    }

    getDataElement=function (value) {

        var matched = [];
        $.getJSON("../../dataElements/"+value+".json?fields=name,id&paging=false", function (d) {
            var daelemt=d.name;
            matched.push(daelemt);
            //console.log(d.name);
            // val=data.name;
            //return val1;

        });
        return matched;


    }



    function showLoad()
    {
// alert( "inside showload method 1" );
        setTimeout(function(){
//  document.getElementById('load').style.visibility="visible";
//   document.getElementById('tableid').style.visibility="hidden";

        },1000);

//     alert( "inside showload method 2" );
    }
    function hideLoad() {
//  document.getElementById('load').style.visibility="hidden";
//  document.getElementById('tableid').style.visibility="visible";
    }

    function arrangeDataX(stageData){

// For Data values
        const index_deuid = 4;
        const index_devalue = 6;
        const index_ps = 0;
        const index_ev = 2;
        const index_evDate = 3;
        const index_ou = 7;

        $scope.eventList = [];
        $scope.eventMap = [];
        $scope.eventDeWiseValueMap = [];

        for (var i=0;i<stageData.height;i++) {

            var psuid = stageData.rows[i][index_ps];
            var evuid = stageData.rows[i][index_ev];
            var evDate = stageData.rows[i][index_evDate];
            var deuid = stageData.rows[i][index_deuid];
            var devalue = stageData.rows[i][index_devalue];
            var ou = stageData.rows[i][index_ou];

            if (!$scope.eventMap[evuid]){
                $scope.eventMap[evuid] = {
                    event : evuid,
                    data : []
                };
                $scope.eventDeWiseValueMap[evuid + "-orgUnit"] = ou;
                $scope.eventDeWiseValueMap[evuid + "-eventDate"] = evDate;



            }

            $scope.eventMap[evuid].data.push( {
                de : deuid,
                value : devalue
            });
            $scope.eventDeWiseValueMap[evuid + "-" + deuid] = devalue;


            for(m in $scope.Options){

                if(devalue+'_index' == m){

                    $scope.eventDeWiseValueMap[evuid + "-" + deuid] = $scope.Options[m];
                }

            }
        }

        $timeout(function(){
            $scope.eventList = prepareListFromMap($scope.eventMap);

        })

    }

});
