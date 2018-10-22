function myHtmlParser(divFrom, divTo){
  // get the content of the origin div (first argument)
  var content = document.getElementById(divFrom).innerText;
  // remove the xmp tag
  content = content.replace(/<xmp>/,"").replace(/<.xmp>/,"").replace(/<\/?span[^>]*>/g,"");
  //console.log("This is the content of the html fragment!; ")
  //console.log(content)
  // write the content in the destination div (second argument)
  document.getElementById(divTo).innerHTML = content;
}

// gvar will allow the function made in my d3 snippet to be in the whole environment
// See https://www.xul.fr/javascript/eval.php
var gvar = this;



function myJSParser(divFrom, divTo){
  // get the content of the origin div (first argument)
  var command = document.getElementById(divFrom).innerText;
  // remove the xmp tag and the script tags
  command = command.replace(/<xmp>/,"").replace(/<.xmp>/,"").replace(/<script>/,"").replace(/<.script>/,"").replace(/<\/?span[^>]*>/g,"");
  //console.log("This is the content of the JS fragment!; ")
  //console.log(command)
  // run the JS code
  gvar.eval(command);
}

// Same as the previous one, but with no HTML before.
function myJSParserShort(divFrom){
  // get the content of the origin div (first argument)
  var command = document.getElementById(divFrom).innerText;
  // remove the xmp tag and the script tags
  command = command.replace(/<xmp>/,"").replace(/<.xmp>/,"").replace(/<script>/,"").replace(/<.script>/,"").replace(/<\/?span[^>]*>/g,"");
  //console.log("This is the content of the JS fragment!; ")
  //console.log(command)
  // run the JS code
  gvar.eval(command);
}


function myCodeDownload(filename, idHTML, idJS) {

  // recover the text I want to export:
  var myHtml = document.getElementById(idHTML).innerText;
  var myJs = document.getElementById(idJS).innerText;
  var myText = myHtml + "\n" + myJs
  console.log(myText)

  // create a hidden element and click on it:
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("<!-- Code from d3-graph-gallery.com -->\n"+myText));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}










// function myPngExporter(output, mydiv, mytime){

//   // We need for the javascript to be executed before exporting to png
//   var millisecondsToWait = mytime;
//   setTimeout(function() {

//     // export the div called mydiv
//     html2canvas($(mydiv),
//       {
//         onrendered: function (canvas) {
//           var a = document.createElement('a');
//           // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
//           a.href = canvas.toDataURL("image/png") //.replace("image/png", "image/octet-stream");
//           a.download = output;
//           a.click();
//         }
//       });

//   }, millisecondsToWait);
// }
