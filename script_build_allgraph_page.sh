##
# A script that parse all the pages of the d3 graph gallery to build the all graph page
##


# Build the HTML chunk that is called in the all.html page?
cat *html | grep -A11 "col-md-4 col-sm-6 portfolio-item" | grep -v "\\-\\-" | sed 's/portfolio-item/portfolio-item col-lg-2 colBoard/' | sed 's/img-fluid/img-fluid imgBoard/'

# Copy and paste the result in all.HTML
