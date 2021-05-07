function myHtmlParser(divFrom, divTo){
  // get the content of the origin div (first argument)
  var content = document.getElementById(divFrom).innerText;
  // remove the xmp tag
  content = content.replace(/<xmp>/,"").replace(/<.xmp>/,"").replace(/<\/?span[^>]*>/g,"");
  // write the content in the destination div (second argument)
  document.getElementById(divTo).innerHTML = content;
}

// gvar will allow the function made in my d3 snippet to be in the whole environment
// See https://www.xul.fr/javascript/eval.php
var gvar = this;


function myJSParser(divFrom){
  // get the content of the origin div (first argument)
  var command = document.getElementById(divFrom).innerText;
  // remove the xmp tag and the script tags
  command = command.replace(/<xmp>/,"").replace(/<.xmp>/,"").replace(/<script>/,"").replace(/<.script>/,"").replace(/<\/?span[^>]*>/g,"");
  // run the JS code
  gvar.eval(command);
}

// Same as the previous one, but with no HTML before.
// Use in tutorial pages
function myJSParserShort(divFrom){
  // get the content of the origin div (first argument)
  var command = document.getElementById(divFrom).innerText;
  // remove the xmp tag and the script tags
  command = command.replace(/<xmp>/,"").replace(/<.xmp>/,"").replace(/<script>/,"").replace(/<.script>/,"").replace(/<\/?span[^>]*>/g,"");
  // run the JS code
  gvar.eval(command);
}


function myCodeDownload(filename, idHTML, idJS) {

  // recover the text I want to export:
  var myHtml = document.getElementById(idHTML).innerText;
  var myJs = document.getElementById(idJS).innerText;
  var myText = myHtml + "\n" + myJs

  // create a hidden element and click on it:
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("<!-- Code from d3-graph-gallery.com -->\n"+myText));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


// UPDATE MAY 2021 - ADD V4 - V6 CONTROL
function showCodeVersion(version) {

  if(version === "v4"){
    // Hide all v6 related code chunks
    allV6 = document.querySelectorAll(".d3v6-chunk")
    allV6.forEach( el => el.classList.add('d-none'))
    // Show all v4
    allV4 = document.querySelectorAll(".d3v4-chunk")
    allV4.forEach( el => el.classList.remove('d-none'))
    // Swap the selected button
    document.getElementById('button-show-v4').classList.add("active")
    document.getElementById('button-show-v6').classList.remove("active")
    // Load d3V4
    $.getScript("https://d3js.org/d3.v4.js", function(){
      // Run the according code to update the graph
      myHtmlParser('code-html-v4', 'result')
      myJSParser('code-js-v4')
    });
    // Add event listener to the editable code of v4
    document.getElementById('code-js-v4').addEventListener("input", function() {
      myHtmlParser('code-html-v4', 'result')
      myJSParser('code-js-v4')
    })
    // Remove event listener to the editable code of v6
    document.getElementById('code-js-v6').removeEventListener("input", function() {
      myHtmlParser('code-html-v6', 'result')
      myJSParser('code-js-v6')
    })
  }

  if(version === "v6"){
    // Hide all v4 related code chunks
    allV4 = document.querySelectorAll(".d3v4-chunk")
    allV4.forEach( el => el.classList.add('d-none'))
    // Show all v6
    allV6 = document.querySelectorAll(".d3v6-chunk")
    allV6.forEach( el => el.classList.remove('d-none'))
    // Swap the selected button
    document.getElementById('button-show-v6').classList.add("active")
    document.getElementById('button-show-v4').classList.remove("active")
    // Load d3V6
    $.getScript("https://d3js.org/d3.v6.js", function(){
      // Run the according code to update the graph
      myHtmlParser('code-html-v6', 'result')
      myJSParser('code-js-v6')
    });
    // Add event listener to the editable code of v6
    document.getElementById('code-js-v6').addEventListener("input", function() {
      myHtmlParser('code-html-v6', 'result')
      myJSParser('code-js-v6')
    })
    // Remove event listener to the editable code of v6
    document.getElementById('code-js-v4').removeEventListener("input", function() {
      myHtmlParser('code-html-v4', 'result')
      myJSParser('code-js-v4')
    })
  }

}
