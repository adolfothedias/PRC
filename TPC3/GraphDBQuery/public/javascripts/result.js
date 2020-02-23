$(function () {
    $("#send").click(e=>{
        e.preventDefault()
        $("#table").empty()
        var body = {
           repository : $("input[type='radio']:checked").val(),
           query : $("#query").val()
        };
        $.post("/",body,
        function(data, status){
            //csv part
            let csv = ""
            let headers = ""
            let body = ""
            for(i=0;i<data.head.vars.length;i++){
                headers = headers + data.head.vars[i] + ","
            }
            csv = headers + "\n"

            for(i=0;i<data.results.bindings.length;i++){

                for(j=0;j<Object.keys(data.results.bindings[i]).length;j++){
                    body = body + data.results.bindings[i][Object.keys(data.results.bindings[i])[j]].value + ","
                }
                body = body + "\n"
            }
            csv = csv + body
            // csv to table part
            var lines = csv.split("\n"),
            output = [],
            i;
            output.push("<thead><tr class=\"w3-blue-grey\"><td>"
                            + lines[0].slice(0,-1).split(",").join("</td><td>")
                            + "</td></tr></thead><tbody>");
            for (i = 1; i < lines.length; i++)
                output.push("<tr><td>"
                            + lines[i].slice(0,-1).split(",").join("</td><td>")
                            + "</td></tr>");
            output = "<table id=\"table-scroll\" class=\"w3-table w3-border\">" + output.join("") + "</tbody></table>";
            var html = $.parseHTML(output)
            $("#table").append(html)

            
        });
    })
    $("#clear").click(e=>{
        e.preventDefault()
        $("#table").empty()
    })
})