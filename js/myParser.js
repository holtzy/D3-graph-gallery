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


function myJSParser(divFrom, divTo){
  // get the content of the origin div (first argument)
  var command = document.getElementById(divFrom).innerText;
  // remove the xmp tag and the script tags
  command = command.replace(/<xmp>/,"").replace(/<.xmp>/,"").replace(/<script>/,"").replace(/<.script>/,"").replace(/<\/?span[^>]*>/g,"");
  //console.log("This is the content of the JS fragment!; ")
  //console.log(command)
  // run the JS code
  eval(command);
}


function myPngExporter(output, mydiv, mytime){

  // We need for the javascript to be executed before exporting to png
  var millisecondsToWait = mytime;
  setTimeout(function() {

    // export the div called mydiv
    html2canvas($(mydiv), 
      {
        onrendered: function (canvas) {
          var a = document.createElement('a');
          // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
          a.href = canvas.toDataURL("image/png") //.replace("image/png", "image/octet-stream");
          a.download = output;
          a.click();
        }
      });

  }, millisecondsToWait);
}





