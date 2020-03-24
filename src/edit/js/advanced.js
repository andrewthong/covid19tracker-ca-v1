var removeOptionFlag;

$(document).ready(() => {
    removeOptionFlag = true;
    $('#provinceSelection').on('change', function() {
        getProvinceData(province = this.value);
    });
})

function getProvinceData(province) {
    $.ajax({
        url: url + "api/controller/province.php",
        // url: "http://localhost/Covid19TrackerCA/src/edit/api/controller/province.php",
        type: "POST",
        data: JSON.stringify({
            province: province
        })
    }).then(res => {
        console.log(res)

        if (removeOptionFlag) {
            removeOptionFlag = false;
            $('#provinceSelection')[0][0].remove()
        }

        $('#provinceNewCases')[0].innerHTML = province + " New Cases by Day";
        $('#provinceCumulativeCases')[0].innerHTML = province + " Cumulative Cases";

        var cases = 0;
        var deaths = 0;
        if ("cases" in res["data"])
            cases = res["data"]["cases"].length;

        if ("deaths" in res["data"])
            deaths = res["data"]["deaths"].length;

        $('#provinceTotalCases')[0].innerHTML = "Total Cases: " + cases;
        $('#provinceTotalDeaths')[0].innerHTML = "Total Deaths: " + deaths;

        $('#provinceNewCasesChart').remove();
        $('#provinceCumulativeCasesChart').remove()

        $('#provinceCumulativeCasesChartDiv').append("<canvas id=\"provinceCumulativeCasesChart\" width=\"100%\" height=\"40\"></canvas>")
        $('#provinceNewCasesChartDiv').append("<canvas id=\"provinceNewCasesChart\" width=\"100%\" height=\"40\"></canvas>")

        lineGraph(res["dailyCases"], "#provinceNewCasesChart", false);
        lineGraph(res["cumulativeCases"], "#provinceCumulativeCasesChart", true);

        // update datatable of individual Cases
        $('#individualCaseTable').dataTable({
            "order": [
                [0, "desc"]
            ],
            "destroy": true,
            "data": res["data"]["cases"],
            "columns": [{
                    "data": "id"
                }, {
                    "data": "dte"
                }, {
                    "data": "province"
                }, {
                    "data": "city"
                }, {
                    "data": "age"
                }, {
                    "data": "travel_history"
                }, {
                    "data": "confirmed_presumptive"
                },
                {
                    "data": "source",
                    "render": (data, type, row, meta) => {
                        if (type === 'display')
                            data = '<a href="' + data + '">Source</a>';

                        return data;
                    }
                }
            ]
        });

    }, err => {
        console.log(err)
    })
}

function goBack() {
    window.location.href = url + "index.html";
}